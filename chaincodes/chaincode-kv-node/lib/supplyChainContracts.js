'use strict';

const { Contract } = require('fabric-contract-api');

const balancePrefix = 'balance';
const nftPrefix = 'nft';
// const approvalPrefix = 'approval';

const nameKey = 'name';
const symbolKey = 'symbol';

class SupplyChainContracts extends Contract {

    async createToken(ctx, tokenId, tokenURI) {
        
        // check if the user is authorized to create a token
        const clientMSPID = ctx.clientIdentity.getMSPID();
        if(clientMSPID !== 'Org1MSP') {
            throw new Error('Client is not authorized to create a token');
        }

        // get id of the user
        const minter = ctx.clientIdentity.getID();

        // check if the token already exists
        const exists = await this._nftExists(ctx, tokenId);
        if(exists) {
            throw new Error('Token ' + tokenId + ' already exists');
        }

        // create the token
        const tokenIdInt = parseInt(tokenId);
        if(isNaN(tokenIdInt)) {
            throw new Error('Token ID must be an integer');
        }

        const nft = {
            tokenId: tokenIdInt,
            owner: minter,
            tokenURI: tokenURI
        };

        const nftKey = ctx.stub.createCompositeKey(nftPrefix, [tokenId]);
        await ctx.stub.putState(nftKey, Buffer.from(JSON.stringify(nft)));

        const balanceKey = ctx.stub.createCompositeKey(balancePrefix, [minter, tokenId]);
        await ctx.stub.putState(balanceKey, Buffer.from('\u0000'));

        // Emit the Transfer event
        const transferEvent = { from: '0x0', to: minter, tokenId: tokenIdInt };
        ctx.stub.setEvent('Transfer', Buffer.from(JSON.stringify(transferEvent)));

        return nft;
    }



    // transfer NFT from one owner to another
    async transferFrom(ctx, from, to, tokenId) {

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

}