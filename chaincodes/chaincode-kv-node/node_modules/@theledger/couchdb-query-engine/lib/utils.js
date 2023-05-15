'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.patrics = patrics;
exports.patrics2 = patrics2;
exports.mintermexp = mintermexp;
exports.minterms = minterms;
exports.itest2 = itest2;
exports.itest = itest;
exports.map = map;
exports.unmap = unmap;
exports.biconditional = biconditional;
exports.decoded = decoded;
exports.split = split;
exports.resolve = resolve;
exports.arrize = arrize;
exports.kvs = kvs;

var _is = require('./is');

var is = _interopRequireWildcard(_is);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/_regenerator2.default.mark(kvs);

// S.R. Petrick, "A Direct Determination of the Irredundant Forms of a Boolean Function from the Set of Prime Implicants"
// Technical Report AFCRC-TR-56-110, Air Force Cambridge Research Center, Cambridge, Mass., Apr. 1956.
function patrics(minterms) {

    // Get prime implicants.
    var F = {};
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = minterms[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var minterm = _step.value;

            if (minterm[2] !== 'v') {
                if (!F[minterm[0]]) {
                    F[minterm[0]] = minterm[3];
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

    var P = [];
    var PO = {};
    var alpha = 'abcdefghijklmnopqrstuvwxy';
    var ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXY';
    for (var k in F) {
        var v = F[k];
        var pk = k.split('').map(function (e, i) {
            return { '0': ALPHA[i], '1': alpha[i], '-': null }[e];
        }).filter(function (e) {
            return e;
        }).join('');
        P.push([pk, v]);
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = v[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var pi = _step2.value;

                PO[pi] = true;
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
    var PI = Object.keys(PO).map(function (e) {
        return parseInt(e);
    }).sort();

    // console.log('P:')
    // P.forEach(function (p, i) {
    //   console.log(`P${i}`, p[0], p[1].join(', '))
    // })
    //
    // console.log('PI:')
    // console.log(PI)
    //
    var PR = PI.map(function (pi) {
        var r = [];
        P.forEach(function (e, i) {
            if (e[1].indexOf(pi) !== -1) {
                r.push(i);
            }
        });
        return r.map(function (e) {
            return 'P' + e;
        });
    });

    // console.log('PR:', PR.map((e) => `(${e.join(' + ')})`).join(' '))

    var PM = PR.map(function (e) {
        return e.map(function (f) {
            return [f];
        });
    });
    while (PM.length > 1) {
        var p = PM.pop();
        p.forEach(function (e) {
            e.forEach(function (e2) {
                PM.forEach(function (f) {
                    f.forEach(function (g) {
                        if (g.indexOf(e2) === -1) {
                            g.push(e2);
                        }
                    });
                });
            });
        });
    }

    // return PM[0].map((e) => e.join('')).join('+')
    // console.log('PM0:', PM[0].map((e) => e.join('*')).join(' + '))
    return PM[0].map(function (e) {
        return e.map(function (f) {
            return P[parseInt(f.substr(1))][0];
        }).join('');
    }).join('+');
}

function patrics2(minterms) {
    var P = patrics(minterms);
    var alpha = 'abcdefghijklmnopqrstuvwxy';
    var ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXY';

    var or = P.split('+').map(function (p) {

        var and = p.split('').map(function (e) {
            return alpha.indexOf(e);
        }).filter(function (e) {
            return e !== -1;
        });
        var nor = p.split('').map(function (e) {
            return ALPHA.indexOf(e);
        }).filter(function (e) {
            return e !== -1;
        });

        var r = {};
        if (and.length > 0) {
            r.$and = and;
        }
        if (nor.length > 0) {
            r.$nor = nor;
        }
        if (Object.keys(r).length > 0) {
            return r;
        } else {
            return null;
        }
    });

    if (or.length > 0) {
        if (or.length === 1) {
            return or[0];
        } else {
            return { $or: or };
        }
    } else {
        return null;
    }
}

// Minterm expansion.
function mintermexp(minterms) {

    function diff(a, b) {
        var r = [];
        var n = 0;
        var f = false;
        for (var i = 0; i < a.length; i++) {
            if (a[i] === '0' && b[i] === '1' || a[i] === '1' && b[i] === '0') {
                r.push('-');
                if (++n > 1) {
                    f = true;
                    break;
                }
            } else {
                if (a[i] === b[i]) {
                    r.push(a[i]);
                } else {
                    f = true;
                    break;
                }
            }
        }
        if (f) {
            return false;
        } else {
            return r.join('');
        }
    }

    function combine1(i) {
        var r = [];
        for (; i < minterms.length; i++) {
            var o = minterms[i][1];
            for (var j = i + 1; j < minterms.length; j++) {
                var od = minterms[j][1] - o;
                if (od === 0) {
                    continue;
                }
                if (od === 1) {
                    var d = diff(minterms[i][0], minterms[j][0]);
                    if (d) {
                        var _1s = d.split('').filter(function (e) {
                            return e === '1';
                        }).length;
                        minterms[i][2] = 'v';
                        minterms[j][2] = 'v';
                        var k = [];
                        var _arr = [minterms[i][3], minterms[j][3]];
                        for (var _i = 0; _i < _arr.length; _i++) {
                            var z = _arr[_i];var _iteratorNormalCompletion3 = true;
                            var _didIteratorError3 = false;
                            var _iteratorError3 = undefined;

                            try {
                                for (var _iterator3 = z[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                    var l = _step3.value;

                                    if (k.indexOf(l) === -1) {
                                        k.push(l);
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
                        r.push([d, _1s, ' ', k]);
                    }
                } else {
                    break;
                }
            }
        }

        // r.sort((a, b) => a[1] - b[1])

        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
            for (var _iterator4 = r[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                var e = _step4.value;

                minterms.push(e);
            }
        } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                    _iterator4.return();
                }
            } finally {
                if (_didIteratorError4) {
                    throw _iteratorError4;
                }
            }
        }

        return i;
    }

    {
        var i = 0;
        while (true) {
            var j = combine1(i);
            if (i == j) {
                break;
            } else {
                i = j;
            }
        }
    }
}

// Generate initial minterms.
function minterms(q, n) {
    var r = [];

    var _loop = function _loop(i) {

        // String binary representation.
        var s = new Array(n).fill('0').map(function (e, j) {
            return 1 << j & i ? '1' : '0';
        }).join('');

        // Number of 1s.
        var _1s = s.split('').filter(function (e) {
            return e === '1';
        }).length;

        if (itest(q, i)) {
            r.push([s, _1s, ' ', [i]]);
        }
    };

    for (var i = 0; i < Math.pow(2, n); i++) {
        _loop(i);
    }

    // Sort by count of 1s.
    r.sort(function (a, b) {
        return a[1] - b[1];
    });

    return r;
}

function itest2(qa, qb, n) {
    var r = true;

    var _loop2 = function _loop2(i) {
        var ra = itest(qa, i);
        var rb = itest(qb, i);
        if (ra !== rb) {
            var _s = new Array(n).fill('0').map(function (e, j) {
                return 1 << j & i ? '1' : '0';
            }).join('');
            console.error(ra + ' !== ' + rb + ' for ' + _s);
            r = false;
            return 'break';
        }
    };

    for (var i = 0; i < Math.pow(2, n); i++) {
        var _ret2 = _loop2(i);

        if (_ret2 === 'break') break;
    }
    return r;
}

// Perform query test using binary as input.
//
// @param [Object] q Index map query, ie. `{ $and: [ 0, { $or: [ 1, 2 ] } ] }`
// @param [Number] i Binary input, ie. `0b101` means 0 - true, 1 - false, 2 - true.
// @return [Boolean] True if criteria is satisfied, false otherwise.
function itest(q, i) {
    var r = false;
    if (is.number(q)) {
        r = 1 << q & i ? true : false;
    } else {
        r = ['$and', '$or', '$nor', '$not'].every(function (k) {
            var r = true;
            if (is.none(q[k])) {
                r = true;
            } else {
                switch (k) {
                    case '$and':
                        r = q[k].every(function (e) {
                            return itest(e, i);
                        });
                        break;
                    case '$or':
                        r = q[k].some(function (e) {
                            return itest(e, i);
                        });
                        break;
                    case '$nor':
                        r = q[k].every(function (e) {
                            return !itest(e, i);
                        });
                        break;
                    case '$not':
                        r = !itest(q[k], i);
                        break;
                }
            }
            return r;
        });
    }
    return r;
}

// Map query to fragments.
function map(q, f) {
    var r = null;
    if (is.plain(q)) {
        r = {};
        var d = {};

        // Split fragment and query parts.
        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
            for (var _iterator5 = kvs(q)[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                var _ref = _step5.value;

                var _ref2 = _slicedToArray(_ref, 2);

                var k = _ref2[0];
                var v = _ref2[1];

                if (['$and', '$or', '$nor'].indexOf(k) !== -1) {
                    r[k] = map(v, f);
                } else {
                    d[k] = v;
                }
            }
        } catch (err) {
            _didIteratorError5 = true;
            _iteratorError5 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion5 && _iterator5.return) {
                    _iterator5.return();
                }
            } finally {
                if (_didIteratorError5) {
                    throw _iteratorError5;
                }
            }
        }

        if (!is.leaf(d)) {
            var fd = f(d);
            if (is.leaf(r)) {
                r = fd;
            } else {
                r = { $and: [fd, r] };
            }
        }
    } else {
        if (is.array(q)) {
            r = q.map(function (e) {
                return map(e, f);
            });
        } else {
            r = f(q);
        }
    }
    return r;
}

function unmap(q, fs) {
    var r = null;
    if (is.plain(q)) {
        r = {};
        var _iteratorNormalCompletion6 = true;
        var _didIteratorError6 = false;
        var _iteratorError6 = undefined;

        try {
            for (var _iterator6 = kvs(q)[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                var _ref3 = _step6.value;

                var _ref4 = _slicedToArray(_ref3, 2);

                var k = _ref4[0];
                var v = _ref4[1];

                r[k] = unmap(v, fs);
            }
        } catch (err) {
            _didIteratorError6 = true;
            _iteratorError6 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion6 && _iterator6.return) {
                    _iterator6.return();
                }
            } finally {
                if (_didIteratorError6) {
                    throw _iteratorError6;
                }
            }
        }
    } else {
        if (is.array(q)) {
            r = q.map(function (e) {
                return unmap(e, fs);
            });
        } else {
            r = fs[q][1];
        }
    }
    return r;
}

function biconditional(a, b) {
    return !!a ^ !!b ? false : true;
}

// Decode query key from ' $foo' -> '$foo'. Encoding allows to refer to document
// attributes which would conflict with ops.
function decoded(qk) {
    var r = qk;
    var trim = false;

    loop: for (var i = 0; i < qk.length; i++) {
        switch (qk[i]) {
            case ' ':
                trim = true;
                continue loop;

            case '$':
                if (trim) {
                    r = qk.substr(1);
                }
                break loop;

            default:
                break loop;
        }
    }

    return r;
}

// Arrize path by splitting 'foo.bar' -> [ 'foo', 'bar' ], unless string starts
// with ' ' then ' foo.bar' -> [ 'foo.bar' ].
function split(a) {
    var r = undefined;
    if (a[0] === ' ') {
        r = [a.substring(1)];
    } else {
        r = a.split('.');
    }
    return r;
}

// Resolve key path on an object.
function resolve(a, path) {
    var stack = split(path);
    var last = [];

    if (stack.length > 0) {
        last.unshift(stack.pop());
    }

    var k = undefined;
    var e = a;
    if (!is.none(e)) {
        while (!is.none(k = stack.shift())) {
            if (!is.none(e[k])) {
                e = e[k];
            } else {
                stack.unshift(k);
                break;
            }
        }
    }

    // Pull all unresolved components into last.
    while (!is.none(k = stack.pop())) {
        last.unshift(k);
    }

    return [e, last];
}

function arrize(a) {
    return Array.isArray(a) ? a : [a];
}

function kvs(a) {
    var _iteratorNormalCompletion7, _didIteratorError7, _iteratorError7, _iterator7, _step7, k;

    return _regenerator2.default.wrap(function kvs$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    if (!is.object(a)) {
                        _context.next = 28;
                        break;
                    }

                    _iteratorNormalCompletion7 = true;
                    _didIteratorError7 = false;
                    _iteratorError7 = undefined;
                    _context.prev = 4;
                    _iterator7 = Object.keys(a)[Symbol.iterator]();

                case 6:
                    if (_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done) {
                        _context.next = 14;
                        break;
                    }

                    k = _step7.value;

                    if (!a.hasOwnProperty(k)) {
                        _context.next = 11;
                        break;
                    }

                    _context.next = 11;
                    return [k, a[k]];

                case 11:
                    _iteratorNormalCompletion7 = true;
                    _context.next = 6;
                    break;

                case 14:
                    _context.next = 20;
                    break;

                case 16:
                    _context.prev = 16;
                    _context.t0 = _context['catch'](4);
                    _didIteratorError7 = true;
                    _iteratorError7 = _context.t0;

                case 20:
                    _context.prev = 20;
                    _context.prev = 21;

                    if (!_iteratorNormalCompletion7 && _iterator7.return) {
                        _iterator7.return();
                    }

                case 23:
                    _context.prev = 23;

                    if (!_didIteratorError7) {
                        _context.next = 26;
                        break;
                    }

                    throw _iteratorError7;

                case 26:
                    return _context.finish(23);

                case 27:
                    return _context.finish(20);

                case 28:
                case 'end':
                    return _context.stop();
            }
        }
    }, _marked, this, [[4, 16, 20, 28], [21,, 23, 27]]);
}