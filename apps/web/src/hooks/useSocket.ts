import { useUserStore } from "@repo/store";
import { useEffect, useRef, useState } from "react";
export const useSocket = () => {
  const WS_URl = "ws://localhost:8080";
  const [socket, setSocket] = useState<null | WebSocket>(null);
  const { user, setUser } = useUserStore();
  const wsRef = useRef<WebSocket | null>(null);
  const currentUserIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!user) return;
    if (currentUserIdRef.current == user.id && wsRef.current) return;
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    currentUserIdRef.current = user.id;
    try {
      const ws = new WebSocket(WS_URl);
      setSocket(ws);
      wsRef.current = ws;
      ws.onopen = () => {
        console.log("websocket connected....");
        ws.send(
          JSON.stringify({
            type: "user_connect",
            user: user,
          })
        );
      };
      ws.onclose = () => {
        setSocket(null);
        wsRef.current = null;
      };
    } catch (error) {
      console.error(error);
    }
    return () => {
      // if (wsRef.current) {
      // wsRef.current.close();
      //   wsRef.current = null;
      // }
      // currentUserIdRef.current = null;
    };
  }, [user, setUser]);

  return socket;
};
