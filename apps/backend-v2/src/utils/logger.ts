import winston from 'winston';
import { config } from '@/config/env';

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

const logger = winston.createLogger({
  level: config.logging.level,
  format: logFormat,
  transports: [new winston.transports.Console()],
});

// Add file transport in production
if (config.nodeEnv === 'production') {
  logger.add(
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
    })
  );
  logger.add(
    new winston.transports.File({
      filename: 'logs/combined.log',
    })
  );
}

export const createLogger = (service: string) => {
  return logger.child({ service });
};

export { logger };
