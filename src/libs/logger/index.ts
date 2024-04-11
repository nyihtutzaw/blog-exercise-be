import { createLogger, transports, format } from 'winston';

export const logger = createLogger({
    level: 'info',
    format: format.combine(format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), format.colorize(), format.simple()),
    transports: [
        new transports.Console({
            level: 'info',
            format: format.combine(format.colorize(), format.simple()),
        }),
    ],
});
