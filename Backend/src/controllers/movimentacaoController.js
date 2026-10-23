const prisma = require("../prisma");

async function listarMovimentacoes(req, res) {
    try {
        const movimentacoes = await prisma.MOVIMENTACAO_ESTOQUE.findMany({
            include: {
                disco: true,
                usuario: true
            },
            orderBy: {
                id_movimentacao: "desc"
            }
        });

        res.json(movimentacoes);
    } catch (erro) {
        res.status(500).json({
            mensagem: "Erro ao buscar movimentações."
        });
    }
}


async function cadastrarMovimentacao(req, res) {
    const {
        id_disco,
        id_usuario,
        tipo_movimentacao,
        quantidade,
        data_movimentacao,
        observacao
    } = req.body;

    if (!id_disco || !id_usuario || !tipo_movimentacao ||
        !quantidade || !data_movimentacao || !observacao) {
        return res.status(400).json({
            mensagem: "Preencha todos os campos."
        });
    }

    if (tipo_movimentacao !== "entrada" &&
        tipo_movimentacao !== "saida") {
        return res.status(400).json({
            mensagem: "O tipo deve ser entrada ou saida."
        });
    }

    if (!Number.isInteger(Number(quantidade)) || Number(quantidade) <= 0) {
        return res.status(400).json({
            mensagem: "A quantidade deve ser um número inteiro positivo."
        });
    }

    const data = new Date(data_movimentacao);

    if (isNaN(data.getTime())) {
        return res.status(400).json({
            mensagem: "Informe uma data válida."
        });
    }

    try {
        const disco = await prisma.DISCO.findUnique({
            where: {
                id_disco: Number(id_disco)
            }
        });

        if (!disco) {
            return res.status(404).json({
                mensagem: "Disco não encontrado."
            });
        }

        const usuario = await prisma.USUARIO.findUnique({
            where: {
                id_usuario: Number(id_usuario)
            }
        });

        if (!usuario) {
            return res.status(404).json({
                mensagem: "Usuário não encontrado."
            });
        }

        const qtd = Number(quantidade);
        let novoEstoque = disco.quantidade_estoque;

        if (tipo_movimentacao === "entrada") {
            novoEstoque += qtd;
        } else {
            if (qtd > disco.quantidade_estoque) {
                return res.status(400).json({
                    mensagem: "Estoque insuficiente."
                });
            }

            novoEstoque -= qtd;
        }

        const movimentacao = await prisma.$transaction(async (tx) => {
            await tx.DISCO.update({
                where: {
                    id_disco: Number(id_disco)
                },
                data: {
                    quantidade_estoque: novoEstoque
                }
            });

            return await tx.MOVIMENTACAO_ESTOQUE.create({
                data: {
                    id_disco: Number(id_disco),
                    id_usuario: Number(id_usuario),
                    tipo_movimentacao,
                    quantidade: qtd,
                    data_movimentacao: data,
                    observacao
                }
            });
        });

        res.status(201).json({
            mensagem: "Movimentação registrada com sucesso.",
            movimentacao,
            alerta_estoque: novoEstoque <= disco.estoque_minimo
                ? "Atenção: o estoque está abaixo ou igual ao mínimo."
                : null
        });
    } catch (erro) {
        res.status(500).json({
            mensagem: "Erro ao registrar movimentação."
        });
    }
}


module.exports = {
    listarMovimentacoes,
    cadastrarMovimentacao
};