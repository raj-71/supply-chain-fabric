'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.array = array;

var _is = require('./is');

var is = _interopRequireWildcard(_is);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function array(a) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (is.array(a)) {
    if (options.length !== undefined) {
      if (options.length !== a.length) {
        throw new TypeError('Expected array with length ' + options.length + ', got length ' + a.length + '.');
      }
    }
  } else {
    throw new TypeError('Expected array, got ' + (typeof a === 'undefined' ? 'undefined' : _typeof(a)) + '.');
  }
}