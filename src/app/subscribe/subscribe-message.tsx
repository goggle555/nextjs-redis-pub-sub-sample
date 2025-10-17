"use client";

import { useRef, useState } from "react";

export const SubscribeMessage = () => {
  const [connectState, setConnectState] = useState<
    "Connected" | "Disconneced" | "Waiting"
  >("Disconneced");
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

    setConnectState("Waiting");

    eventSource.onopen = () => {
      console.log("Connected");
      setConnectState("Connected");
    };

    eventSource.onmessage = (event) => {
      const data: { timestamp: string; message: string } = JSON.parse(
        event.data,
      );
      console.log(data);
      setMessages((prev) => [...prev, data]);
    };

    eventSource.onerror = (error) => {
      console.error(error);
      setConnectState("Disconneced");
      eventSource.close();
    };

    ref.current = eventSource;
  };

  const disconnect = () => {
    if (ref.current) {
      ref.current.close();
      ref.current = null;
      setConnectState("Disconneced");
      console.log("Disconneced");
    }
  };

  return (
    <div>
      <p>Server: {connectState}</p>
      {connectState === "Disconneced" && (
        <button
          type="button"
          onClick={connect}
          className="rounded-2xl border border-slate-400 text-slate-500 cursor-pointer p-2"
        >
          Connect
        </button>
      )}
      {connectState === "Waiting" && (
        <button
          type="button"
          disabled
          className="rounded-2xl border border-slate-400 text-slate-500 cursor-progress p-2"
        >
          Waiting
        </button>
      )}
      {connectState === "Connected" && (
        <button
          type="button"
          onClick={disconnect}
          className="rounded-2xl border border-slate-400 text-slate-500 cursor-pointer p-2"
        >
          Disconnect
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
