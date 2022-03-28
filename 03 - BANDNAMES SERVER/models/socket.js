const BandList = require('./band-list');


//class socket configuration
class Sockets {

    constructor( io ){
        this.io = io;

        this.bandList = new BandList();

        this.socketEvents();
    }

    socketEvents(){
        //On connection

        this.io.on('connection', (socket) => {
            
            console.log('Cliente conectado');

            //  emit to connected client all actual band
            socket.emit('current-bands', this.bandList.getBands() );

            //vote to band
            socket.on( 'vote-band', (id ) => {
                this.bandList.increaseVotes(id);
                //  emit to connected client all actual band
                this.io.emit('current-bands', this.bandList.getBands() );
            })

            //remove  band
            socket.on( 'remove-band', (id ) => {
                this.bandList.removeBand(id);
                //  emit to connected client all actual band
                this.io.emit('current-bands', this.bandList.getBands() );
            })

            //update band name
            socket.on( 'update-band', ({id,name} ) => {
                this.bandList.changeName(id,name);
                //  emit to connected client all actual band
                this.io.emit('current-bands', this.bandList.getBands() );
            })

            //add band
            socket.on( 'add-band', (name ) => {
                this.bandList.addBand(name);
                //  emit to connected client all actual band
                this.io.emit('current-bands', this.bandList.getBands() );
            })
           
        });

    }
}

module.exports = Sockets;