'use strict';

const supplyChainContracts = require('./lib/supplyChainContracts.js');


module.exports.SupplyChainContracts = supplyChainContracts;
module.exports.contracts = [supplyChainContracts];

// const { Contract } = require("fabric-contract-api");
// const crypto = require("crypto");

// class KVContract extends Contract {
//   constructor() {
//     super("KVContract");
//   }

//   async instantiate() {
//     // function that will be invoked on chaincode instantiation
//   }

//   async registerProduce(ctx, farmerId, location, produceType, price, quantity) {
//     const tokenId = ctx.stub.getTxID();
//     const produce = {
//       farmerId,
//       location,
//       produceType,
//       price,
//       quantity
//     };
//     await ctx.stub.putState(tokenId, Buffer.from(JSON.stringify(produce)));
//     return tokenId;
//   }

//   async put(ctx, key, value) {
//     await ctx.stub.putState(key, Buffer.from(value));
//     return { success: "OK" };
//   }

//   async get(ctx, key) {
//     const buffer = await ctx.stub.getState(key);
//     if (!buffer || !buffer.length) return { error: "NOT_FOUND" };
//     return { success: buffer.toString() };
//   }

//   async putPrivateMessage(ctx, collection) {
//     const transient = ctx.stub.getTransient();
//     const message = transient.get("message");
//     await ctx.stub.putPrivateData(collection, "message", message);
//     return { success: "OK" };
//   }

//   async getPrivateMessage(ctx, collection) {
//     const message = await ctx.stub.getPrivateData(collection, "message");
//     const messageString = message.toBuffer ? message.toBuffer().toString() : message.toString();
//     return { success: messageString };
//   }

//   async verifyPrivateMessage(ctx, collection) {
//     const transient = ctx.stub.getTransient();
//     const message = transient.get("message");
//     const messageString = message.toBuffer ? message.toBuffer().toString() : message.toString();
//     const currentHash = crypto.createHash("sha256").update(messageString).digest("hex");
//     const privateDataHash = (await ctx.stub.getPrivateDataHash(collection, "message")).toString("hex");
//     if (privateDataHash !== currentHash) {
//       return { error: "VERIFICATION_FAILED" };
//     }
//     return { success: "OK" };
//   }
// }

// exports.contracts = [KVContract];
