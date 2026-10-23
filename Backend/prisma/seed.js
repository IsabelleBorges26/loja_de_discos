require("dotenv").config();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
    await prisma.movimentacao.deleteMany();
    await prisma.disco.deleteMany();
    await prisma.usuario.deleteMany();

    await prisma.usuario.createMany({
        data: [
            { nome: "Ana Souza", email: "ana@loja.com", senha: "123456" },
            { nome: "Bruno Lima", email: "bruno@loja.com", senha: "123456" },
            { nome: "Carla Mendes", email: "carla@loja.com", senha: "123456" }
        ]
    });

    await prisma.disco.createMany({
        data: [
            { titulo: "The Dark Side of the Moon", artista: "Pink Floyd", preco_custo: 89.90, quantidade_estoque: 8, estoque_minimo: 3 },
            { titulo: "Abbey Road", artista: "The Beatles", preco_custo: 79.90, quantidade_estoque: 2, estoque_minimo: 3 },
            { titulo: "Thriller", artista: "Michael Jackson", preco_custo: 69.90, quantidade_estoque: 6, estoque_minimo: 2 },
            { titulo: "Clube da Esquina", artista: "Milton Nascimento", preco_custo: 94.50, quantidade_estoque: 4, estoque_minimo: 4 },
            { titulo: "Dois", artista: "Legião Urbana", preco_custo: 59.90, quantidade_estoque: 12, estoque_minimo: 5 }
        ]
    });

    const discos = await prisma.disco.findMany({ orderBy: { id_disco: "asc" } });
    const usuarios = await prisma.usuario.findMany({ orderBy: { id_usuario: "asc" } });

    await prisma.movimentacao.createMany({
        data: [
            { id_disco: discos[0].id_disco, id_usuario: usuarios[0].id_usuario, tipo_movimentacao: "entrada", quantidade: 10, data_movimentacao: new Date("2026-10-01"), observacao: "Compra do fornecedor" },
            { id_disco: discos[0].id_disco, id_usuario: usuarios[1].id_usuario, tipo_movimentacao: "saida", quantidade: 2, data_movimentacao: new Date("2026-10-05"), observacao: "Venda no balcão" },
            { id_disco: discos[1].id_disco, id_usuario: usuarios[0].id_usuario, tipo_movimentacao: "entrada", quantidade: 5, data_movimentacao: new Date("2026-10-02"), observacao: "Compra do fornecedor" },
            { id_disco: discos[1].id_disco, id_usuario: usuarios[2].id_usuario, tipo_movimentacao: "saida", quantidade: 3, data_movimentacao: new Date("2026-10-08"), observacao: "Venda no balcão" },
            { id_disco: discos[2].id_disco, id_usuario: usuarios[1].id_usuario, tipo_movimentacao: "entrada", quantidade: 6, data_movimentacao: new Date("2026-10-03"), observacao: "Compra do fornecedor" },
            { id_disco: discos[3].id_disco, id_usuario: usuarios[2].id_usuario, tipo_movimentacao: "entrada", quantidade: 4, data_movimentacao: new Date("2026-10-04"), observacao: "Compra do fornecedor" },
            { id_disco: discos[4].id_disco, id_usuario: usuarios[0].id_usuario, tipo_movimentacao: "entrada", quantidade: 12, data_movimentacao: new Date("2026-10-06"), observacao: "Compra do fornecedor" }
        ]
    });

    console.log("Banco populado com sucesso.");
}

main()
    .catch((erro) => {
        console.error("Erro ao popular o banco:", erro);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });