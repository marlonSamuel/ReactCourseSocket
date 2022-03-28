const Marcadores = require("./marcadores");

//class socket configuration
class Sockets {

    constructor( io ){
        this.io = io;

        this.marcadores = new Marcadores();

        this.socketEvents();
    }

    socketEvents(){
        //On connection

        this.io.on('connection', (socket) => {
            
            socket.emit('marcadores-activos', this.marcadores.activos);

            socket.on('marcador-nuevo', (marcador) => {
                this.marcadores.agregarMarcador(marcador);
                socket.broadcast.emit('marcador-nuevo', marcador);
            });

            socket.on('actualizar-marcador', marcador => {
                this.marcadores.actualizarMarcador(marcador) ;
                socket.broadcast.emit('actualizar-marcador', marcador);
            });
            
        });

    }
}

module.exports = Sockets;