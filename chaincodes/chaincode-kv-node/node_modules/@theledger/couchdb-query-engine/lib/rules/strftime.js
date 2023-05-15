'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _strftime = require('../strftime');

var strftime = _interopRequireWildcard(_strftime);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = {
  conditions: {

    // Matches strings with specified date-time format.
    $strftime: function $strftime(d, q) {
      return strftime.test(q, d);
    }

  }
};
module.exports = exports['default'];