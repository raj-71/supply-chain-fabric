'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _is = require('./is');

var is = _interopRequireWildcard(_is);

var _same = require('./same');

var _same2 = _interopRequireDefault(_same);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Engine = function () {
    function Engine() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref$virtuals = _ref.virtuals,
            virtuals = _ref$virtuals === undefined ? [] : _ref$virtuals,
            _ref$conditions = _ref.conditions,
            conditions = _ref$conditions === undefined ? [] : _ref$conditions,
            _ref$expansions = _ref.expansions,
            expansions = _ref$expansions === undefined ? [] : _ref$expansions;

        _classCallCheck(this, Engine);

        this.registry = { virtuals: virtuals, conditions: conditions, expansions: expansions };
    }

    _createClass(Engine, [{
        key: 'clone',
        value: function clone() {

            return new Engine({
                virtuals: this.registry.virtuals.slice(),
                conditions: this.registry.conditions.slice(),
                expansions: this.registry.expansions.slice()
            });
        }
    }, {
        key: 'append2',
        value: function append2(d) {
            for (var t in d) {
                if (t === 'expansions' || t === 'virtuals' || t === 'conditions') {
                    for (var k in d[t]) {
                        var f = d[t][k];
                        this.append(t, k, f);
                    }
                }
            }
        }
    }, {
        key: 'append',
        value: function append(t, k, f) {

            this.registry[t].push([k, f]);
        }
    }, {
        key: 'prepend',
        value: function prepend(t, k, f) {

            this.registry[t].shift([k, f]);
        }
    }, {
        key: 'replace',
        value: function replace(t, k, f) {
            var _rule = this.rule(k),
                _rule2 = _slicedToArray(_rule, 1),
                tk = _rule2[0];

            if (tk) {

                this.registry[tk][k] = f;
            } else {

                this.append(t, k, f);
            }
        }

        // Find rule with k name.

    }, {
        key: 'rule',
        value: function rule(k) {

            var r = [undefined, undefined];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = (0, _utils.kvs)(this.registry)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var _ref2 = _step.value;

                    var _ref3 = _slicedToArray(_ref2, 2);

                    var tk = _ref3[0];
                    var tv = _ref3[1];
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {

                        for (var _iterator2 = tv[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var _ref4 = _step2.value;

                            var _ref5 = _slicedToArray(_ref4, 2);

                            var rk = _ref5[0];
                            var rf = _ref5[1];


                            if (k === rk) {

                                r = [tk, rf];
                                break;
                            }
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return r;
        }
    }, {
        key: 'test',
        value: function test(d) {
            var q = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


            var r = true;

            if (is.leaf(q)) {

                // Implicit equality.
                r = r && (0, _same2.default)(d, q);
            } else {
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {

                    for (var _iterator3 = (0, _utils.kvs)(q)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var _ref6 = _step3.value;

                        var _ref7 = _slicedToArray(_ref6, 2);

                        var qk = _ref7[0];
                        var qv = _ref7[1];


                        if (qk[0] === '$') {
                            var _rule3 = this.rule(qk),
                                _rule4 = _slicedToArray(_rule3, 2),
                                t = _rule4[0],
                                f = _rule4[1];

                            switch (t) {
                                case 'expansions':
                                    r = r && this.test(d, f);
                                    break;
                                case 'virtuals':
                                    r = r && this.test(f.bind(this)(d, qv), qv);
                                    break;
                                case 'conditions':
                                    r = r && f.bind(this)(d, qv, q);
                                    break;
                                default:
                                    throw new Error('Unknown rule ' + qk);
                            }

                            if (r === false) {

                                break;
                            }
                        } else {

                            // Allow " $foo" to reference "$foo" attributes.
                            var tqk = (0, _utils.decoded)(qk);

                            var _ref8 = (0, _utils.resolve)(d, tqk) || [],
                                _ref9 = _slicedToArray(_ref8, 2),
                                dvp = _ref9[0],
                                dk = _ref9[1];

                            if (dvp !== null && dk.length === 1) {

                                // ...it's resolved.
                                r = r && this.test(dvp[dk[0]], qv);
                            } else {

                                // We can still match `{ $exists: false }`, possibly in nested
                                // `{ $or: [] }`.
                                r = r && this.test(undefined, qv);
                            }
                        }
                    }
                } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                            _iterator3.return();
                        }
                    } finally {
                        if (_didIteratorError3) {
                            throw _iteratorError3;
                        }
                    }
                }
            }

            return r;
        }
    }]);

    return Engine;
}();

exports.default = Engine;
module.exports = exports['default'];