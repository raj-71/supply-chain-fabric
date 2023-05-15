'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _same = require('../same');

var _same2 = _interopRequireDefault(_same);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  conditions: {
    $ne: function $ne(d, q) {
      return !(0, _same2.default)(d, q);
    }
  }
};
module.exports = exports['default'];