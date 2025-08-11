import { ChessBoard } from "../components/game/ChessBoard";
import { Layout } from "../components/Layout";
import { MovesPanel } from "../components/game/MovesPanel";
import { useMoveStore } from "@repo/store";
import { ModalResign } from "@/components/modals/ModalResign";
import { ModalDraw } from "@/components/modals/ModalDraw";
import { ModalGameOver } from "@/components/modals/ModalGameOver";
import { ModalMatchMaking } from "@/components/modals/ModalMatchMaking";

export const Game = () => {
  const { moves } = useMoveStore();
  return (
    <Layout>
      <div className="bg-gray-200 h-screen flex flex-wrap items-center justify-center  ">
        <ChessBoard />
        <MovesPanel moves={moves} />
      </div>
      <ModalResign />
      <ModalDraw />
      <ModalGameOver />
      <ModalMatchMaking />
    </Layout>
  );
};
