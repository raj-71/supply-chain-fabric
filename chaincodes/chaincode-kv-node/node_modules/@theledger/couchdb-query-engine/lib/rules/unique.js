'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _is = require('../is');

var _is2 = _interopRequireDefault(_is);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  conditions: {

    // Evaluates to true if value is an array with unique values.
    $unique: function $unique(d, q) {
      throw new Error('TODO');
      return false;
    }

  }
};
module.exports = exports['default'];