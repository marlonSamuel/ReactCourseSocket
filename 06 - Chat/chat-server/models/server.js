//express
const express = require('express');
//create server
const http = require('http');
//import taph
const path = require('path');

//import socket io server
const socketio = require('socket.io');
const Sockets = require('./socket');

const cors = require('cors');
const { dbConnection } = require('../database/config');

//initialize server configuraciont
class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        //Conectar a DB
        dbConnection();

        // http server
        this.server = http.createServer(this.app);

        // Configuraciones de sockets
        this.io = socketio(this.server,{
            /* configuraciones */
        });
    }

    middlewares(){
        //deploy public directory
        this.app.use( express.static( path.resolve(__dirname,'../public')));

        //unable cors
        this.app.use( cors() );

        //parseo de bodyy
        this.app.use( express.json() )

        //API ENDPoints
        this.app.use( '/api/login', require('../router/auth') );
        this.app.use( '/api/mensajes', require('../router/mensajes') );

        
    }

    //function to iniailize socket
    socketConfiguration(){
       new Sockets(this.io); 
    }

    execute(){

        //initialize middlewares
        this.middlewares();

        //initialize socket
        this.socketConfiguration();

        //initialize server
        this.server.listen(this.port, ()=> {
            console.log("server run in port "+ this.port);
        });
    }
}

module.exports = Server;