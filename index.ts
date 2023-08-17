import { SocketType } from "dgram";
import {
  ClientCreateRoomSocketType,
  ClientJoinRoomSocketType,
} from "./@types/socketApiTypes";
import { RoomType, RoomsListType } from "./@types/Room";
import { Response } from "express";
import { Socket } from "socket.io";

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
const roomsList: RoomsListType = {};

app.get("/", (req: Request, res: Response) => {
  console.log("/");
  res.send("hello world");
});

io.on("connection", (socket: Socket) => {
  console.log("a user connected");
  // CREATE ROOM
  socket.on(
    "client_create_room",
    (
      { roomId, gameSettings, hostName }: ClientCreateRoomSocketType,
      callback: (arg: RoomType) => void
    ) => {
      console.log(hostName)
      roomsList[roomId] = new Room(roomId, socket.id, gameSettings);
      roomsList[roomId].addPlayer(socket.id, hostName);
      socket.join(roomId);
      callback(roomsList[roomId]);
      console.log(
        `CREATE : socket id ${socket.id} created and joined room ${roomId}`
      );
    }
  );
  // DISCONNECT
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  // JOIN
  socket.on(
    "client_join_room",
    (
      { roomId, playerName }: ClientJoinRoomSocketType,
      callback: (arg: RoomType) => void
    ) => {
      if (!roomsList.hasOwnProperty(roomId)) {
        console.log('JOIN ERROR : room doesnt exist')
        return;
      }
      roomsList[roomId].addPlayer(socket.id, playerName);
      socket.join(roomId);
      console.log(roomsList[roomId]);
      callback(roomsList[roomId]);
      console.log(`JOIN : socket id ${socket.id} joined room ${roomId}`);
    }
  );
});

server.listen(3000, () => {
  console.log("listening on port 3000");
});
