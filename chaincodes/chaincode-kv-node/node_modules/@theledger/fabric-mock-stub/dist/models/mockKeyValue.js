"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MockKeyValue = /** @class */ (function () {
    function MockKeyValue(key, value) {
        this.key = key;
        this.value = value;
    }
    MockKeyValue.prototype.getKey = function () {
        return this.key;
    };
    MockKeyValue.prototype.getValue = function () {
        return this.value;
    };
    return MockKeyValue;
}());
exports.MockKeyValue = MockKeyValue;
//# sourceMappingURL=mockKeyValue.js.map