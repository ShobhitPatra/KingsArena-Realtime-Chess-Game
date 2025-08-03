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
        setMoves(message.move);
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
        chessGame.load(fen); // Load the new position into the chess game
        setChessPosition(fen);
        // Clear any selected squares when position updates
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
    // get the moves for the square
    const moves = chessGame.moves({
      square,
      verbose: true,
    });

    // if no moves, clear the option squares
    if (moves.length === 0) {
      setOptionSquares({});
      return false;
    }

    // create a new object to store the option squares
    const newSquares: Record<string, React.CSSProperties> = {};

    // loop through the moves and set the option squares
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

    // set the square clicked to move from to yellow
    newSquares[square] = {
      background: "rgba(255, 255, 0, 0.4)",
    };

    // set the option squares
    setOptionSquares(newSquares);

    // return true to indicate that there are move options
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

      // return early
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

// import { useEffect, useState } from "react";
// import { Chess, type Square } from "chess.js";
// import {
//   Chessboard,
//   type PieceDropHandlerArgs,
//   type SquareHandlerArgs,
// } from "react-chessboard";
// import { useActiveGameStore, useMoveStore, useUserStore } from "@repo/store";
// import { useSocket } from "@/hooks/useSocket";
// import { MOVE, MOVE_MADE } from "@repo/messages";

// export const ChessBoard = () => {
//   const [chessGame] = useState(() => new Chess());
//   const initialFen = chessGame.fen();
//   const [chessPosition, setChessPosition] = useState<string>(initialFen);
//   const [moveFrom, setMoveFrom] = useState("");
//   const [optionSquares, setOptionSquares] = useState({});

//   const [boardOrientation, setBoardOrientation] = useState<"white" | "black">(
//     "white"
//   );
//   const socket = useSocket();
//   const { user } = useUserStore();
//   const { color, fen, setFen, gameId } = useActiveGameStore();
//   const { setMoves } = useMoveStore();

//   // Debug logging for socket and game state
//   useEffect(() => {
//     console.log("🐛 ChessBoard Debug Info:", {
//       socket: socket ? "Connected" : "Not Connected",
//       socketReadyState: socket?.readyState,
//       color,
//       gameId,
//       user: user?.id || "No user",
//       fen: fen || "No FEN",
//     });
//   }, [socket, color, gameId, user, fen]);

//   useEffect(() => {
//     if (color === "b") {
//       setBoardOrientation("black");
//     }
//   }, [color]);

//   useEffect(() => {
//     console.log("🔌 Socket effect running - socket exists:", !!socket);
//     if (!socket) {
//       console.log("❌ No socket available");
//       return;
//     }

//     console.log("🔌 Socket ready state:", socket.readyState);
//     console.log("🎯 Setting up message listener for player:", color);

//     const handleMessage = (event: { data: string }) => {
//       console.log("📨 Raw message received by", color, "player:", event.data);

//       try {
//         const message = JSON.parse(event.data);
//         console.log("📨 Parsed message for", color, "player:", message);

//         if (message.type === MOVE_MADE) {
//           console.log("♟️ MOVE_MADE received by", color, "player:", {
//             gameId: message.gameId,
//             currentGameId: gameId,
//             move: message.move,
//             fen: message.fen,
//           });

//           // Check if this message is for the current game
//           if (message.gameId === gameId) {
//             console.log("✅ Message matches current game, updating state");
//             setFen(message.fen);
//             setMoves(message.move);
//           } else {
//             console.log("❌ Message gameId doesn't match current gameId");
//           }
//         }
//       } catch (error) {
//         console.error("❌ Error parsing message:", error);
//       }
//     };

//     console.log("🔗 Adding event listener");
//     socket.addEventListener("message", handleMessage);

//     // Cleanup function to remove the event listener
//     return () => {
//       console.log("🧹 Cleaning up event listener for", color, "player");
//       socket.removeEventListener("message", handleMessage);
//     };
//   }, [socket, setFen, setMoves, color, gameId]);

//   useEffect(() => {
//     console.log("🎯 FEN update effect - fen:", fen);
//     if (fen) {
//       try {
//         console.log("🔄 Loading new position:", fen);
//         chessGame.load(fen);
//         setChessPosition(fen);
//         setMoveFrom("");
//         setOptionSquares({});
//         console.log("✅ Position loaded successfully");
//       } catch (error) {
//         console.error("❌ Invalid FEN received:", error);
//       }
//     }
//   }, [fen, chessGame]);

//   function makeMove(move: { from: string; to: string }) {
//     console.log("🎯 Making move:", move, "for player:", color);

//     if (!socket) {
//       console.error("❌ No socket available for move");
//       return;
//     }
//     if (!gameId) {
//       console.error("❌ No gameId available for move");
//       return;
//     }
//     if (!user) {
//       console.error("❌ No user available for move");
//       return;
//     }

//     try {
//       const moveMessage = {
//         type: MOVE,
//         move,
//         gameId,
//         user,
//       };
//       console.log("📤 Sending move message:", moveMessage);
//       socket.send(JSON.stringify(moveMessage));

