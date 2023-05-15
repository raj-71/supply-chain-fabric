'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  expansions: {

    // Matches Extended JSON ObjectId.
    '$ext:oid': {
      $type: 'object',
      $keys: ['$oid'],
      ' $oid': {
        $is: 'string:oid'
      }
    }

  }
};
module.exports = exports['default'];