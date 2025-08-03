import { useNavigate } from "react-router-dom";
import { User, Users } from "lucide-react";
import { useSocket } from "@/hooks/useSocket";
import { useUserStore } from "@repo/store";
import { useActiveGameStore } from "@repo/store";
import { GAME_INIT, START_GAME } from "@repo/messages";
import { useEffect, useState } from "react";
import { generateRandomUser } from "@/lib/generateRandomUser";
export const GameButtons = () => {
  const [iseGuest, setIsGuest] = useState<boolean | null>(null);
  const socket = useSocket();
  const { user, setUser } = useUserStore();
  const { setColor, setGameId, gameId, color } = useActiveGameStore();
  const navigate = useNavigate();

  const handlePlayOnline = () => {
    // In a real app, this would handle online matchmaking
    navigate("/game");
  };

  useEffect(() => {
    if (!socket) return;
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(message);
      if (message.message === START_GAME) {
        setColor(message.color);
        console.log(message.gameId);
        setGameId(message.gameId);
      }
    };
  }, [socket]);

  useEffect(() => {
    if (iseGuest) {
      const randomUser = generateRandomUser();
      setUser(randomUser);
      console.log(user);
    }
  }, [iseGuest, setIsGuest]);

  const handlePlayAsGuest = () => {
    setIsGuest(true);
    try {
      console.log("1");
      if (!socket || !user) return;
      console.log("2");
      socket.send(
        JSON.stringify({
          type: GAME_INIT,
          user,
        })
      );
      console.log("sent");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (gameId) {
      navigate("/game");
    }
  }, [gameId, color]);

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
