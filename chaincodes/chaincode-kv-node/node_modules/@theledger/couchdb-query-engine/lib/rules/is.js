'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _is = require('../is');

var is = _interopRequireWildcard(_is);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.default = {
  conditions: {

    // Evaluates to true if provided rule name prefixed with $ evaluates to true.
    $is: function $is(d, q) {
      var r = false;
      switch (true) {

        // Single rule, ie: { foo: { $is: 'number' } }
        case is.string(q):
          r = this.test(d, _defineProperty({}, '$' + q, true));
          break;

        // Any of provided rules, ie: { foo: { $is: [ 'number', 'string' ] } }
        case is.strings(q):
          r = this.test(d, {
            $or: q.map(function (e) {
              return _defineProperty({}, '$' + e, true);
            })
          });
          break;

        default:
          throw new Error('$is supports string or strings query only for now.');
      }
      return r;
    }

  }
};
module.exports = exports['default'];