

//class socket configuration
class Sockets {

    constructor( io ){
        this.io = io;
        this.socketEvents();
    }

    socketEvents(){
        //On connection

        this.io.on('connection', (socket) => {
            
            //listen event: client-to-server
            socket.on("client-to-server",(data)=> {
                console.log(data.msg);
                this.io.emit("server-to-client",data);
            })
           
        });

    }
}

module.exports = Sockets;