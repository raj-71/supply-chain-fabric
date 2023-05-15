'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.test = test;
exports.parseQuery = parseQuery;

var _engine = require('../engine');

var _engine2 = _interopRequireDefault(_engine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mongo = new _engine2.default();

// Comparision

var rules = ['eq', 'ne', 'gt', 'gte', 'lt', 'lte', 'in', 'nin', 'or', 'and', 'nor', 'not', 'exists', 'type', 'mod', 'regex', 'all', 'elem-match', 'size'];

rules.forEach(function (rule) {
    mongo.append2(require('../rules/' + rule));
});

/**
 * Test whether or not data matches query
 *
 * @param {Object} data - Data object to match
 * @param {Object} query - Query object
 * @returns {*}
 */
function test(data, query) {
    return mongo.test(data, query);
}

/**
 * Filter out data using a qquery
 *
 * @param {Object} data - Key value object contains values to filter
 * @param {Object} query - Query object
 * @returns {Array.<*>}
 */
function parseQuery(data, query) {
    if (!query.selector) {
        throw new Error('Query needs a selector field');
    }

    var result = [];

    for (var key in data) {
        var value = data[key];

        var positive = mongo.test(value, query.selector);

        if (positive) {
            result.push({
                key: key,
                value: value
            });
        }
    }

    var skip = query.skip || 0;
    var limit = query.limit || result.length;

    return result.slice(skip, limit);
}