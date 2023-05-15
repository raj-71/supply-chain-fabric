'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _is = require('../is');

var _is2 = _interopRequireDefault(_is);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  virtuals: {

    // Returns keys of values.
    $keys: function $keys(d) {
      var r = undefined;
      try {
        r = Object.keys(d);
        r.sort();
      } catch (ex) {}
      return r;
    }

  }
};
module.exports = exports['default'];