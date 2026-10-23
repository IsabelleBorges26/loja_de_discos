
const express = require("express");
const router = express.Router();

const {
    listarDiscos,
    cadastrarDisco,
    editarDisco,
    excluirDisco,
    listarEstoqueBaixo
} = require("../controllers/discoController");

router.get("/estoque-baixo", listarEstoqueBaixo);
router.get("/", listarDiscos);
router.post("/", cadastrarDisco);
router.put("/:id", editarDisco);
router.delete("/:id", excluirDisco);

module.exports = router;
