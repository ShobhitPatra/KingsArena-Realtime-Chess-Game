import { generateRandomUser } from "@/lib/generateRandomUser";
import { useUserStore } from "@repo/store";
import { useEffect, useState } from "react";
export const useSocket = () => {
  const WS_URl = "ws://localhost:8080";
  const [socket, setSocket] = useState<null | WebSocket>(null);
  const { user, setUser } = useUserStore();
  if (!user) {
    const randomUser = generateRandomUser();
    setUser(randomUser);
  }
  useEffect(() => {
    const ws = new WebSocket(WS_URl);
    ws.onopen = () => setSocket(ws);
    ws.onclose = () => setSocket(null);
    return () => {
      ws.close();
    };
  }, [user]);

  return socket;
};
