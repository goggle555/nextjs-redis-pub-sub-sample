"use client";

import { useRef, useState } from "react";
import logger from "@/util/logger";

export const SubscribeMessage = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<
    {
      timestamp: string;
      message: string;
    }[]
  >([]);
  const ref = useRef<EventSource>(null);

  const connect = () => {
    if (ref.current) {
      ref.current.close();
    }

    const eventSource = new EventSource("/api/subscribe");

    eventSource.onopen = () => {
      logger.debug("Connected");
      setIsConnected(true);
    };

    eventSource.onmessage = (event) => {
      const data: { timestamp: string; message: string } = JSON.parse(
        event.data,
      );
      logger.debug(data);
      setMessages((prev) => [...prev, data]);
    };

    eventSource.onerror = (error) => {
      logger.error(error);
      setIsConnected(false);
      eventSource.close();
    };

    ref.current = eventSource;
  };

  const disconnect = () => {
    if (ref.current) {
      ref.current.close();
      ref.current = null;
      setIsConnected(false);
      logger.debug("Disconneced");
    }
  };

  return (
    <div>
      <p>Server: {isConnected ? "Connected" : "Disconnected"}</p>
      {isConnected ? (
        <button
          type="button"
          onClick={disconnect}
          className="rounded-2xl border border-slate-400 text-slate-500 cursor-pointer p-2"
        >
          Disconnect
        </button>
      ) : (
        <button
          type="button"
          onClick={connect}
          className="rounded-2xl border border-slate-400 text-slate-500 cursor-pointer p-2"
        >
          Connect
        </button>
      )}
      <div>
        {messages.map((data) => (
          <p key={data.timestamp}>{data.message}</p>
        ))}
      </div>
    </div>
  );
};
