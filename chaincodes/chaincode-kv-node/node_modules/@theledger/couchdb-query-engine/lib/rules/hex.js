'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  expansions: {

    // Matches hex string.
    '$hex': {
      $type: 'string',
      $regex: /^[0-9A-Fa-f]+$/
    }

  }
};
module.exports = exports['default'];