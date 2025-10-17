import winston from "winston";
import { ENV } from "./env";

// ログレベルと優先順位
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// 出力するログの最高レベル
const level = ENV.LOG_LEVEL;

// ログの形式
const format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.printf(
    ({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`,
  ),
);

// ログの出力先
const transports = [
  new winston.transports.Console(), // コンソール出力
  // new winston.transports.File({ filename: "server.log" }), // ファイル出力
];

const logger = winston.createLogger({
  levels,
  level,
  format,
  transports,
});

export default logger;
