'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ensure = require('../ensure');

var ensure = _interopRequireWildcard(_ensure);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = {
  conditions: {

    $mod: function $mod(d, q) {
      ensure.array(q, { length: 2 });
      return d % q[0] === q[1];
    }

  }
};
module.exports = exports['default'];