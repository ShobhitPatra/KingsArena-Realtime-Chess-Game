import { useNavigate } from "react-router-dom";
import { User, Users } from "lucide-react";
import { useSocket } from "@/hooks/useSocket";
export const GameButtons = () => {
  const socket = useSocket();
  const navigate = useNavigate();
  const handlePlayOnline = () => {
    // In a real app, this would handle online matchmaking
    navigate("/game");
  };
  const handlePlayAsGuest = () => {
    socket?.send()
    navigate("/game");
  };
  return (
    <div className="md:p-6 p-3 space-y-4 text-center ">
      <div>
        <button
          onClick={handlePlayOnline}
          className="flex w-64 bg-green-500/80 hover:bg-green-500/60 text-gray-100 hover :text-white p-4 rounded-md  "
        >
          <Users className="h-6 mr-2  w-6 font-semibold" />
          <span className="text-2xl font-semibold">Play Online</span>
        </button>
      </div>
      <div>
        <button
          onClick={handlePlayAsGuest}
          className="flex w-64 bg-green-500/80 hover:bg-green-500/60 text-gray-100 hover :text-white p-4 rounded-md  "
        >
          <User className="h-6 w-6 mr-2 font-semibold" />
          <span className="text-2xl font-semibold">Play as Guest</span>
        </button>
      </div>
    </div>
  );
};
