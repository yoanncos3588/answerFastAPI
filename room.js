const Player = require("./player");

class Room {
  constructor(id, hostId, gameSettings) {
    this.id = id;
    this.hostId = hostId;
    this.gameSettings = gameSettings;
    this.players = {};
  }

  addPlayer(id, name) {
    this.players[id] = new Player(id, name);
  }

  getPlayer(id) {
    return this.players[id];
  }
}

module.exports = Room;
