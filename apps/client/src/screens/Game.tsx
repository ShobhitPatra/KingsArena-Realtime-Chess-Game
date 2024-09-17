import { useEffect, useState } from "react";

import { ChessBoard } from "../components/ChessBoard";
import { useSocket } from "../hooks/useSocket";
import { Chess } from "chess.js";
import Button from "../components/Button";
import ChatBox from "../components/chats/ChatBox";
import Moves from "../components/moves/Moves";

// TODO: Move together, there's code repetition here
export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";

const Game = () => {
  const socket = useSocket();
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(message);
      switch (message.type) {
        case INIT_GAME:
          setBoard(chess.board());
          setStarted(true);
          break;
        case MOVE:
          const move = message.payload;
          chess.move(move);
          setBoard(chess.board());
          console.log("Move made");
          break;
        case GAME_OVER:
          console.log("Game over");
          break;
      }
    };
  }, [socket]);

  if (!socket) return <div>Connecting...</div>;

  return (
    <div className="flex">
      <div>
        <ChatBox />
      </div>
      <div className="">
        <ChessBoard
          chess={chess}
          setBoard={setBoard}
          socket={socket}
          board={board}
        />
      </div>

      <div className="flex flex-col space-y-2 ">
        <Button
          onClickHandler={() => {
            socket.send(
              JSON.stringify({
                type: INIT_GAME,
              })
            );
          }}
          buttonLabel="PLAY"
        >
          {""}
        </Button>

        <Moves />
      </div>
    </div>
  );
};

export default Game;
