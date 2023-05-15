'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('../utils');

exports.default = {
  conditions: {

    // Evaluates to true if provided value is in array document.
    $in: function $in(d, q) {
      var ad = (0, _utils.arrize)(d);
      return (0, _utils.arrize)(q).some(function (e) {
        return ad.indexOf(e) >= 0;
      });
    }

  }
};
module.exports = exports['default'];