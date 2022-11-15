import * as fs from 'fs';
import * as winston from 'winston';
require('winston-daily-rotate-file');
import { LoggerService } from '@nestjs/common';

const LOG_DIR = 'logs';
const SERVICE_NAME = 'eth-balance-service';

export class Logger implements LoggerService {
    logger: winston.Logger;

    constructor() {
        this.createDir(LOG_DIR);
        const console = new winston.transports.Console();

        //   @ts-ignore
        const fileLogger = new winston.transports.DailyRotateFile({
            filename: `${LOG_DIR}/${SERVICE_NAME}-%DATE%.log`,
            datePattern: 'YYYY-MM-DD',
            zippedArchive: false,
            maxDays: 15,
            maxSize: 250 * 1024 * 1024,
        });

        const transports = [fileLogger];
        if (process.env.NODE_ENV !== 'production') {
            // @ts-ignore
            transports.push(console);
        }
        this.logger = winston.createLogger({
            level: 'info',
            transports: transports,
        });
    }

    private createDir(dirName: string): void {
        if (!fs.existsSync(dirName)) {
            fs.mkdirSync(dirName, { recursive: true });
        }
    }

    /**
     * Write a 'log' level log.
     */
    log(message: any, ...optionalParams: any[]) {
        const data = {
            message,
            params: optionalParams
        };
        this.logger.info(data);
    }

    /**
     * Write an 'error' level log.
     */
    error(message: any, ...optionalParams: any[]) {
        const data = {
            message,
            params: optionalParams
        };
        this.logger.error(data);
    }

    /**
     * Write a 'warn' level log.
     */
    warn(message: any, ...optionalParams: any[]) {
        const data = {
            message,
            params: optionalParams
        };
        this.logger.warn(data);
    }

    /**
     * Write a 'debug' level log.
     */
    debug?(message: any, ...optionalParams: any[]) {
        const data = {
            message,
            params: optionalParams
        };
        this.logger.debug(data);
    }

    /**
     * Write a 'verbose' level log.
     */
    verbose?(message: any, ...optionalParams: any[]) {
        const data = {
            message,
            params: optionalParams
        };
        this.logger.verbose(data);
    }
}
