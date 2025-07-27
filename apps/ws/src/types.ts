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
