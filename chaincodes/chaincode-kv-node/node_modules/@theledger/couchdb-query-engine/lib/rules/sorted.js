'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _is = require('../is');

var _is2 = _interopRequireDefault(_is);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  conditions: {

    // Evaluates to true if value is sorted array.
    //
    // TODO: q true, false, 1, -1
    $sorted: function $sorted(d, q) {
      var r = false;

      // Comparision direction.
      var cmp = undefined;
      switch (q) {
        case -1:
          cmp = function cmp(a, b) {
            return a >= b;
          };
          break;
        default:
          cmp = function cmp(a, b) {
            return a <= b;
          };
          break;
      }

      // Result mangle.
      var rm = undefined;
      switch (q) {
        case false:
          rm = function rm(r) {
            return !r;
          };
          break;
        default:
          rm = function rm(r) {
            return r;
          };
          break;
      }

      if (_is2.default.array(d)) {
        r = true;
        var n = d.length;
        for (var i = 1; i < n; i++) {
          if (!cmp(d[i - 1], d[i])) {
            r = false;
            break;
          }
        }
      }

      return rm(r);
    }

  }
};
module.exports = exports['default'];