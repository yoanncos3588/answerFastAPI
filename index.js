const Room = require("./room");

const express = require("express");

const app = express();
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

// current rooms created
const rooms = {};

app.get("/", (req, res) => {
  console.log("/");
  res.send("hello world");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("client_create_room", ({ gameSettings, roomId }, callback) => {
    rooms[roomId] = new Room(roomId, socket.id, gameSettings);
    rooms[roomId].addPlayer(socket.id, gameSettings.admin);
    socket.join(roomId);
    callback(roomId);
    console.log(`socket id ${socket.id} created and joined room ${roomId}`);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(3000, () => {
  console.log("listening on port 3000");
});
