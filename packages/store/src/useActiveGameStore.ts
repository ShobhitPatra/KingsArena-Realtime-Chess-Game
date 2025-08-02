import { create } from "zustand";

interface ActiveGameStoreI {
  gameId: string | null;
  setGameId: (gameId: string) => void;
  opponent: string | null;
  setOpponent: (opponent: string) => void;
  color: "w" | "b";
  setColor: (color: "w" | "b") => void;
  fen: string | null;
  setFen: (fen: string) => void;
}

export const useActiveGameStore = create<ActiveGameStoreI>((set) => ({
  gameId: null,
  setGameId: (gameId) => set({ gameId }),
  opponent: null,
  setOpponent: (opponent) => set({ opponent }),
  color: "w",
  setColor: (color) => set({ color }),
  fen: null,
  setFen: (fen) => set({ fen }),
}));
