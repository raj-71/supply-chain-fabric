'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _is = require('../is');

var _is2 = _interopRequireDefault(_is);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  conditions: {

    // Evaluates to true if all conditions are met, false otherwise.
    $none: function $none(d, q) {
      var _this = this;

      return _is2.default.array(d) && d.every(function (e) {
        return _this.test(e, q);
      });
    }

  }
};
module.exports = exports['default'];