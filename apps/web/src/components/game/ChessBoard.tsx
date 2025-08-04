import { useEffect, useState } from "react";
import { Chess, type Square } from "chess.js";
import {
  Chessboard,
  type PieceDropHandlerArgs,
  type SquareHandlerArgs,
} from "react-chessboard";
import { useActiveGameStore, useMoveStore, useUserStore } from "@repo/store";
import { useSocket } from "@/hooks/useSocket";
import { MOVE, MOVE_MADE } from "@repo/messages";

export const ChessBoard = () => {
  const [chessGame] = useState(() => new Chess());
  const initialFen = chessGame.fen();
  const [chessPosition, setChessPosition] = useState<string>(initialFen);
  const [moveFrom, setMoveFrom] = useState("");
  const [optionSquares, setOptionSquares] = useState({});

  const [boardOrientation, setBoardOrientation] = useState<"white" | "black">(
    "white"
  );
  const socket = useSocket();
  const { user } = useUserStore();
  const { color, fen, setFen, gameId } = useActiveGameStore();
  const { setMoves } = useMoveStore();

  useEffect(() => {
    if (color === "b") {
      setBoardOrientation("black");
    }
  }, []);

  useEffect(() => {
    if (!socket) return;

    const handleMessage = (event: { data: string }) => {
      console.log("inside handleMessage");
      const message = JSON.parse(event.data);
      console.log("Received:", message);
      if (message.type === MOVE_MADE) {
        setFen(message.fen);
        const move = {
          from: message.move.from,
          to: message.move.to,
          moveNumber: message.moveCount,
          color: message.color,
        };
        setMoves(move);
        console.log("move", move);
      }
    };
    socket.addEventListener("message", handleMessage);

    return () => {
      socket.removeEventListener("message", handleMessage);
    };
  }, [socket, setFen, setMoves]);

  useEffect(() => {
    if (fen) {
      try {
        chessGame.load(fen);
        setChessPosition(fen);
        setMoveFrom("");
        setOptionSquares({});
      } catch (error) {
        console.error("Invalid FEN received:", error);
      }
    }
  }, [fen, chessGame]);

  function makeMove(move: { from: string; to: string }) {
    if (!socket || !gameId || !user) return;
    try {
      if (socket.readyState === WebSocket.OPEN) {
        console.log("socket open");
        socket.send(
          JSON.stringify({
            type: MOVE,
            move,
            gameId,
            user,
          })
        );
      } else {
        console.log("socket close");
      }
    } catch (error) {
      console.error(error);
    }
  }

  function getMoveOptions(square: Square) {
    const moves = chessGame.moves({
      square,
      verbose: true,
    });

    if (moves.length === 0) {
      setOptionSquares({});
      return false;
    }
    const newSquares: Record<string, React.CSSProperties> = {};
    for (const move of moves) {
      newSquares[move.to] = {
        background:
          chessGame.get(move.to) &&
          chessGame.get(move.to)?.color !== chessGame.get(square)?.color
            ? "radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)" // larger circle for capturing
            : "radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)",
        // smaller circle for moving
        borderRadius: "50%",
      };
    }
    newSquares[square] = {
      background: "rgba(255, 255, 0, 0.4)",
    };
    setOptionSquares(newSquares);
    return true;
  }

  function onSquareClick({ square, piece }: SquareHandlerArgs) {
    // piece clicked to move
    if (!moveFrom && piece) {
      // get the move options for the square
      const hasMoveOptions = getMoveOptions(square as Square);
      // if move options, set the moveFrom to the square
      if (hasMoveOptions) {
        setMoveFrom(square);
      }
      return;
    }
    // square clicked to move to, check if valid move
    const moves = chessGame.moves({
      square: moveFrom as Square,
      verbose: true,
    });
    const foundMove = moves.find((m) => m.from === moveFrom && m.to === square);
    // not a valid move
    if (!foundMove) {
      // check if clicked on new piece
      const hasMoveOptions = getMoveOptions(square as Square);
      // if new piece, setMoveFrom, otherwise clear moveFrom
      setMoveFrom(hasMoveOptions ? square : "");
      // return early
      return;
    }
    try {
      makeMove({ from: moveFrom, to: square });
    } catch {
      // if invalid, setMoveFrom and getMoveOptions
      const hasMoveOptions = getMoveOptions(square as Square);
      // if new piece, setMoveFrom, otherwise clear moveFrom
      if (hasMoveOptions) {
        setMoveFrom(square);
      }
      return;
      setMoveFrom("");
      setOptionSquares({});
    }
  }

  // handle piece drop
  function onPieceDrop({ sourceSquare, targetSquare }: PieceDropHandlerArgs) {
    // type narrow targetSquare potentially being null (e.g. if dropped off board)
    if (!targetSquare) {
      return false;
    }
    try {
      makeMove({ from: sourceSquare, to: targetSquare });
      setMoveFrom("");
      setOptionSquares({});
      return true;
    } catch {
      return false;
    }
  }
  // set the chessboard options
  const chessboardOptions = {
    boardOrientation,
    onPieceDrop,
    onSquareClick,
    position: chessPosition,
    squareStyles: optionSquares,
    id: "click-or-drag-to-move",
  };

  return (
    <div className="md:h-170 md:w-170 m-2">
      <Chessboard options={chessboardOptions} />
    </div>
  );
};
