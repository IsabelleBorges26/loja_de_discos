if (!sessionStorage.getItem("usuario")) {
    window.location.href = "index.html";
}

document.getElementById("sairBtn").addEventListener("click", function() {
    sessionStorage.removeItem("usuario");
    window.location.href = "index.html";
});

function pegarDiscos() {
    return JSON.parse(localStorage.getItem("discos") || "[]");
}

function salvarDiscos(discos) {
    localStorage.setItem("discos", JSON.stringify(discos));
}

function pegarMovimentacoes() {
    return JSON.parse(localStorage.getItem("movimentacoes") || "[]");
}

function salvarMovimentacoes(movimentacoes) {
    localStorage.setItem("movimentacoes", JSON.stringify(movimentacoes));
}

function atualizarTela() {
    const discos = pegarDiscos();
    const select = document.getElementById("produto");

    select.innerHTML = '<option value="">Selecione um disco</option>';

    discos.forEach(function(disco) {
        select.innerHTML += `
            <option value="${disco.id}">
                ${disco.titulo} - ${disco.artista}
            </option>
        `;
    });

    const listaEstoque = document.getElementById("listaEstoque");
    listaEstoque.innerHTML = "";

    discos.forEach(function(disco) {
        const situacao = Number(disco.quantidade) <= Number(disco.minimo)
            ? "Estoque baixo"
            : "Normal";

        listaEstoque.innerHTML += `
            <tr>
                <td>${disco.titulo}</td>
                <td>${disco.artista}</td>
                <td>${disco.quantidade}</td>
                <td>${disco.minimo}</td>
                <td>${situacao}</td>
            </tr>
        `;
    });

    const movimentacoes = pegarMovimentacoes();
    const listaMovimentacoes = document.getElementById("listaMovimentacoes");

    listaMovimentacoes.innerHTML = "";

    movimentacoes.forEach(function(movimento) {
        listaMovimentacoes.innerHTML += `
            <tr>
                <td>${movimento.data}</td>
                <td>${movimento.disco}</td>
                <td>${movimento.tipo}</td>
                <td>${movimento.quantidade}</td>
                <td>${movimento.responsavel}</td>
            </tr>
        `;
    });
}

document.getElementById("movimentacaoForm").addEventListener("submit", function(evento) {
    evento.preventDefault();

    const discos = pegarDiscos();
    const id = Number(document.getElementById("produto").value);
    const tipo = document.getElementById("tipo").value;
    const quantidade = Number(document.getElementById("quantidadeMov").value);

    const disco = discos.find(function(item) {
        return item.id === id;
    });

    const mensagem = document.getElementById("movMensagem");

    if (!disco) {
        mensagem.textContent = "Selecione um disco.";
        return;
    }

    if (!Number.isInteger(quantidade) || quantidade <= 0) {
        mensagem.textContent = "Informe uma quantidade válida.";
        return;
    }

    if (tipo === "saida" && quantidade > disco.quantidade) {
        mensagem.textContent = "Não há discos suficientes no estoque.";
        return;
    }

    if (tipo === "entrada") {
        disco.quantidade += quantidade;
    } else {
        disco.quantidade -= quantidade;
    }

    salvarDiscos(discos);

    const usuario = JSON.parse(sessionStorage.getItem("usuario"));
    const responsavel = document.getElementById("responsavel").value
        || usuario.nome
        || usuario.email
        || "Usuário";

    const movimentacoes = pegarMovimentacoes();

    movimentacoes.unshift({
        data: new Date().toLocaleString("pt-BR"),
        disco: disco.titulo,
        tipo: tipo === "entrada" ? "Entrada" : "Saída",
        quantidade: quantidade,
        responsavel: responsavel
    });

    salvarMovimentacoes(movimentacoes);

    document.getElementById("movimentacaoForm").reset();
    mensagem.textContent = "Movimentação registrada.";

    atualizarTela();
});

atualizarTela();