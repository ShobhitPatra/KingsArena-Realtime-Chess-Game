import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useModalStore } from "@/store/useModalStore";

export const ModalGameOver = ({
  winner,
  result,
}: {
  winner: string;
  result: string;
}) => {
  const { activeModal, closeModal } = useModalStore();
  const open = activeModal === "game_over";

  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent className="bg-gray-200 w-72">
        <DialogHeader>
          <DialogTitle className="capitalize text-center font-bold text-2xl ">
            game over
          </DialogTitle>
          <DialogDescription className="text-lg">
            <h1>
              <span className="font-bold capitalize">
                {winner === "w" ? "white_wins" : "black wins"}
              </span>
              <span> by </span>
              <span>{result}</span>
            </h1>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
