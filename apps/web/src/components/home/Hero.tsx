import { GameButtons } from "./GameButtons";
import { LandingChessBoard } from "./LandingChessBoard";

export const Hero = () => {
  return (
    <section className="flex flex-wrap justify-center">
      <LandingChessBoard />
      <div className="">
        <p className=" md:p-4 p-2 text-5xl font-extrabold  text-gray-700 text-center space-y-1">
          <h1>Play Chess</h1>
          <h1>Online</h1>
          <h1 className="text-2xl">on</h1>
          <h1>KingsArena </h1>
        </p>
        {/* buttons */}
        <GameButtons/>
      </div>
    </section>
  );
};
