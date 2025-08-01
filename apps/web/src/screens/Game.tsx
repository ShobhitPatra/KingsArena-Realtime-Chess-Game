import { moves_example } from "@/example";
import { ChessBoard } from "../components/game/ChessBoard";
import { Layout } from "../components/Layout";
import { MovesPanel } from "../components/game/MovesPanel";

export const Game = () => {
  return (
    <Layout>
      <div className="bg-gray-200 h-screen flex flex-wrap items-center justify-center  ">
        <ChessBoard />
        <MovesPanel moves={moves_example} />
      </div>
    </Layout>
  );
};
