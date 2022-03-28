/*
    path: api/mensajes
*/

const { Router } = require('express');
const { obtenerChat } = require('../controllers/mensajes');
const { validarJWT } = require('../midlewares/validar-jwt');

const router = new Router();

router.get('/:de', validarJWT, obtenerChat );

module.exports = router;