import { GameSettingsType } from "./gameSettingsType";

export type ClientJoinRoomSocketType = {
  roomId: string;
  playerName: string;
};

export type ClientCreateRoomSocketType = {
  roomId: string;
  gameSettings: GameSettingsType;
};
