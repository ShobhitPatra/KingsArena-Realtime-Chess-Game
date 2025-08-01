import { LandingChessBoard } from "./LandingChessBoard";
import { useNavigate } from "react-router-dom";
import { User, Users } from "lucide-react";
export const Hero = () => {
  const navigate = useNavigate();

  const handlePlayOnline = () => {
    // In a real app, this would handle online matchmaking
    navigate("/game");
  };
  const handlePlayAsGuest = () => {
    // In a real app, this would start a local/AI game
    navigate("/game");
  };
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
        <div className="md:p-6 p-3 space-y-4 text-center ">
          <div>
            <button
              onClick={handlePlayOnline}
              className=" flex md:w-64 bg-green-500/80 hover:bg-green-500/60 text-gray-100 hover :text-white p-4 rounded-md  "
            >
              <Users className="h-6 mr-2  w-6 font-semibold" />
              <span className="text-2xl font-semibold">Play Online</span>
            </button>
          </div>
          <div>
            <button
              onClick={handlePlayAsGuest}
              className="flex  md:w-64 bg-green-500/80 hover:bg-green-500/60 text-gray-100 hover :text-white p-4 rounded-md  "
            >
              <User className="h-6 w-6 mr-2 font-semibold" />
              <span className="text-2xl font-semibold">Play as Guest</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
