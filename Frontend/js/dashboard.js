const API = "http://localhost:3000";

const usuario = sessionStorage.getItem("usuario");

if (!usuario) {
    window.location.href = "index.html";
} else {
    const dadosUsuario = JSON.parse(usuario);

    document.getElementById("nomeUsuario").textContent =
        dadosUsuario.nome || dadosUsuario.email || "Usuário";
}

document.getElementById("sairBtn").addEventListener("click", function() {
    sessionStorage.removeItem("usuario");
    window.location.href = "index.html";
});

async function atualizarPainel() {
    const mensagem = document.getElementById("painelMensagem");

    try {
        const respostaDiscos = await fetch(API + "/discos");
        const discos = await respostaDiscos.json();

        const respostaBaixo = await fetch(API + "/discos/estoque-baixo");
        const estoqueBaixo = await respostaBaixo.json();

        let unidades = 0;

        discos.forEach(function(disco) {
            unidades += disco.quantidade_estoque;
        });

        document.getElementById("totalDiscos").textContent = discos.length;
        document.getElementById("totalUnidades").textContent = unidades;
        document.getElementById("estoqueBaixo").textContent = estoqueBaixo.length;
    } catch (erro) {
        mensagem.textContent = "Não foi possível carregar os dados do painel.";
    }
}

atualizarPainel();