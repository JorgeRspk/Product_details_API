const express = require("express");
const router = express.Router();
const UsuarioController = require("../controllers/usuario.controller");
const authMiddleware = require("../middlewares/auth.middleware") 

router.post("/", authMiddleware.authenticate ,UsuarioController.getAllUsuarios);

module.exports = router;
