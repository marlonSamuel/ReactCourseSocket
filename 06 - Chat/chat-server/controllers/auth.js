const bcrypt = require("bcryptjs");
const { response } = require("express");
const { generarJWT } = require("../helpers/jwt");
const Usuario = require('../models/usuario')

const  crearUsuario = async (req, res = response) =>{
    try {
        
        const { email, password } = req.body;
        //verificar que email no existe
        const existeEmail = await Usuario.findOne({ email});

        if(existeEmail){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya existe'
            });
        }

        const usuario = new Usuario(req.body);

        //TODO: encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        //guardar usuaio en base de datos
        await usuario.save();

        // Generar el JWT
        const token = await generarJWT( usuario.id );

        return res.json({
            ok: true,
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        });
    }
}

const login = async (req, res = response) =>{

    const {email, password} = req.body;

    try {
        //verificar si existe correo
        const usuario = await Usuario.findOne({email});
        if(!usuario){
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            })
        }

        //validar el password
        const validPassword = bcrypt.compareSync( password, usuario.password);
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Password no es correcta'
            });
        }

        //generar JWT
        const token = await generarJWT( usuario.id );
        res.json({
            ok: true,
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        });
    }

}

const renewToken = async (req, res = response) =>{

    const uid = req.uid;

    //generar un nuevo JWT
    const token = await generarJWT( uid );
    //Obtener el usuario por UID

    const usuario = await Usuario.findById( uid );

    res.json({
        ok: true,
        usuario,
        token
    });
}

module.exports = {
    crearUsuario,
    login,
    renewToken
}