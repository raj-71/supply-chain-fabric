const { Gateway, Wallets, TxEventHandler, GatewayOptions, DefaultEventHandlerStrategies, TxEventHandlerFactory } = require('fabric-network');
const fs = require('fs');
const EventStrategies = require('fabric-network/lib/impl/event/defaulteventhandlerstrategies');
const path = require("path")
const log4js = require('log4js');
const logger = log4js.getLogger('BasicNetwork');
const util = require('util')

const helper = require('./helper');
const { blockListener, contractListener } = require('./Listeners');
const query = require('./query');

const generateTokenId = async (channelName, chaincodeName, fcn, args, username, orgname) => {
    try {
        let exists = true;
        let tokenId = '';
        const characters = '0123456789abcdefghijklmnopqrstuvwxyz';

        while (exists) {
            for (let i = 0; i < 32; i++) {
                tokenId += characters.charAt(Math.floor(Math.random() * 36));
            }
            let message = await query.query(channelName, chaincodeName, tokenId, "nftExists", username, orgname);
            exists = JSON.parse(message.toString());
        }
        return {
            success: true,
            tokenId: tokenId
        };
    }
    catch (error) {
        console.error(`Failed to generate token Id: ${error}`);
        return {
            success: false,
            message: error.message
        }
    }
}

const invokeTransaction = async (channelName, chaincodeName, fcn, args, username, org_name, transientData, privateKey) => {
    try {
        console.log("privateKey: ", privateKey);
        const ccp = await helper.getCCP(org_name);

        const walletPath = await helper.getWalletPath(org_name);
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        let identity = await wallet.get(username);

        if (!identity) {
            return {
                success: false,
                message: `${username} does not exist!`
            }
        }
        
        identity.credentials.privateKey = privateKey;

        const connectOptions = {
            wallet, identity, discovery: { enabled: true, asLocalhost: true }
        }

        const gateway = new Gateway();
        await gateway.connect(ccp, connectOptions);

        const network = await gateway.getNetwork(channelName);
        const contract = network.getContract(chaincodeName);
        let result;
        let txn;
        let message;

        // Multiple smartcontract in one chaincode
        switch (fcn) {
            case "createToken":
                console.log("generating tokenId...");
                let genTokenId = await generateTokenId(channelName, chaincodeName, fcn, args, username, org_name);
                if(genTokenId.success == false) {
                    return {
                        success: false,
                        message: "Failed to generate tokenId!"
                    }
                } else {
                    console.log("tokenId: ", genTokenId);
                    txn = await contract.submitTransaction(fcn, genTokenId.tokenId, JSON.stringify(args[0]));
                    txn = txn.toString()
                    console.log("result: =========", txn);
                }
                return {
                    success: true,
                    txn,
                };
            case "transferFrom":
                txn = await contract.submitTransaction(fcn, args[0], args[1]);
                txn = txn.toString();
                return {
                    success: true,
                    txn,
                }
                break;
            case "addMetadata":
                result = await contract.submitTransaction(fcn, args[0], args[1]);
                result = { txid: result.toString() }
                break;
            case "_generateTokenId":
                result = await contract.submitTransaction(fcn);
                result = { txid: result.toString() }
                break;
            case "readAllNFT":
                txn = await contract.evaluateTransaction(fcn);
                txn = JSON.parse(txn.toString());
                console.log(txn);
                return {
                    success: true,
                    txn,
                }
            case "lockToken":
                txn = await contract.submitTransaction(fcn, args[0]);
                txn = txn.toString();
                console.log(txn);
                return {
                    success: true,
                    txn,
                }
                break;
            case "createTokensOverToken":
                let tokenIds = [];
                console.log("args[1]: ", args[1]);
                for (let i = 0; i < args[1]; i++) {
                    let token = await generateTokenId(channelName, chaincodeName, fcn, args, username, org_name);
                    console.log(`token${i}: `, token);
                    tokenIds.push(token);
                }
                tokenIds = tokenIds.map(obj => obj.tokenId);
                console.log("before createTokensOverToken: ", tokenIds);
                txn = await contract.submitTransaction(fcn, JSON.stringify(tokenIds), args[0], args[1], JSON.stringify(args[2]));
                txn = txn.toString();
                console.log("after createTokensOverToken: ", txn);
                return {
                    success: true,
                    txn,
                }
                break;
            default:
        }

        await gateway.disconnect();

        let response = {
            message: message,
            result
        }

        return response;


    } catch (error) {

        console.log(`Getting error: ${error}`)
        return {
            success: false,
            message: error.message
        }

    }
}

exports.invokeTransaction = invokeTransaction;