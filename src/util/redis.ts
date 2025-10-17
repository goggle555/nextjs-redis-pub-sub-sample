import { styleText } from "node:util";
import { createClient } from "redis";
import { ENV } from "./env";
import logger from "./logger";

export const redisPublisher = await createClient({
  url: `redis://:${ENV.REDIS_PASSWORD}@${ENV.REDIS_HOSTNAME}:${ENV.REDIS_PORT}`,
})
  .on("error", (error) => {
    if (error instanceof Error) {
      logger.error(styleText("red", error.message));
    }
  })
  .connect();

export const redisSubscriber = await createClient({
  url: `redis://:${ENV.REDIS_PASSWORD}@${ENV.REDIS_HOSTNAME}:${ENV.REDIS_PORT}`,
})
  .on("error", (error) => {
    if (error instanceof Error) {
      logger.error(styleText("red", error.message));
    }
  })
  .connect();
