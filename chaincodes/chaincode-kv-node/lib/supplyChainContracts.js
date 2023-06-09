'use strict';

const { Contract } = require('fabric-contract-api');

const nftPrefix = 'nft';

class SupplyChainContracts extends Contract {

    // to create token but only farmer is authorized to create token
    async createToken(ctx, tokenId,farmerURI) {
        
        // check if the user is authorized to create a token
        const clientOrg = ctx.clientIdentity.getMSPID();
        if(clientOrg !== 'farmerMSP') {
            throw new Error(`Client of org ${clientOrg} is not authorized to create a token `);
        }

        // get id of the user
        const minter = ctx.clientIdentity.getID();

        const nft = {
            tokenId: tokenId,
            owner: minter,
            farmer: farmerURI
        };

        await ctx.stub.putState(tokenId, Buffer.from(JSON.stringify(nft)));

        return tokenId;
    }

    // create token over token
    async createTokensOverToken(ctx, tokenIds, parentTokenId, numberOfTokens, metadataURI){
        // get parent token data
        const tokenAsBytes = await ctx.stub.getState(parentTokenId);
        if (!tokenAsBytes || tokenAsBytes.length === 0) {
            throw new Error('tokenId ' + parentTokenId + ' does not exist');
        }

        const parentToken = JSON.parse(tokenAsBytes.toString());
        parentToken.childTokenId = [];
        tokenIds = JSON.parse(tokenIds);

        const minter = ctx.clientIdentity.getID();

        for (let i = 0; i < numberOfTokens; i++) {
            let TokenOverToken = {
                tokenId: tokenIds[i],
                owner: minter,
                parentTokenId: parentTokenId,
                metadataURI: metadataURI
            }
            
            parentToken.childTokenId.push(tokenIds[i]);
            await ctx.stub.putState(tokenIds[i], Buffer.from(JSON.stringify(TokenOverToken)));
        }
        
        
        // add child token id to parent token
        await ctx.stub.putState(parentTokenId, Buffer.from(JSON.stringify(parentToken)));

        return tokenIds;
    }


    // transfer NFT from one owner to another
    async transferFrom(ctx, to, tokenId) {

        // get current user
        const owner = ctx.clientIdentity.getID();

        // read nft token data
        const nft = await this.readNFT(ctx, tokenId);

        // Check if the current user is the owner of the token
        if(nft.owner !== owner) {
            throw new Error(owner + ' is not owner of tokenId ' + tokenId);
        }

        // Check if the token is locked
        if ("lock" in nft) {
            return "token is locked";
        }

        // Update the owner of the token
        nft.owner = to;
        await ctx.stub.putState(tokenId, Buffer.from(JSON.stringify(nft)));

        return tokenId;
    }

    // to add metadata to the token
    async addMetadata(ctx, tokenId, metadataURI) {
        
        // get current user
        const owner = ctx.clientIdentity.getID();

        // check if the tokenId exists
        const exists = await this.nftExists(ctx, tokenId);
        if(!exists) {
            throw new Error('Token ' + tokenId + ' does not exist');
        }

        // check if the user is authorized to add metadata
        let nft = await this.readNFT(ctx, tokenId);
        if(nft.owner !== owner) {
            throw new Error('User is not authorized to add metadata');
        }

        if ("lock" in nft) {
            return "token is locked";
        }

        // add metadata to the token
        let orgName = ctx.clientIdentity.getMSPID();
        orgName = orgName.slice(0, -3).toLowerCase();
        nft[orgName] = metadataURI;

        await ctx.stub.putState(tokenId, Buffer.from(JSON.stringify(nft)));
                
        return nft;
    }

    // to lock the token
    async lockToken(ctx, tokenId) {

        // get current user
        const owner = ctx.clientIdentity.getID();

        // check if the tokenId exists
        const exists = await this.nftExists(ctx, tokenId);
        if(!exists) {
            throw new Error('Token ' + tokenId + ' does not exist');
        }

        // check if the user is authorized to lock the token
        let nft = await this.readNFT(ctx, tokenId);
        if(nft.owner !== owner) {
            throw new Error('User is not authorized to lock the token');
        }

        nft.lock = true;

        await ctx.stub.putState(tokenId, Buffer.from(JSON.stringify(nft)));

        return nft;
    }

    // read the NFT from the ledger
    async readNFT(ctx, tokenId) {
        // get token data from the ledger
        const nftBytes = await ctx.stub.getState(tokenId);
        
        // check if the NFT exists
        if (!nftBytes || nftBytes.length === 0) {
            throw new Error('tokenId ' + tokenId + ' does not exist');
        }
        
        // convert the buffer into JSON object
        const nft = JSON.parse(nftBytes.toString());
        return nft;
    }

    // read all the NFT of the user
    async readAllNFT(ctx){
        // get current user
        const owner = ctx.clientIdentity.getID();

        // get all the NFT from the ledger
        const iterator = await ctx.stub.getStateByRange('', '');
        const allResults = [];

        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                const nft = JSON.parse(res.value.value.toString('utf8'));

                if("lock" in nft) {
                    continue;
                }

                // check if the user is owner of the NFT
                if(nft.owner === owner) {
                    allResults.push({ Key: res.value.key, Record: nft });
                }
            }

            if (res.done) {
                await iterator.close();
                return allResults;
            }
        }
    }

    async readByConsumer(ctx, tokenId){
        
        const nftBytes = await ctx.stub.getState(tokenId);

        if (!nftBytes || nftBytes.length === 0) {
            throw new Error('tokenId ' + tokenId + ' is not available');
        }

        const nft = JSON.parse(nftBytes.toString());

        if("lock" in nft) {
            return nft;
        } else{
            throw new Error('tokenId ' + tokenId + ' is not available');
        }

    }

    // get history of the NFT
    async getHistory(ctx, tokenId) {
        const historyIterator = await ctx.stub.getHistoryForKey(tokenId);
        const historyList = [];

        while (true) {
            const historyRecord = await historyIterator.next();

            if(historyRecord.done) {
                await historyIterator.close();
                return historyList;
            }

            const transaction = historyRecord.value;

            historyList.push({
                transactionId: transaction.txId,
                timestamp: transaction.timestamp,
                isDelete: transaction.is_delete,
                value: transaction.value.toString('utf8')
            });
        }
    }

    // check if the NFT exists
    async nftExists(ctx, tokenId) {
        
        const nftBytes = await ctx.stub.getState(tokenId);
        return nftBytes && nftBytes.length > 0;
    }

}

module.exports = SupplyChainContracts;