'use strict';

const { Contract } = require('fabric-contract-api');

const balancePrefix = 'balance';
const nftPrefix = 'nft';
const approvalPrefix = 'approval';

const nameKey = 'name';
const symbolKey = 'symbol';

class SupplyChainContracts extends Contract {

    // balance of NFTs assigned to an owner
    async balanceOf(ctx, owner) {
        // Check contract options have been initialized
        await this.CheckInitialized(ctx);

        // There is a key record for every NFT in the format of balancePrefix.owner.tokenId
        // BalanceOf() queries for and counts all records matching balancePrefix.owner.*
        const iterator = await ctx.stub.getStateByPartialCompositeKey(balancePrefix, [owner]);

        // Iterate through result set and count number of results
        let balance = 0;
        let result = await iterator.next();
        while (!result.done) {
            balance++;
            result = await iterator.next();
        }
        return balance;
    }

    // return owner of NFT
    async ownerOf(ctx, tokenId) {
        // Check contract options have been initialized
        await this.CheckInitialized(ctx);

        const nft = await this._readNFT(ctx, tokenId);
        const owner = nft.owner;
        if (!owner) {
            throw new Error('Owner of tokenId ' + tokenId + ' does not exist');
        }

        return owner;
    }

    // transfer NFT from one owner to another
    async transferFrom(ctx, from, to, tokenId) {
        // Check contract options have been initialized
        await this.CheckInitialized(ctx);

        const sender = ctx.clientIdentity.getID();

        const nft = await this._readNFT(ctx, tokenId);

        // Check that from is current owner of tokenId
        // const owner = nft.owner;
        // const tokenApproval = nft.approved;
        // const operatorApproval = await this.IsApprovedForAll(ctx, owner, sender);
        // if(owner !== sender && tokenApproval !== sender && !operatorApproval) {
        //     throw new Error('Sender ' + sender + ' is not owner or approved for tokenId ' + tokenId);
        // }

        // Check if from is the current owner
        if(owner !== from) {
            throw new Error('From ' + from + ' is not owner of tokenId ' + tokenId);
        }

        // Clear the approved client for this token
        nft.approved = '';

        // Update the owner of the token
        nft.owner = to;
        const nftKey = ctx.stub.createCompositeKey(nftPrefix, [tokenId]);
        await ctx.stub.putState(nftKey, Buffer.from(JSON.stringify(nft)));

        // Update the balance of current owner
        const balanceKeyFrom = ctx.stub.createCompositeKey(balancePrefix, [from, tokenId]);
        await ctx.stub.deleteState(balanceKeyFrom);

        // Update the balance of new owner
        const balanceKeyTo = ctx.stub.createCompositeKey(balancePrefix, [to, tokenId]);
        await ctx.stub.putState(balanceKeyTo, Buffer.from('\u0000'));

        // Emit the Transfer event
        const tokenIdInt = parseInt(tokenId);
        const transferEvent = { from: from, to: to, tokenId: tokenIdInt };
        ctx.stub.setEvent('Transfer', Buffer.from(JSON.stringify(transferEvent)));

        return true;
    }

    async _readNFT(ctx, tokenId) {
        const nftKey = ctx.stub.createCompositeKey(nftPrefix, [tokenId]);
        const nftBytes = await ctx.stub.getState(nftKey);
        if (!nftBytes || nftBytes.length === 0) {
            throw new Error('tokenId ' + tokenId + ' does not exist');
        }
        const nft = JSON.parse(nftBytes.toString());
        return nft;
    }

    async _nftExists(ctx, tokenId) {
        const nftKey = ctx.stub.createCompositeKey(nftPrefix, [tokenId]);
        const nftBytes = await ctx.stub.getState(nftKey);
        return nftBytes && nftBytes.length > 0;
    }

    // Checks that contract options have been already initialized
    async CheckInitialized(ctx){
        const nameBytes = await ctx.stub.getState(nameKey);
        if (!nameBytes || nameBytes.length === 0) {
            throw new Error('contract options need to be set before calling any function, call Initialize() to initialize contract');
        }
    }

}