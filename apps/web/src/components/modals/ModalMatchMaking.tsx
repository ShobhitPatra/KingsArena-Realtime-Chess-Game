import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModalStore } from "@/store/useModalStore";
import { useActiveGameStore } from "@repo/store";

export const ModalMatchMaking = () => {
  const { gameId } = useActiveGameStore();
  const { activeModal, closeModal } = useModalStore();
  const open = activeModal === "match_making" && !gameId;
  const [count, setCount] = useState(99);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1700);

    return () => clearInterval(interval);
  }, []);

  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent className="bg-gray-200 w-72">
        <DialogHeader>
          <DialogTitle className="capitalize text-center font-bold text-2xl ">
            Matchmaking
          </DialogTitle>
          <DialogDescription className="text-lg animate-pulse text-slate-600">
            Searching for opponent ... {count}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
