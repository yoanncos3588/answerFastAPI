import { SocketType } from "dgram";
import {
  ClientCreateRoomSocketType,
  ClientJoinRoomSocketType,
} from "./@types/socketApiTypes";
import { RoomsListType } from "./@types/Room";
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
      { roomId, gameSettings }: ClientCreateRoomSocketType,
      callback: (arg: string) => void
    ) => {
      roomsList[roomId] = new Room(roomId, socket.id, gameSettings);
      roomsList[roomId].addPlayer(socket.id, gameSettings.host);
      socket.join(roomId);
      callback(roomId);
      console.log(`socket id ${socket.id} created and joined room ${roomId}`);
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
      callback: () => void
    ) => {
      if (!roomsList.hasOwnProperty(roomId)) {
        return;
      }
      roomsList[roomId].addPlayer(socket.id, playerName);
    }
  );
});

server.listen(3000, () => {
  console.log("listening on port 3000");
});
