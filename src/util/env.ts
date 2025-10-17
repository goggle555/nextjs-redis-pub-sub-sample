import z from "zod";

const Env = z.object({
  LOG_LEVEL: z.enum(["info", "debug"]).default("info").catch("info"),
  REDIS_HOSTNAME: z.string(),
  REDIS_PORT: z.string(),
  REDIS_PASSWORD: z.string(),
});

export const ENV = Env.parse(process.env);
