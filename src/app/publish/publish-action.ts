"use server";

import { format } from "node:util";
import logger from "@/util/logger";
import { redisPublisher } from "@/util/redis";

export const PublishAction = async () => {
  const result = await redisPublisher.publish(
    "sample-channel",
    "Hello, world!",
  );

  logger.debug(
    format({
      subscribersCount: result,
    }),
  );

  return result;
};
