import { create } from "zustand";
interface Move {
  moveNumber: string;
  from: string;
  to: string;
  color: "w" | "b";
  promotion?: "q";
}

interface userMoveStoreI {
  moves: Move[];
  setMoves: (move: Move) => void;
}

export const useMoveStore = create<userMoveStoreI>((set, get) => ({
  moves: [],
  setMoves: (move) => {
    const moves = get().moves;
    const updatedMoves = [...moves, move];
    set({ moves: updatedMoves });
  },
}));
