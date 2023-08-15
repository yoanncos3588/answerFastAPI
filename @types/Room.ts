import { PlayerType } from "./Player";
import { GameSettingsType } from "./gameSettingsType";

export type RoomsListType = {
  [id: string]: RoomType;
};

export type RoomType = {
  id: string;
  hostId: string;
  gameSettings: GameSettingsType;
  players: Array<PlayerType>;
  getPlayer: (id: string) => PlayerType;
  addPlayer: (id: string, name: string) => void;
};
