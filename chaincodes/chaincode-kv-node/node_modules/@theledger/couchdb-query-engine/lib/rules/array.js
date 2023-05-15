'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _is = require('../is');

var _is2 = _interopRequireDefault(_is);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  conditions: {

    // Evaluates to true if all conditions are not met, false otherwise.
    $array: function $array(d, q) {
      return _is2.default.array(d) ^ q;
    }

  }
};
module.exports = exports['default'];