//import server class
const Server = require('./models/server');

require('dotenv').config();

//instance of server class
const server = new Server();

//execute configuration
server.execute();


//o.on('connection', (socket) => { 
//
//   /*socket.emit("welcome-msg",{
//       msg: "hi!! welcome to server",
//       date: new Date()
//   });
//
//   socket.on("client-msg",(data) => {
//       console.log(data)
//   })*/
//
//   socket.on("client-to-server",(data)=> {
//       console.log(data.msg)
//       io.emit("server-to-client",data)
//   })
//   
//});

