/* eslint-disable @typescript-eslint/no-explicit-any */
import winston from "winston";
import chalk from "chalk";

const customLevels = {
  levels: {
    trace: 5,
    debug: 4,
    info: 3,
    warn: 2,
    error: 1,
    fatal: 0,
  },
  colors: {
    trace: "white",
    debug: "green",
    info: "green",
    warn: "yellow",
    error: "red",
    fatal: "red",
  },
};

const formatter = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.splat(),
  winston.format.printf((info) => {
    const { timestamp, level, message, ...meta } = info;

    return `${timestamp} [${level}]: ${message} ${
      Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ""
    }`;
  })
);

class Logger {
  private logger: winston.Logger;

  constructor() {
    const prodTransport = new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
      handleExceptions: true,
    });
    const transport = new winston.transports.Console({
      format: formatter,
      level: "debug",
      handleExceptions: true,
    });
    this.logger = winston.createLogger({
      level: process.env.NODE_ENV ? "trace" : "error",
      levels: customLevels.levels,
      transports: [process.env.NODE_ENV ? transport : prodTransport],
    });
    winston.addColors(customLevels.colors);
  }

  trace(msg: any, meta?: any) {
    this.logger.log("trace", msg, meta);
  }

  debug(msg: any, meta?: any) {
    this.logger.debug(chalk.blue.bold(msg), meta);
  }

  info(msg: any, meta?: any) {
    this.logger.info(chalk.cyan.bold(msg), meta);
  }

  warn(msg: any, meta?: any) {
    this.logger.warn(chalk.yellow.bold(msg), meta);
  }

  error(msg: any, meta?: any) {
    this.logger.error(chalk.red.bold(msg), meta);
  }

  fatal(msg: any, meta?: any) {
    this.logger.log("fatal", chalk.red.bold(msg), meta);
  }
}

export const logger = new Logger();
