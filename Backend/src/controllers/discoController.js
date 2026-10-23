
const prisma = require("../prisma");


async function listarDiscos(req, res) {
    try {
        const busca = req.query.busca;

        console.log("Busca recebida:", busca);

        const discos = await prisma.disco.findMany({
            where: busca
                ? {
                    OR: [
                        { titulo: { contains: busca } },
                        { artista: { contains: busca } }
                    ]
                }
                : {},
            orderBy: {
                titulo: "asc"
            }
        });

        res.json(discos);
    } catch (erro) {
        console.error("Erro detalhado ao buscar discos:", erro);

        res.status(500).json({
            mensagem: "Erro ao buscar discos."
        });
    }
}


async function cadastrarDisco(req, res) {
    const {
        titulo,
        artista,
        preco_custo,
        quantidade_estoque,
        estoque_minimo
    } = req.body;

    if (
        !titulo?.trim() ||
        !artista?.trim() ||
        preco_custo === undefined ||
        preco_custo === "" ||
        quantidade_estoque === undefined ||
        quantidade_estoque === "" ||
        estoque_minimo === undefined ||
        estoque_minimo === ""
    ) {
        return res.status(400).json({
            mensagem: "Preencha todos os campos obrigatórios."
        });
    }

    const preco = Number(preco_custo);
    const quantidade = Number(quantidade_estoque);
    const minimo = Number(estoque_minimo);

    if (
        !Number.isFinite(preco) || preco < 0 ||
        !Number.isInteger(quantidade) || quantidade < 0 ||
        !Number.isInteger(minimo) || minimo < 0
    ) {
        return res.status(400).json({
            mensagem: "Informe valores válidos para preço e estoque."
        });
    }

    try {
        const disco = await prisma.disco.create({
            data: {
                titulo: titulo.trim(),
                artista: artista.trim(),
                preco_custo: preco,
                quantidade_estoque: quantidade,
                estoque_minimo: minimo
            }
        });

        res.status(201).json(disco);
    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            mensagem: "Erro ao cadastrar disco."
        });
    }
}

async function editarDisco(req, res) {
    const id = Number(req.params.id);

    const {
        titulo,
        artista,
        preco_custo,
        quantidade_estoque,
        estoque_minimo
    } = req.body;

    if (
        !Number.isInteger(id) || id <= 0 ||
        !titulo?.trim() ||
        !artista?.trim() ||
        preco_custo === undefined ||
        preco_custo === "" ||
        quantidade_estoque === undefined ||
        quantidade_estoque === "" ||
        estoque_minimo === undefined ||
        estoque_minimo === ""
    ) {
        return res.status(400).json({
            mensagem: "Informe dados válidos para editar o disco."
        });
    }

    const preco = Number(preco_custo);
    const quantidade = Number(quantidade_estoque);
    const minimo = Number(estoque_minimo);

    if (
        !Number.isFinite(preco) || preco < 0 ||
        !Number.isInteger(quantidade) || quantidade < 0 ||
        !Number.isInteger(minimo) || minimo < 0
    ) {
        return res.status(400).json({
            mensagem: "Informe valores válidos para preço e estoque."
        });
    }

    try {
        const disco = await prisma.disco.update({
            where: {
                id_disco: id
            },
            data: {
                titulo: titulo.trim(),
                artista: artista.trim(),
                preco_custo: preco,
                quantidade_estoque: quantidade,
                estoque_minimo: minimo
            }
        });

        res.json(disco);
    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            mensagem: "Erro ao editar disco."
        });
    }
}

async function excluirDisco(req, res) {
    const id = Number(req.params.id);

    try {
        await prisma.movimentacao.deleteMany({
            where: {
                id_disco: id
            }
        });

        await prisma.disco.delete({
            where: {
                id_disco: id
            }
        });

        res.json({
            mensagem: "Disco excluído com sucesso."
        });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            mensagem: "Erro ao excluir disco."
        });
    }
}

async function listarEstoqueBaixo(req, res) {
    try {
        const discos = await prisma.disco.findMany();

        const estoqueBaixo = discos.filter((disco) => {
            return disco.quantidade_estoque < disco.estoque_minimo;
        });

        res.json(estoqueBaixo);
    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            mensagem: "Erro ao buscar estoque baixo."
        });
    }
}

module.exports = {
    listarDiscos,
    cadastrarDisco,
    editarDisco,
    excluirDisco,
    listarEstoqueBaixo
};
