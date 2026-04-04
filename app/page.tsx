"use client";

import { useEffect } from "react";
import { useSocket } from "./hooks/useSocket";

export default function Home() {
  const { socket, isConnected } = useSocket();
  useEffect(() => {
    if (!socket) return;

    return () => {
      // socket.off("");
    };
  }, [socket]);

  return (
    <div>
      <h1>Welcome to My Next.js App</h1>
    </div>
  );
}
