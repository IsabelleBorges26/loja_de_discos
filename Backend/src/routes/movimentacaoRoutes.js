const express = require("express");
const router = express.Router();

const {
    listarMovimentacoes,
    cadastrarMovimentacao
} = require("../controllers/movimentacaoController");

router.get("/", listarMovimentacoes);
router.post("/", cadastrarMovimentacao);

module.exports = router;