import { Flag, Handshake } from "lucide-react";
import { Button } from "./ui/button";
export const GameOptions = () => {
  const handleResign = () => {
    console.log("resign");
  };
  const handleDraw = () => {
    console.log("Draw");
  };
  return (
    <header className="flex items-center gap-4 p-2 justify-center">
      <Button variant={"outline"} onClick={handleResign}>
        <Handshake className="h-4 w-4" />
        <h4 className="text-lg">Draw</h4>
      </Button>
      <Button variant={"destructive"} onClick={handleDraw}>
        <Flag className="h-4 w-4" />
        <h4 className="text-lg">Resign</h4>
      </Button>
    </header>
  );
};
