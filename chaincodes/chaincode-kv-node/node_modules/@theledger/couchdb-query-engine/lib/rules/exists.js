'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _is = require('../is');

var is = _interopRequireWildcard(_is);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = {
  conditions: {

    $exists: function $exists(d, q) {
      return !(!!q ^ !is.none(d));
    }

  }
};
module.exports = exports['default'];