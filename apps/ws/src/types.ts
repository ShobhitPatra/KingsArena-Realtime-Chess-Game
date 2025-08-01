export interface Move {
  from: string;
  to: string;
}
export enum GameResult {
  DRAW,
  THREEFOLDREPITITION,
  STALEMATE,
  CHECKMATE,
}

export interface User {
  id: string;
  name: string;
}

export const GAME_INIT = "game_init";
export const GAME_OVER = "game_over";
export const MOVE = "move";
