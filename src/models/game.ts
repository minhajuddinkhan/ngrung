// game.ts

export interface Game {
  id: string;
  players_joined: number;
}

export interface Me {
  game_id: string;
  is_host: boolean;
  in_game: boolean;
}
