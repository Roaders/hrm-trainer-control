export enum LogLevel {
    fatal = 5,
    error = 4,
    warn = 3,
    info = 2,
    debug = 1,
    trace = 0,
}

export type Log = {
    level: LogLevel;
    message: string;
    meta: unknown[];
};

export class Logger {
    private readonly _logs: Log[] = [];

    public log(level: keyof typeof LogLevel, message: string, ...meta: unknown[]): void {
        console.log(`[${level.toUpperCase()}] ${message}`, ...meta);

        this._logs.push({ level: LogLevel[level], message, meta });
    }

    public fatal(message: string, ...meta: unknown[]): void {
        this.log('fatal', message, ...meta);
    }

    public error(message: string, ...meta: unknown[]): void {
        this.log('error', message, ...meta);
    }

    public warn(message: string, ...meta: unknown[]): void {
        this.log('warn', message, ...meta);
    }

    public info(message: string, ...meta: unknown[]): void {
        this.log('info', message, ...meta);
    }

    public debug(message: string, ...meta: unknown[]): void {
        this.log('debug', message, ...meta);
    }

    public trace(message: string, ...meta: unknown[]): void {
        this.log('trace', message, ...meta);
    }
}
