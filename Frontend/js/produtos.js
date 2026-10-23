
const API_URL = "http://localhost:3000/discos";

if (!sessionStorage.getItem("usuario")) {
    window.location.href = "index.html";
}

document.getElementById("sairBtn").addEventListener("click", function () {
    sessionStorage.removeItem("usuario");
    window.location.href = "index.html";
});

const formulario = document.getElementById("discoForm");

async function mostrarDiscos() {
    const busca = document.getElementById("campoBusca").value.trim();
    const lista = document.getElementById("listaDiscos");

    try {
        const resposta = await fetch(
            `${API_URL}?busca=${encodeURIComponent(busca)}`
        );

        if (!resposta.ok) {
            throw new Error("Não foi possível carregar os discos.");
        }

        const discos = await resposta.json();
        lista.innerHTML = "";

        discos.forEach(function (disco) {
            const linha = document.createElement("tr");

            linha.innerHTML = `
                <td>${disco.titulo}</td>
                <td>${disco.artista}</td>
                <td>R$ ${Number(disco.preco_custo).toFixed(2)}</td>
                <td>${disco.quantidade_estoque}</td>
                <td>${disco.estoque_minimo}</td>
                <td>
                    <button type="button"
                        onclick="editarDisco(${disco.id_disco})">
                        Editar
                    </button>
                    <button type="button"
                        onclick="excluirDisco(${disco.id_disco})">
                        Excluir
                    </button>
                </td>
            `;

            lista.appendChild(linha);
        });
    } catch (erro) {
        console.error(erro);
        alert("Erro ao carregar os discos. Verifique se o backend está funcionando.");
    }
}

formulario.addEventListener("submit", async function (evento) {
    evento.preventDefault();

    const id = document.getElementById("discoId").value;

    const disco = {
        titulo: document.getElementById("titulo").value.trim(),
        artista: document.getElementById("artista").value.trim(),
        preco_custo: Number(
            document.getElementById("preco_custo").value
        ),
        quantidade_estoque: Number(
            document.getElementById("quantidade_estoque").value
        ),
        estoque_minimo: Number(
            document.getElementById("estoque_minimo").value
        )
    };

    if (
        !disco.titulo ||
        !disco.artista ||
        document.getElementById("preco_custo").value === "" ||
        document.getElementById("quantidade_estoque").value === "" ||
        document.getElementById("estoque_minimo").value === "" ||
        !Number.isFinite(disco.preco_custo) ||
        disco.preco_custo < 0 ||
        !Number.isInteger(disco.quantidade_estoque) ||
        disco.quantidade_estoque < 0 ||
        !Number.isInteger(disco.estoque_minimo) ||
        disco.estoque_minimo < 0
    ) {
        alert("Preencha todos os campos com valores válidos.");
        return;
    }

    try {
        const resposta = await fetch(
            id ? `${API_URL}/${id}` : API_URL,
            {
                method: id ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(disco)
            }
        );

        const resultado = await resposta.json();

        if (!resposta.ok) {
            throw new Error(
                resultado.mensagem || "Não foi possível salvar o disco."
            );
        }

        alert(id ? "Disco atualizado com sucesso!" : "Disco cadastrado com sucesso!");

        formulario.reset();
        document.getElementById("discoId").value = "";

        await mostrarDiscos();
    } catch (erro) {
        console.error(erro);
        alert(erro.message || "Erro ao salvar o disco.");
    }
});

async function editarDisco(id) {
    try {
        const resposta = await fetch(API_URL);

        if (!resposta.ok) {
            throw new Error("Não foi possível buscar os discos.");
        }

        const discos = await resposta.json();
        const disco = discos.find(function (item) {
            return item.id_disco === id;
        });

        if (!disco) {
            alert("Disco não encontrado.");
            return;
        }

        document.getElementById("discoId").value = disco.id_disco;
        document.getElementById("titulo").value = disco.titulo;
        document.getElementById("artista").value = disco.artista;
        document.getElementById("preco_custo").value = disco.preco_custo;
        document.getElementById("quantidade_estoque").value =
            disco.quantidade_estoque;
        document.getElementById("estoque_minimo").value =
            disco.estoque_minimo;

        window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (erro) {
        console.error(erro);
        alert("Erro ao carregar os dados do disco.");
    }
}

async function excluirDisco(id) {
    if (!confirm("Deseja realmente excluir este disco?")) {
        return;
    }

    try {
        const resposta = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        const resultado = await resposta.json();

        if (!resposta.ok) {
            throw new Error(
                resultado.mensagem || "Não foi possível excluir o disco."
            );
        }

        alert("Disco excluído com sucesso!");
        await mostrarDiscos();
    } catch (erro) {
        console.error(erro);
        alert(erro.message || "Erro ao excluir o disco.");
    }
}

document.getElementById("campoBusca").addEventListener("input", mostrarDiscos);

document.getElementById("cancelarBtn").addEventListener("click", function () {
    formulario.reset();
    document.getElementById("discoId").value = "";
});

mostrarDiscos();
