import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { GameOptions } from "../GameOptions";

export interface Move {
  from: string;
  to: string;
  color: "w" | "b";
  moveNumber?: string;
}

interface MovesPanelProps {
  moves: Move[];
}

export const MovesPanel = ({ moves }: MovesPanelProps) => {
  return (
    <Card className="bg-gray-100 w-xs">
      <CardHeader>
        <GameOptions />
        <CardTitle className="text-lg font-semibold text-center">
          Game Moves
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 ">
        <ScrollArea className="h-[400px] p-4">
          {moves.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No moves yet. Start playing!
            </p>
          ) : (
            <div className="space-y-3 ">
              {moves.map((move, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex gap-4 py-1 rounded px-2 ",
                    move.color === "w"
                      ? "bg-white text-gray-600  "
                      : "bg-gray-900 text-gray-300"
                  )}
                >
                  <div className=" text-sm font-medium text-muted-foreground">
                    {move.moveNumber}
                  </div>
                  <div className=" text-sm font-mono">{move.from}</div>
                  <div className=" text-sm font-mono">{move.to}</div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
