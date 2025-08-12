import { useNavigate } from "react-router-dom";
import { User, Users } from "lucide-react";
import { useSocket } from "@/hooks/useSocket";
import { useUserStore } from "@repo/store";
import { useActiveGameStore } from "@repo/store";
import { GAME_INIT, START_GAME } from "@repo/messages";
import { useEffect, useState } from "react";
import { generateRandomUser } from "@/lib/generateRandomUser";
import { toast } from "react-toastify";
import { useModalStore } from "@/store/useModalStore";
export const GameButtons = () => {
  const socket = useSocket();
  const { openModal } = useModalStore();
  const { user, setUser } = useUserStore();
  const { setColor, setGameId, gameId, color, setOpponent } =
    useActiveGameStore();
  const navigate = useNavigate();
  const [isGuest, setIsGuest] = useState<boolean | null>(null);

  const handlePlayOnline = () => {
    setIsGuest(false);
    if (!user || user.isGuest) {
      toast.error("Login to play Online");
    }
    try {
      if (!socket || !user) return;
      socket.send(
        JSON.stringify({
          type: GAME_INIT,
          user,
        })
      );
      openModal("match_making");
      console.log("send init");
    } catch (error) {
      console.error(error);
    }
  };

  const handlePlayAsGuest = async () => {
    try {
      setIsGuest(true);
      if (!socket || !user) return;
      openModal("match_making");
      console.log("returned");
      socket.send(
        JSON.stringify({
          type: GAME_INIT,
          user,
        })
      );
      console.log("send init");
    } catch (error) {
      console.error(error);
    }
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
        setOpponent(message.opponent.name);
      }
    };
  }, [socket]);

  useEffect(() => {
    async function createRandomUserinDb() {
      try {
        const randomUser = generateRandomUser();
        const url = import.meta.env.VITE_API_URL;
        const response = await fetch(`${url}/auth/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: randomUser.name,
            email: randomUser.email,
            password: randomUser.password,
            confirmPassword: randomUser.confirmPassword,
          }),
        });
        if (!response.ok) {
          throw new Error(`Http error! Status :${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        const user = {
          id: data.user.id,
          name: data.user.name,
          token: data.token,
          isGuest: true,
        };
        setUser(user);

        toast.success(
          "Logged in as Guest successfully ,Click again to start matchmaking"
        );
        if (socket) {
          openModal("match_making");
          console.log("returned");
          socket.send(
            JSON.stringify({
              type: GAME_INIT,
              user,
            })
          );
        }
      } catch (error) {
        console.error("erron creating random user in db", error);
      }
    }
    if (isGuest) {
      createRandomUserinDb();
    }
  }, [isGuest, setIsGuest]);

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
