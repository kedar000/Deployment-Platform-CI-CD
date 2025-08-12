// shared/utils/logger.ts
import { createLogger, format, transports } from "winston";

const { combine, timestamp, printf, colorize } = format;

// Custom log format
const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}] : ${stack || message}`;
});

export const logger = createLogger({
  level: process.env.LOG_LEVEL || "info", // "error", "warn", "info", "debug"
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.errors({ stack: true }), // capture stack traces
    logFormat
  ),
  transports: [
    // Console with colors for dev
    new transports.Console({
      format: combine(colorize(), logFormat),
    }),

    // File for production logs
    new transports.File({
      filename: "logs/error.log",
      level: "error",
    }),
    new transports.File({ filename: "logs/combined.log" }),
  ],
});

// Optional: Stream for morgan HTTP logging
export const loggerStream = {
  write: (message: string) => logger.info(message.trim()),
};