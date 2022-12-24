import { Server } from "socket.io";
import { World } from "./server/World.mjs";
import { Player } from "./server/gameObjects/Player.mjs";


var connections = {}

const io = new Server(3000);
let world = new World();


function showConnections() {
  // send a message to the client
  console.log("Current connections: ")

  Object.keys(connections).forEach((id)=> {
    console.log(`id: ${id}`)
  })
  
}

 io.on("connection", (socket) => {
  connections[socket.id] = {player: new Player(socket.id) }

  //world.addPlayer(socket.id);

  showConnections();

  let position = connections[socket.id].player.getPosition();
  socket.emit("SocketID", {id: socket.id, x: position.x, y: position.y});

  let currentPlayers = [] 
  Object.values(connections).forEach((object)=>{
    if (object.player.getID() !== socket.id)
    {
      currentPlayers.push({id: object.player.getID(), x: object.player.getPosition().x, y: object.player.getPosition().y })
    }
  })
  socket.emit("getPlayers", currentPlayers)
  socket.broadcast.emit("newPlayer", {id: socket.id, x: position.x, y: position.y});

  socket.on('playerMoved', (data) => {
    data.id = socket.id;
    socket.broadcast.emit('playerMoved', data);
    connections[socket.id].player.setPosition(data.x,data.y);
  })

  socket.on("disconnect", () => {
    delete connections[socket.id];
    socket.broadcast.emit("playerDisconnected", {id: socket.id});
    console.log(`Client ${socket.id} déconnecté`)
    showConnections()
  });

});