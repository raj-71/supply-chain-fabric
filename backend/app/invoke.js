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
            console.log("tokenId")
            let message = await query.query(channelName, chaincodeName, tokenId, "nftExists", username, orgname);
            exists = JSON.parse(message.toString());
            console.log("message by generateTokenId: ", JSON.parse(message.toString()));
        }
        console.log("final tokenId by function: ", tokenId);
        return tokenId;
    }
    catch (error) {
        console.error(`Failed to generate token Id: ${error}`);
        process.exit(1);
    }
}

const invokeTransaction = async (channelName, chaincodeName, fcn, args, username, org_name, transientData, privateKey) => {
    try {
        const ccp = await helper.getCCP(org_name);
        console.log("==================", channelName, chaincodeName, fcn, args, username, org_name,)

        const walletPath = await helper.getWalletPath(org_name);
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);
        
        let identity = await wallet.get(username);

        identity.credentials.privateKey = privateKey;

        if (!identity) {
            console.log(`An identity for the user ${username} does not exist in the wallet, so registering user`);
            await helper.getRegisteredUser(username, org_name, true)
            identity = await wallet.get(username);
            console.log('Run the registerUser.js application before retrying');
            return;
        }


        const connectOptions = {
            wallet, identity: username, discovery: { enabled: true, asLocalhost: true }
            // eventHandlerOptions: EventStrategies.NONE
        }

        const gateway = new Gateway();
        await gateway.connect(ccp, connectOptions);

        const network = await gateway.getNetwork(channelName);
        const contract = network.getContract(chaincodeName);

        // Important: Please dont set listener here, I just showed how to set it. If we are doing here, it will set on every invoke call.
        // Instead create separate function and call it once server started, it will keep listening.
        // await contract.addContractListener(contractListener);
        // await network.addBlockListener(blockListener);


        // Multiple smartcontract in one chaincode
        let result;
        let message;

        switch (fcn) {
            case "createToken":
                console.log("before")
                let tokenId = await generateTokenId(channelName, chaincodeName, fcn, args, username, org_name);
                console.log("after tokenId: ", tokenId);
                result = await contract.submitTransaction(fcn, tokenId, JSON.stringify(args[0]));
                console.log("result: =========", result);
                result = {txid: result.toString()}
                break;
            case "transferFrom":
                result = await contract.submitTransaction(fcn, args[0], args[1]);
                result = {txid: result.toString()}
                break;
            case "addMetadata":
                result = await contract.submitTransaction(fcn, args[0], args[1]);
                result = {txid: result.toString()}
                break;
            case "_generateTokenId":
                result = await contract.submitTransaction(fcn);
                result = {txid: result.toString()}
                break;
            case "readAllNFT":
                result = await contract.evaluateTransaction(fcn);
                result = JSON.parse(result.toString());
                break;
            case "createTokensOverToken":
                let tokenIds = [];
                console.log("args[1]: ", args[1]);
                for (let i = 0; i < args[1]; i++) {
                    let token = await generateTokenId(channelName, chaincodeName, fcn, args, username, org_name);
                    console.log(`token${i}: `, token);
                    tokenIds.push(token);
                }
                console.log("before createTokensOverToken: ", tokenIds);
                result = await contract.submitTransaction(fcn, JSON.stringify(tokenIds), args[0], args[1], JSON.stringify(args[2]));
                result = {txid: result.toString()}
                break;
            default:
        }

        await gateway.disconnect();

        // result = JSON.parse(result.toString());

        let response = {
            message: message,
            result
        }

        return response;


    } catch (error) {

        console.log(`Getting error: ${error}`)
        return error.message

    }
}

exports.invokeTransaction = invokeTransaction;