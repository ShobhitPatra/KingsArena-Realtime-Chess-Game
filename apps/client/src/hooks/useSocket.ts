import { useEffect, useState } from "react";

const WS_URL = "ws://localhost:8000";

export const useSocket = () => {
  const [socket, setSocket] = useState<WebSocket | null>();

  useEffect(() => {
    try {
      const ws = new WebSocket(WS_URL);
      ws.onopen = () => {
        setSocket(ws);
      };
      ws.onclose = () => {
        setSocket(null);
      };

      return () => {
        setSocket(null);
      };
    } catch (error: any) {
      console.log(`error in useSocket hook :${error.message}`);
    }
  }, []);

  return socket;
};
