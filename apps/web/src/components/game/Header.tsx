import { Flag, Handshake } from "lucide-react";
import { Button } from "../ui/button";

export const Header = () => {
  const handleDraw = () => {
    console.log("draw");
  };
  const handleResign = () => {
    console.log("resign");
  };
  return (
    <header className="bg-card h-16 flex items-center justify-between md:px-6 border-b">
      <div className="text-xl font-semibold">
        <h1>KingsArena</h1>
      </div>
      <div className="flex items-center gap-4">
        <Button size="sm" variant="outline" onClick={handleDraw}>
          <Handshake className="w-4 h-4" />
          Draw
        </Button>
        <Button size="sm" variant="destructive" onClick={handleResign}>
          <Flag className="w-4 h-4" />
          Reisgn
        </Button>
      </div>
    </header>
  );
};
