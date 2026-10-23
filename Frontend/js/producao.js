const API = "http://localhost:3000";

const usuarioSalvo = sessionStorage.getItem("usuario");

if (!usuarioSalvo) {
    window.location.href = "index.html";
}

const usuario = JSON.parse(usuarioSalvo);

document.getElementById("sairBtn").addEventListener("click", function () {
    sessionStorage.removeItem("usuario");
    window.location.href = "index.html";
});

function ordenarDiscos(lista) {
    const discos = lista.slice();

    for (let i = 0; i < discos.length - 1; i++) {
        for (let j = 0; j < discos.length - 1 - i; j++) {
            const a = discos[j].titulo.toLowerCase();
            const b = discos[j + 1].titulo.toLowerCase();

            if (a.localeCompare(b, "pt-BR") > 0) {
                const troca = discos[j];
                discos[j] = discos[j + 1];
                discos[j + 1] = troca;
            }
        }
    }

    return discos;
}

function formatarData(data) {
    const partes = data.split("T")[0].split("-");
    return partes[2] + "/" + partes[1] + "/" + partes[0];
}

function dataDeHoje() {
    const hoje = new Date();
    const mes = String(hoje.getMonth() + 1).padStart(2, "0");
    const dia = String(hoje.getDate()).padStart(2, "0");
    return hoje.getFullYear() + "-" + mes + "-" + dia;
}

async function carregarDiscos() {
    const resposta = await fetch(API + "/discos");
    const discos = ordenarDiscos(await resposta.json());

    const select = document.getElementById("disco");
    const tabela = document.getElementById("listaEstoque");

    select.innerHTML = '<option value="">Selecione um disco</option>';
    tabela.innerHTML = "";

    discos.forEach(function (disco) {
        select.innerHTML += `<option value="${disco.id_disco}">${disco.titulo} - ${disco.artista}</option>`;

        let situacao = "Normal";
        if (disco.quantidade_estoque < disco.estoque_minimo) {
            situacao = "Estoque baixo";
        }

        tabela.innerHTML += `
            <tr>
                <td>${disco.titulo}</td>
                <td>${disco.artista}</td>
                <td>${disco.quantidade_estoque}</td>
                <td>${disco.estoque_minimo}</td>
                <td>${situacao}</td>
            </tr>
        `;
    });
}

async function carregarMovimentacoes() {
    const resposta = await fetch(API + "/movimentacoes");
    const movimentacoes = await resposta.json();

    const tabela = document.getElementById("listaMovimentacoes");
    tabela.innerHTML = "";

    movimentacoes.forEach(function (mov) {
        const tipo = mov.tipo_movimentacao === "entrada" ? "Entrada" : "Saída";

        tabela.innerHTML += `
            <tr>
                <td>${formatarData(mov.data_movimentacao)}</td>
                <td>${mov.disco.titulo}</td>
                <td>${tipo}</td>
                <td>${mov.quantidade}</td>
                <td>${mov.usuario.nome}</td>
            </tr>
        `;
    });
}

async function atualizarTela() {
    try {
        await carregarDiscos();
        await carregarMovimentacoes();
    } catch (erro) {
        console.error(erro);
        alert("Erro ao carregar os dados. Verifique se o backend está funcionando.");
    }
}

document.getElementById("movimentacaoForm").addEventListener("submit", async function (evento) {
    evento.preventDefault();

    const mensagem = document.getElementById("movMensagem");

    const id_disco = document.getElementById("disco").value;
    const tipo = document.getElementById("tipo").value;
    const quantidade = Number(document.getElementById("quantidade").value);
    const data = document.getElementById("data").value;
    const observacao = document.getElementById("observacao").value.trim();

    if (id_disco === "") {
        mensagem.textContent = "Selecione um disco.";
        return;
    }

    if (!Number.isInteger(quantidade) || quantidade <= 0) {
        mensagem.textContent = "Informe uma quantidade válida.";
        return;
    }

    if (data === "") {
        mensagem.textContent = "Informe a data da movimentação.";
        return;
    }

    try {
        const resposta = await fetch(API + "/movimentacoes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id_disco: Number(id_disco),
                id_usuario: usuario.id_usuario,
                tipo_movimentacao: tipo,
                quantidade: quantidade,
                data_movimentacao: data,
                observacao: observacao
            })
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            mensagem.textContent = dados.mensagem;
            return;
        }

        mensagem.textContent = dados.mensagem;

        if (dados.alerta_estoque) {
            alert(dados.alerta_estoque);
        }

        document.getElementById("movimentacaoForm").reset();
        document.getElementById("data").value = dataDeHoje();

        atualizarTela();
    } catch (erro) {
        console.error(erro);
        mensagem.textContent = "Não foi possível conectar ao servidor.";
    }
});

document.getElementById("data").value = dataDeHoje();
atualizarTela();
