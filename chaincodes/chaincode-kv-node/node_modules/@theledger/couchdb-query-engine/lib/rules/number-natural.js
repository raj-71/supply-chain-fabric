'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  expansions: {

    // Matches natural numbers (0, 1, 2...).
    '$number:natural': {
      $is: 'number:integer',
      $gte: 0
    }

  }
};
module.exports = exports['default'];