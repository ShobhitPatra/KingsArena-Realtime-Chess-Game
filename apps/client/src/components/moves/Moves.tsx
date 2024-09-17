import Move from "./Move";

const Moves = () => {
  return (
    <div className=" my-1 mx-4 w-full flex-col space-y-1">
      {dummyMoves.map((move) => (
        <Move move={move} />
      ))}
    </div>
  );
};

export default Moves;

const dummyMoves = [
  { from: "e7", to: "e6" },
  { from: "e7", to: "e6" },
  { from: "e7", to: "e6" },
  { from: "e7", to: "e6" },
  { from: "e7", to: "e6" },
];
