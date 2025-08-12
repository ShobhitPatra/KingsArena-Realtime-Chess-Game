import { ChessBoard } from "../components/game/ChessBoard";
import { Layout } from "../components/Layout";
import { MovesPanel } from "../components/game/MovesPanel";
import { useMoveStore } from "@repo/store";

export const Game = () => {
  const { moves } = useMoveStore();
  return (
    <Layout>
      <div className="bg-gray-200 h-screen flex flex-wrap items-center justify-center ">
        <ChessBoard />
        <MovesPanel moves={moves} />
      </div>
    </Layout>
  );
};
