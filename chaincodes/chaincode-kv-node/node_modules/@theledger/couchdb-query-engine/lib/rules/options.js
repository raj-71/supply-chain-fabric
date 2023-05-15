'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _is = require('../is');

var is = _interopRequireWildcard(_is);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = {
  conditions: {

    // HACK: To support $regex's $options.
    $options: function $options(d, q, p) {
      var r = false;
      if (!is.none(p.$regex)) {
        r = true;
      } else {
        throw new TypeError('$options reserved for $regex.');
      }
      return r;
    }

  }
};
module.exports = exports['default'];