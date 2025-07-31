import { ChessBoard } from "../components/game/ChessBoard";
import { Header } from "../components/game/Header";
import { MovesPanel } from "../components/game/MovesPanel";

export const Game = () => {
  return (
    <div>
      <Header />
      <div className="flex">
        <ChessBoard />
        <MovesPanel />
      </div>
    </div>
  );
};
