'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  expansions: {

    // Matches ISO date strings.
    '$strftime:iso': {
      $strftime: '%Y-%m-%dT%H:%M:%S%Z'
    }

  }
};
module.exports = exports['default'];