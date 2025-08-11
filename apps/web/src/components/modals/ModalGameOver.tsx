import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useModalStore } from "@/store/useModalStore";

export const ModalGameOver = () => {
  const { activeModal, closeModal } = useModalStore();
  const open = activeModal === "game_over";
  const navigate = useNavigate();
  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent className="bg-gray-200 w-72">
        <DialogHeader>
          <DialogTitle className="capitalize text-center font-bold text-2xl ">
            game over
          </DialogTitle>
          <DialogDescription className="text-lg">
            <h1>
              White wins<span> by </span>
              <span>Checkmate</span>
            </h1>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            variant="secondary"
            className="bg-indigo-400 hover:bg-indigo-200"
            onClick={() => navigate("/")}
          >
            Home
          </Button>
          <Button
            variant="secondary"
            className="bg-green-400 hover:bg-green-200"
            onClick={() => navigate("/")}
          >
            New Game
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
