"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  conditions: {

    $where: function $where(d, q) {
      return q(d);
    }

  }
};
module.exports = exports["default"];