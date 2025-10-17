import { styleText } from "node:util";
import { createClient, type RedisClientType } from "redis";
import { ENV } from "./env";
import logger from "./logger";

let publisherClient: RedisClientType | null = null;

// Publisher用のクライアント取得（シングルトン）
export const getRedisPublisher = async () => {
  if (!publisherClient) {
    publisherClient = createClient({
      url: `redis://:${ENV.REDIS_PASSWORD}@${ENV.REDIS_HOSTNAME}:${ENV.REDIS_PORT}`,
    });

    publisherClient.on("error", (error) => {
      if (error instanceof Error) {
        logger.error(styleText("red", `Publisher Error: ${error.message}`));
      }
    });

    await publisherClient.connect();
    logger.info("Redis Publisher connected");
  }

  return publisherClient;
};

// Subscriber用のクライアント作成（毎回新規作成）
// Redisのsubscribeモードでは専用の接続が必要なため
export const createRedisSubscriber = async () => {
  const subscriber = createClient({
    url: `redis://:${ENV.REDIS_PASSWORD}@${ENV.REDIS_HOSTNAME}:${ENV.REDIS_PORT}`,
  });

  subscriber.on("error", (error) => {
    if (error instanceof Error) {
      logger.error(styleText("red", `Subscriber Error: ${error.message}`));
    }
  });

  await subscriber.connect();
  logger.info("Redis Subscriber connected");

  return subscriber;
};
