import { Flag, Handshake } from "lucide-react";
import { Button } from "./ui/button";
import { useModalStore } from "@/store/useModalStore";
export const GameOptions = () => {
  const { openModal } = useModalStore();
  const handleResign = () => {
    openModal("resign");
  };
  const handleDraw = () => {
    openModal("draw");
  };
  return (
    <header className="flex items-center gap-4 p-2 justify-center">
      <Button variant={"outline"} onClick={handleDraw}>
        <Handshake className="h-4 w-4" />
        <h4 className="text-lg">Draw</h4>
      </Button>
      <Button variant={"destructive"} onClick={handleResign}>
        <Flag className="h-4 w-4" />
        <h4 className="text-lg">Resign</h4>
      </Button>
    </header>
  );
};
