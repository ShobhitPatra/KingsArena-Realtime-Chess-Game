import { moves_example } from "@/example";
import { ChessBoard } from "../components/game/ChessBoard";

import { MovesPanel } from "../components/game/MovesPanel";
import { SideBar } from "@/components/SideBar";

export const Game = () => {
  return (
    <div className="h-screen ">
      <div className="h-full flex flex-wrap items-center justify-between  ">
        <SideBar />
        <ChessBoard />
        <MovesPanel moves={moves_example} />
      </div>
    </div>
  );
};
