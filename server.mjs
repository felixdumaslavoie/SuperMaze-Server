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
  socket.emit("SocketID", {id: socket.id, x: position.x, y: position.y, map: world.getMap()});

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

  socket.on('playerDead', (data) => {
    data = {}
    data.id = socket.id;
    connections[socket.id].player.respawn();
    data.x = connections[socket.id].player.getPosition().x
    data.y = connections[socket.id].player.getPosition().y
    socket.broadcast.emit('playerMoved', data);
  })

  socket.on('addingTiles', (data) =>{
    let response = world.addTiles(data);
    data.id = socket.id;
    if (!response)
    {
      socket.emit('tilesAdded', data);
      socket.broadcast.emit('tilesAdded', data);
    }
  });

  socket.on("disconnect", () => {
    delete connections[socket.id];
    socket.broadcast.emit("playerDisconnected", {id: socket.id});
    console.log(`Client ${socket.id} déconnecté`)
    showConnections()
  });

});