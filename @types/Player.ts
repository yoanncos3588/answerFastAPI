export type PlayerType = {
  id: string;
  name: string;
};

export type PlayerListType = {
  [id: string]: PlayerType;
};
