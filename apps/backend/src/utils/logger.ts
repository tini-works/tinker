import winston from 'winston';
import { getConfig } from '@/config/env';

let loggerInstance: winston.Logger | null = null;

function getLogger(): winston.Logger {
  if (loggerInstance) {
    return loggerInstance;
  }

  const config = getConfig();

  const logFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    config.logging.format === 'json'
      ? winston.format.json()
      : winston.format.combine(
          winston.format.colorize(),
          winston.format.printf(
            ({ timestamp, level, message, service, ...meta }) => {
              const metaStr = Object.keys(meta).length
                ? JSON.stringify(meta, null, 2)
                : '';
              return `${timestamp} [${service || 'app'}] ${level}: ${message} ${metaStr}`;
            }
          )
        )
  );

  loggerInstance = winston.createLogger({
    level: config.logging.level,
    format: logFormat,
    transports: [new winston.transports.Console()],
  });

  // Add file transport in production
  if (config.nodeEnv === 'production') {
    loggerInstance.add(
      new winston.transports.File({
        filename: 'logs/error.log',
        level: 'error',
      })
    );
    loggerInstance.add(
      new winston.transports.File({
        filename: 'logs/combined.log',
      })
    );
  }

  return loggerInstance;
}

export const createLogger = (service: string) => {
  return getLogger().child({ service });
};

export const logger = getLogger();

