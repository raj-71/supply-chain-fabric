"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MockProtoTimestamp_1 = require("../MockProtoTimestamp");
var MockKeyModification = /** @class */ (function () {
    // tslint:disable-next-line:variable-name
    function MockKeyModification(is_delete, value, tx_id) {
        this.is_delete = is_delete;
        this.value = value;
        this.tx_id = tx_id;
        this.timestamp = new MockProtoTimestamp_1.MockProtoTimestamp();
    }
    MockKeyModification.prototype.getIsDelete = function () {
        return this.is_delete;
    };
    MockKeyModification.prototype.getValue = function () {
        return this.value;
    };
    MockKeyModification.prototype.getTimestamp = function () {
        return this.timestamp;
    };
    MockKeyModification.prototype.getTxId = function () {
        return this.tx_id;
    };
    return MockKeyModification;
}());
exports.MockKeyModification = MockKeyModification;
//# sourceMappingURL=mockKeyModification.js.map