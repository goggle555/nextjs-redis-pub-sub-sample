"use client";

import { useState } from "react";
import { PublishAction } from "./publish-action";

export const PublishButton = () => {
  const [subscribersCount, setSubscribersCount] = useState(0);

  const handleClick = async () => {
    const result = await PublishAction();
    setSubscribersCount(result);
  };

  return (
    <div>
      <p>Subscribers Count: {subscribersCount}</p>
      <button
        type="button"
        onClick={handleClick}
        className="rounded-2xl border border-slate-400 text-slate-500 cursor-pointer p-2"
      >
        Publish to Redis
      </button>
    </div>
  );
};
