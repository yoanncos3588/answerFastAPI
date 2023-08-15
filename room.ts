import { PlayerListType, PlayerType } from "./@types/Player";
import { GameSettingsType } from "./@types/gameSettingsType";

const Player = require("./player");

class Room {
  id: string;
  hostId: string;
  gameSettings: GameSettingsType;
  players: PlayerListType;
  constructor(id: string, hostId: string, gameSettings: GameSettingsType) {
    this.id = id;
    this.hostId = hostId;
    this.gameSettings = gameSettings;
    this.players = {};
  }

  addPlayer(id: number, name: string) {
    this.players[id] = new Player(id, name);
  }

  getPlayer(id: number) {
    return this.players[id];
  }
}

module.exports = Room;
