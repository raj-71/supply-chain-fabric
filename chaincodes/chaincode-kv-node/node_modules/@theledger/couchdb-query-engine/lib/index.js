'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.test = exports.parseQuery = undefined;

var _mongo = require('./engine/mongo');

exports.parseQuery = _mongo.parseQuery;
exports.test = _mongo.test;
exports.default = {
    parseQuery: _mongo.parseQuery,
    test: _mongo.test
};