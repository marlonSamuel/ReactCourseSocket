const { usuarioConectado, usuarioDesconectado, getUsuarios, grabarMensaje } = require("../controllers/sockets");
const { comprobarJWT } = require("../helpers/jwt");



//class socket configuration
class Sockets {

    constructor( io ){
        this.io = io;


        this.socketEvents();
    }

    socketEvents(){
        //On connection

        this.io.on('connection', async(socket) => {

             // TODO: Validar el JWT
            // Si el token no es válido, desconectar 
            const [valido, uid] = comprobarJWT(socket.handshake.query['x-token']);
            if(!valido){
                console.log('socket no identificado');
                return socket.disconnect();
            }

            // TODO: Saber que usuario está activo mediate el UID
            await usuarioConectado(uid);

             // TODO: Socket join, uid
            // Unir al usuario a una sala de socket.io
            socket.join( uid );
            
            // TODO: Emitir todos los usuarios conectados
            this.io.emit('lista-usuarios', await getUsuarios(uid));

            // TODO: Escuchar cuando el cliente manda un mensaje
            // mensaje-personal
            socket.on('mensaje-personal', async(payload)=> {
                const mensaje = await grabarMensaje(payload);
                this.io.to( payload.para ).emit('mensaje-personal', mensaje );
                this.io.to( payload.de ).emit('mensaje-personal', mensaje );
            });

            // TODO: Disconnect
            // Marcar en la BD que el usuario se desconecto
            socket.on('disconnect', async() => {
                await usuarioDesconectado( uid );
                this.io.emit('lista-usuarios', await getUsuarios(uid));
            });
           
        });

    }
}

module.exports = Sockets;