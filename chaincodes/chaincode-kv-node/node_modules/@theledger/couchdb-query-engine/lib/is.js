'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.rep = rep;
exports.array = array;
exports.plain = plain;
exports.object = object;
exports.string = string;
exports.number = number;
exports.strings = strings;
exports.date = date;
exports.regexp = regexp;
exports.none = none;
exports.args = args;
exports.buffer = buffer;
exports.leaf = leaf;
function rep(a, b) {
  return Object.prototype.toString.call(a) === b;
}

function array(a) {
  return Array.isArray(a);
}

function plain(a) {
  return object(a) && a.constructor === Object;
}

function object(a) {
  return (typeof a === 'undefined' ? 'undefined' : _typeof(a)) === 'object' && a !== null;
}

function string(a) {
  return typeof a === 'string';
}

function number(a) {
  return typeof a === 'number';
}

// Return true if value is an array with string elements only.
function strings(a) {
  return array(a) && a.every(function (e) {
    return string(e);
  });
}

function date(a) {
  return object(a) && rep(a, '[object Date]');
}

function regexp(a) {
  return object(a) && rep(a, '[object RegExp]');
}

function none(a) {
  return a == null;
}

function args(a) {
  return rep(a, '[object Arguments]');
}

function buffer(a) {
  return Buffer != null ? Buffer.isBuffer(a) : false;
}

// Leaf is a value that we can't decend into.
function leaf(a) {
  var r = true;
  switch (true) {
    case array(a) && a.length > 0:
    case object(a) && Object.keys(a).length > 0:
      r = false;
      break;
  }
  return r;
}