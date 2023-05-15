"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var winston_1 = require("winston");
/**
 * helper functions
 */
var Helpers = /** @class */ (function () {
    function Helpers() {
    }
    /**
     * Winston Logger with default level: debug
     *
     * @static
     * @param {string} name
     * @param {string} [level]
     * @returns {LoggerInstance}
     * @memberof Helpers
     */
    Helpers.getLoggerInstance = function (name, level) {
        return new winston_1.Logger({
            transports: [new winston_1.transports.Console({
                    level: level || 'debug',
                    prettyPrint: true,
                    json: false,
                    label: name,
                    colorize: true,
                })],
            exitOnError: false,
        });
    };
    /**
     * Check number of args
     * accepts array of numbers
     *
     * @static
     * @param {string[]} args
     * @param {(number | number[])} amount
     * @memberof Helpers
     */
    Helpers.checkArgs = function (args, amount) {
        if (Array.isArray(amount)) {
            if (!amount.filter(function (a) {
                return args.length === a;
            }).length) {
                throw new Error("Incorrect number of arguments. Expecting " + amount);
            }
        }
        else {
            if (args.length != amount) {
                throw new Error("Incorrect number of arguments. Expecting " + amount);
            }
        }
    };
    Helpers.strcmp = function (a, b) {
        if (a > b) {
            return 1;
        }
        if (a < b) {
            return -1;
        }
        // a must be equal to b
        return 0;
    };
    return Helpers;
}());
exports.Helpers = Helpers;
//# sourceMappingURL=helpers.js.map