//       // Clear UI state immediately after sending
//       setMoveFrom("");
//       setOptionSquares({});
//     } catch (error) {
//       console.error("❌ Error sending move:", error);
//     }
//   }

//   function getMoveOptions(square: Square) {
//     const moves = chessGame.moves({
//       square,
//       verbose: true,
//     });

//     if (moves.length === 0) {
//       setOptionSquares({});
//       return false;
//     }

//     const newSquares: Record<string, React.CSSProperties> = {};

//     for (const move of moves) {
//       newSquares[move.to] = {
//         background:
//           chessGame.get(move.to) &&
//           chessGame.get(move.to)?.color !== chessGame.get(square)?.color
//             ? "radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)"
//             : "radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)",
//         borderRadius: "50%",
//       };
//     }

//     newSquares[square] = {
//       background: "rgba(255, 255, 0, 0.4)",
//     };

//     setOptionSquares(newSquares);
//     return true;
//   }

//   function onSquareClick({ square, piece }: SquareHandlerArgs) {
//     console.log(
//       "🖱️ Square clicked:",
//       square,
//       "piece:",
//       piece,
//       "by player:",
//       color
//     );

//     // Check if it's player's turn
//     const currentTurn = chessGame.turn();
//     const playerColor = color === "w" ? "w" : "b";

//     console.log(
//       "🎯 Turn check - current turn:",
//       currentTurn,
//       "player color:",
//       playerColor
//     );

//     if (currentTurn !== playerColor) {
//       console.log("❌ Not player's turn");
//       setMoveFrom("");
//       setOptionSquares({});
//       return;
//     }

//     if (!moveFrom && piece) {
//       // Check if clicking own piece
//       const pieceColor = chessGame.get(square as Square)?.color;
//       if (pieceColor !== playerColor) {
//         console.log("❌ Trying to move opponent's piece");
//         return;
//       }

//       const hasMoveOptions = getMoveOptions(square as Square);
//       if (hasMoveOptions) {
//         setMoveFrom(square);
//         console.log("✅ Selected piece at:", square);
//       }
//       return;
//     }

//     const moves = chessGame.moves({
//       square: moveFrom as Square,
//       verbose: true,
//     });
//     const foundMove = moves.find((m) => m.from === moveFrom && m.to === square);

//     if (!foundMove) {
//       // Check if clicking on another own piece
//       const pieceColor = chessGame.get(square as Square)?.color;
//       if (pieceColor === playerColor) {
//         const hasMoveOptions = getMoveOptions(square as Square);
//         setMoveFrom(hasMoveOptions ? square : "");
//       } else {
//         setMoveFrom("");
//         setOptionSquares({});
//       }
//       return;
//     }

//     console.log("✅ Valid move found, executing:", {
//       from: moveFrom,
//       to: square,
//     });
//     makeMove({ from: moveFrom, to: square });
//   }

//   function onPieceDrop({ sourceSquare, targetSquare }: PieceDropHandlerArgs) {
//     console.log(
//       "🖱️ Piece dropped:",
//       sourceSquare,
//       "to",
//       targetSquare,
//       "by player:",
//       color
//     );

//     if (!targetSquare) {
//       return false;
//     }

//     // Check if it's player's turn
//     const currentTurn = chessGame.turn();
//     const playerColor = color === "w" ? "w" : "b";

//     if (currentTurn !== playerColor) {
//       console.log("❌ Not player's turn for drop");
//       return false;
//     }

//     // Check if moving own piece
//     const pieceColor = chessGame.get(sourceSquare as Square)?.color;
//     if (pieceColor !== playerColor) {
//       console.log("❌ Trying to drop opponent's piece");
//       return false;
//     }

//     // Validate move
//     const moves = chessGame.moves({
//       square: sourceSquare as Square,
//       verbose: true,
//     });
//     const foundMove = moves.find(
//       (m) => m.from === sourceSquare && m.to === targetSquare
//     );

//     if (!foundMove) {
//       console.log("❌ Invalid drop move");
//       return false;
//     }

//     console.log("✅ Valid drop move, executing");
//     makeMove({ from: sourceSquare, to: targetSquare });
//     return true;
//   }

//   const chessboardOptions = {
//     boardOrientation,
//     onPieceDrop,
//     onSquareClick,
//     position: chessPosition,
//     squareStyles: optionSquares,
//     id: "click-or-drag-to-move",
//   };

//   return (
//     <div className="md:h-170 md:w-170 m-2">
//       {/* Debug info panel */}
//       <div className="text-xs mb-2 p-2 bg-gray-100 rounded">
//         <div>
//           Player: {color} | Socket: {socket ? "✅" : "❌"} | Game: {gameId}
//         </div>
//         <div>Position: {chessPosition.substring(0, 20)}...</div>
//       </div>
//       <Chessboard options={chessboardOptions} />
//     </div>
//   );
// };
