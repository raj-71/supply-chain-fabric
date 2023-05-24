'use strict';

const { Contract } = require('fabric-contract-api');

const nftPrefix = 'nft';

class SupplyChainContracts extends Contract {

    // to create token but only farmer is authorized to create token
    async createToken(ctx, farmerURI) {
        
        // check if the user is authorized to create a token
        const clientOrg = ctx.clientIdentity.getMSPID();
        if(clientOrg !== 'farmerMSP') {
            throw new Error(`Client of org ${clientOrg} is not authorized to create a token `);
        }

        // get id of the user
        const minter = ctx.clientIdentity.getID();

        const tokenId = await this._generateTokenId(ctx);

        const nft = {
            tokenId: tokenId,
            owner: minter,
            farmer: farmerURI
        };

        // const nftKey = ctx.stub.createCompositeKey(nftPrefix, [tokenId]);
        await ctx.stub.putState(tokenId, Buffer.from(JSON.stringify(nft)));

        return tokenId;
    }

    // transfer NFT from one owner to another
    async transferFrom(ctx, to, tokenId) {

        // get current user
        const owner = ctx.clientIdentity.getID();

        // read nft token data
        const nft = await this._readNFT(ctx, tokenId);

        // Check if the current user is the owner of the token
        if(nft.owner !== owner) {
            throw new Error(owner + ' is not owner of tokenId ' + tokenId);
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
        const exists = await this._nftExists(ctx, tokenId);
        if(!exists) {
            throw new Error('Token ' + tokenId + ' does not exist');
        }

        // check if the user is authorized to add metadata
        let nft = await this._readNFT(ctx, tokenId);
        if(nft.owner !== owner) {
            throw new Error('User is not authorized to add metadata');
        }

        // add metadata to the token
        let orgName = ctx.clientIdentity.getMSPID();
        orgName = orgName.slice(0, -3).toLowerCase();
        nft[orgName] = metadataURI;

        await ctx.stub.putState(tokenId, Buffer.from(JSON.stringify(nft)));
                
        return nft;
    }

    // to query the asset data from the ledger by tokenId
    async queryNFT(ctx, tokenId) {
        const nft = await this._readNFT(ctx, tokenId);
        return nft;
    }

    // to generate tokenId for an asset
    async _generateTokenId(ctx) {
        let exists = false;
        let tokenId = '';
        const characters = '0123456789abcdefghijklmnopqrstuvwxyz';

        while (!exists) {
            for (let i = 0; i < 32; i++) {
                tokenId += characters.charAt(Math.floor(Math.random() * 36));
            }
            exists = await this._nftExists(ctx, tokenId);
        }
        return tokenId;
    }

    // read the NFT from the ledger
    async _readNFT(ctx, tokenId) {
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

    // get history of the NFT
    async _getHistory(ctx, tokenId) {
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
        // const history = await ctx.stub.getHistoryForKey(tokenId);
        // const historyList = [];
        // while (true) {
        //     const historyRecord = await history.next();
        //     if (historyRecord.value && historyRecord.value.value.toString()) {
        //         let nft;
        //         try {
        //             nft = JSON.parse(historyRecord.value.value.toString('utf8'));
        //         } catch (err) {
        //             console.log(err);
        //             nft = historyRecord.value.value.toString('utf8');
        //         }
        //         historyList.push(nft);
        //     }
        //     if (historyRecord.done) {
        //         await history.close();
        //         return historyList;
        //     }
        // }
    }

    // check if the NFT exists
    async _nftExists(ctx, tokenId) {
        
        const nftBytes = await ctx.stub.getState(tokenId);
        return nftBytes && nftBytes.length > 0;
    }

}

module.exports = SupplyChainContracts;