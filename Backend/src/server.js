
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const discoRoutes = require("./routes/discoRoutes");
const movimentacaoRoutes = require("./routes/movimentacaoRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API Loja de Discos funcionando!");
});

app.use("/discos", discoRoutes);
app.use("/movimentacoes", movimentacaoRoutes);
app.use("/usuarios", usuarioRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
