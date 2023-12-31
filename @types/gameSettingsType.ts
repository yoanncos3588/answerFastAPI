export type GameSettingsType = {
  totalPlayers: string;
  totalQuestions: string;
  difficulty: string;
  themes: Array<ThemeType>;
};

export type ThemeType = {
  id: number;
  name: string;
  slug: string;
  activ: boolean;
};
