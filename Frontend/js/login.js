const API = "http://localhost:3000";

const formulario = document.getElementById("loginForm");

formulario.addEventListener("submit", async function(evento) {
    evento.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const mensagem = document.getElementById("loginMensagem");

    mensagem.textContent = "Verificando login...";

    try {
        const resposta = await fetch(API + "/usuarios/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                senha: senha
            })
        });

        const dados = await resposta.json();

        if (resposta.ok) {
            sessionStorage.setItem("usuario", JSON.stringify(dados.usuario));
            window.location.href = "dashboard.html";
        } else {
            mensagem.textContent = dados.mensagem + " Voltando para o login...";

            setTimeout(function() {
                window.location.href = "index.html";
            }, 2500);
        }
    } catch (erro) {
        mensagem.textContent = "Não foi possível conectar ao servidor. Voltando para o login...";

        setTimeout(function() {
            window.location.href = "index.html";
        }, 2500);
    }
});