const Move = ({
  move,
}: {
  move: {
    from: string;
    to: string;
  };
}) => {
  return (
    <div className=" bg-slate-700 text-base p-1 text-white label rounded-sm">
      from <span className="font-semibold ">{move.from}</span> to{" "}
      <span className="font-semibold ">{move.to}</span>
    </div>
  );
};

export default Move;
