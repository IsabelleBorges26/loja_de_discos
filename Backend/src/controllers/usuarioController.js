const prisma = require("../prisma");

async function cadastrarUsuario(req, res) {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({
            mensagem: "Preencha todos os campos."
        });
    }

    try {
        const usuarioExiste = await prisma.usuario.findUnique({
            where: {
                email: email
            }
        });

        if (usuarioExiste) {
            return res.status(400).json({
                mensagem: "Este email já está cadastrado."
            });
        }

        const usuario = await prisma.usuario.create({
            data: {
                nome: nome,
                email: email,
                senha: senha
            }
        });

        res.status(201).json({
            id_usuario: usuario.id_usuario,
            nome: usuario.nome,
            email: usuario.email
        });
    } catch (erro) {
        res.status(500).json({
            mensagem: "Erro ao cadastrar usuário."
        });
    }
}

async function listarUsuarios(req, res) {
    try {
        const usuarios = await prisma.usuario.findMany({
            select: {
                id_usuario: true,
                nome: true,
                email: true
            }
        });

        res.json(usuarios);
    } catch (erro) {
        res.status(500).json({
            mensagem: "Erro ao buscar usuários."
        });
    }
}

async function loginUsuario(req, res) {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({
            mensagem: "Informe o e-mail e a senha."
        });
    }

    try {
        const usuario = await prisma.usuario.findUnique({
            where: {
                email: email
            }
        });

        if (!usuario) {
            return res.status(401).json({
                mensagem: "E-mail não cadastrado."
            });
        }

        if (usuario.senha !== senha) {
            return res.status(401).json({
                mensagem: "Senha incorreta."
            });
        }

        res.json({
            mensagem: "Login realizado com sucesso.",
            usuario: {
                id_usuario: usuario.id_usuario,
                nome: usuario.nome,
                email: usuario.email
            }
        });
    } catch (erro) {
        res.status(500).json({
            mensagem: "Erro ao realizar login."
        });
    }
}

module.exports = {
    cadastrarUsuario,
    listarUsuarios,
    loginUsuario
};