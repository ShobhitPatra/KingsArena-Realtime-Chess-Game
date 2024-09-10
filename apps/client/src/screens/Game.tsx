import Button from "../components/Button";
import ChatBox from "../components/chats/ChatBox";
import ChessBoard from "../components/ChessBoard";
import Moves from "../components/moves/Moves";

const Game = () => {
  return (
    <div className="flex flex-wrap">
      <div className="">
        <Moves />
      </div>
      <div className="">
        <ChessBoard />
      </div>
      <div className="">
        <Button
          buttonProps={{
            buttonLabel: "Start Game",
            onClickHandler: () => {
              console.log("game started");
            },
          }}
        />
        <ChatBox />
      </div>
    </div>
  );
};

export default Game;
