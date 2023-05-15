'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  expansions: {

    // Matches ObjectId string.
    '$string:oid': {
      $type: 'string',
      $regex: /^[0-9A-Fa-f]{24}$/
    }

  }
};
module.exports = exports['default'];