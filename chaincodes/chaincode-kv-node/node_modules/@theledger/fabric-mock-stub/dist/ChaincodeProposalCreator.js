"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @hidden
 */
var ChaincodeProposalCreator = /** @class */ (function () {
    function ChaincodeProposalCreator(mspId, signingId) {
        this.mspId = mspId;
        this.signingId = signingId;
        this.id_bytes = Buffer.from(signingId);
        // fabric-shim 1.3 makes a call to  toBuffer() in ClientIdentity constructor. We need to add this function to the id_bytes.
        this.id_bytes.toBuffer = function () { return this; };
    }
    ChaincodeProposalCreator.prototype.getMspid = function () {
        return this.mspId;
    };
    ChaincodeProposalCreator.prototype.getIdBytes = function () {
        return this.id_bytes;
    };
    return ChaincodeProposalCreator;
}());
exports.ChaincodeProposalCreator = ChaincodeProposalCreator;
//# sourceMappingURL=ChaincodeProposalCreator.js.map