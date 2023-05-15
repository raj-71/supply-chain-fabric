'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  virtuals: {

    // Returns length of arrays, strings and all objects with .length property.
    $length: function $length(d) {
      var r = undefined;
      if (d != null && d.hasOwnProperty('length')) {
        r = d.length;
      }
      return r;
    }

  }
};
module.exports = exports['default'];