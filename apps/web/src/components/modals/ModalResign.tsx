import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useModalStore } from "@/store/useModalStore";
import { useSocket } from "@/hooks/useSocket";
import { useActiveGameStore, useUserStore } from "@repo/store";
import { GAME_OVER } from "@repo/messages";
import { toast } from "react-toastify";

export const ModalResign = () => {
  const socket = useSocket();
  const { gameId } = useActiveGameStore();
  const { user } = useUserStore();
  const { activeModal, closeModal } = useModalStore();
  const open = activeModal === "resign";
  const handleResign = async () => {
    if (!socket || !user || !gameId) return;
    try {
      socket.send(
        JSON.stringify({
          type: GAME_OVER,
          user,
          gameId,
          reason: "Resignation",
        })
      );
      closeModal();
      toast.success("Game Reisgned successfully", {
        position: "top-center",
      });
    } catch (error) {
      console.error("Error resigning game", error);
    }
  };
  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent className="bg-gray-200 ">
        <DialogHeader>
          <DialogTitle>Resign</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Are you sure?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleResign}>
            Resign
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
