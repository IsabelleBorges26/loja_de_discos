
const express = require("express");
const router = express.Router();

const {
    cadastrarUsuario,
    listarUsuarios,
    loginUsuario
} = require("../controllers/usuarioController");

router.post("/", cadastrarUsuario);
router.get("/", listarUsuarios);
router.post("/login", loginUsuario);

module.exports = router;
