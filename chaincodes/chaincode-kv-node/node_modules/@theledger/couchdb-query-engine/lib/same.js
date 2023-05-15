'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.arrays = arrays;
exports.default = same;

var _is = require('./is');

var is = _interopRequireWildcard(_is);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// Return true if arrays are the same.
function arrays(a, b) {
  var sort = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var r = true;
  var an = a.length;
  var bn = b.length;
  if (an === bn) {
    if (sort) {
      a.sort();
      b.sort();
    }
    for (var i = 0; i < an; i++) {
      if (a[i] !== b[i]) {
        r = false;
        break;
      }
    }
  } else {
    r = false;
  }
  return r;
}

// Return true if two values are the same.
function same(a, b) {
  var r = false;
  switch (true) {

    // Same scalars.
    case a === b:
      r = true;
      break;

    // Objects.
    case is.object(a) && is.object(b):
      switch (true) {

        // Dates.
        case is.date(a) && is.date(b):
          r = a.getTime() === b.getTime();
          break;

        // RegExps.
        case is.regexp(a) && is.regexp(b):
          r = a.source === b.source && a.global === b.global && a.multiline === b.multiline && a.lastIndex === b.lastIndex && a.ignoreCase === b.ignoreCase;
          break;

        // Array like.
        case is.array(a) && is.array(b):
        case is.args(a) && is.args(b):
        case is.buffer(a) && is.buffer(b):
          r = arrays(a, b);
          break;

        // Other objects.
        default:
          var aks = Object.keys(a);
          var bks = Object.keys(b);
          if (arrays(aks, bks, true)) {
            r = aks.every(function (k) {
              return same(a[k], b[k]);
            });
          }
          break;
      }
      break;
  }
  return r;
}