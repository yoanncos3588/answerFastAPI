import { PlayerListType, PlayerType } from "./Player";
import { GameManageType } from "./gameManageType";
import { GameSettingsType } from "./gameSettingsType";

export type RoomsListType = {
  [id: string]: RoomType;
};

export type RoomType = {
  id: string;
  hostId: string;
  gameManage: GameManageType;
  gameSettings: GameSettingsType;
  players: PlayerListType;
  getPlayer: (id: string) => PlayerType;
  addPlayer: (id: string, name: string) => void;
};
