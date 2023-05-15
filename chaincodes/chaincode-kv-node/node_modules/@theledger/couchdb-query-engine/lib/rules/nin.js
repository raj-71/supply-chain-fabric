'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('../utils');

exports.default = {
  conditions: {

    // Evaluates to true if provided value is not in array document.
    $nin: function $nin(d, q) {
      var da = (0, _utils.arrize)(d);
      return (0, _utils.arrize)(q).every(function (e) {
        return da.indexOf(e) < 0;
      });
    }

  }
};
module.exports = exports['default'];