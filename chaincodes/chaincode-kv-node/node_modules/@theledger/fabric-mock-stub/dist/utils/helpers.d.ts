import { LoggerInstance } from 'winston';
/**
 * helper functions
 */
export declare class Helpers {
    /**
     * Winston Logger with default level: debug
     *
     * @static
     * @param {string} name
     * @param {string} [level]
     * @returns {LoggerInstance}
     * @memberof Helpers
     */
    static getLoggerInstance(name: string, level?: string): LoggerInstance;
    /**
     * Check number of args
     * accepts array of numbers
     *
     * @static
     * @param {string[]} args
     * @param {(number | number[])} amount
     * @memberof Helpers
     */
    static checkArgs(args: string[], amount: number | number[]): void;
    static strcmp(a: string, b: string): number;
}
