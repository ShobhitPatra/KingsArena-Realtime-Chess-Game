import { Chess, Color, PieceSymbol, Square } from "chess.js";
import { MOVE } from "../screens/Game";
import { useState } from "react";

interface chessBoardPropsInterface {
  chess: Chess;
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
  setBoard: React.Dispatch<
    React.SetStateAction<
      ({
        square: Square;
        type: PieceSymbol;
        color: Color;
      } | null)[][]
    >
  >;
  socket: WebSocket | null | undefined;
}

const ChessBoard = ({
  chessBoardProps,
}: {
  chessBoardProps: chessBoardPropsInterface;
}) => {
  const [from, setFrom] = useState<null | Square>(null);
  return (
    <div className="text-white-200 ">
      {chessBoardProps.board.map((row, i) => {
        return (
          <div key={i} className="flex">
            {row.map((square, j) => {
              const squareRepresentation = (String.fromCharCode(97 + (j % 8)) +
                "" +
                (8 - i)) as Square;

              return (
                <div
                  onClick={() => {
                    if (!from) {
                      setFrom(squareRepresentation);
                    } else {
                      chessBoardProps.socket?.send(
                        JSON.stringify({
                          type: MOVE,
                          payload: {
                            move: {
                              from,
                              to: squareRepresentation,
                            },
                          },
                        })
                      );

                      setFrom(null);
                      chessBoardProps.chess.move({
                        from,
                        to: squareRepresentation,
                      });
                      chessBoardProps.setBoard(chessBoardProps.chess.board());
                      console.log({
                        from,
                        to: squareRepresentation,
                      });
                    }
                  }}
                  key={j}
                  className={`w-16 h-16 ${(i + j) % 2 === 0 ? "bg-slate-800" : "bg-white"}`}
                >
                  <div className="w-full justify-center flex h-full">
                    <div className="justify-center flex items-center">
                      {square ? (
                        <img
                          className="w-8"
                          src={`/${square?.color === "b" ? "b" + square?.type : "w" + square?.type}.png`}
                        />
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default ChessBoard;
