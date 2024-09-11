import { useEffect, useState } from "react";
import Button from "../components/Button";
import ChatBox from "../components/chats/ChatBox";
import ChessBoard from "../components/ChessBoard";
import Moves from "../components/moves/Moves";
import { Chess } from "chess.js";
import { useSocket } from "../hooks/useSocket";

export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";

const Game = () => {
  const socket = useSocket();
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());

  useEffect(() => {
    if (!socket) return;

    const onMessageHandler = (event: MessageEvent) => {
      const message = JSON.parse(event.data);

      if (message.type === INIT_GAME) {
        setBoard(chess.board());
        return;
      }
      if (message.type === MOVE) {
        const move = message.move;
        chess.move(move);
        setBoard(chess.board());
        return;
      }
      if (message.type === GAME_OVER) {
        console.log("game over");
      }
    };

    socket.onmessage = onMessageHandler;
    return () => {
      if (socket) {
        socket.onmessage = null;
      }
    };
  }, [socket]);

  return (
    <div className="flex flex-wrap">
      <div className="">
        <Moves />
      </div>
      <div className="">
        <ChessBoard
          chessBoardProps={{
            chess,
            board,
            setBoard,
            socket,
          }}
        />
      </div>
      <div className="">
        <Button
          buttonProps={{
            buttonLabel: "Start Game",
            onClickHandler: () => {
              socket?.send(
                JSON.stringify({
                  type: INIT_GAME,
                })
              );
            },
          }}
        />
        <ChatBox />
      </div>
    </div>
  );
};

export default Game;
