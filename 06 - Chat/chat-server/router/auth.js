/*
    path: api/login
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario,login, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../midlewares/validar-campos');
const { validarJWT } = require('../midlewares/validar-jwt');

const router = Router();

//crear nuevo usuario
router.post( '/new',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], crearUsuario );

//login
router.post('/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
] ,login);

//Revalidad token
router.get('/renew',validarJWT,renewToken);

module.exports = router;