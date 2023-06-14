const { Gateway, Wallets, } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const fs = require('fs');
const path = require("path")
const log4js = require('log4js');
const logger = log4js.getLogger('BasicNetwork');
const util = require('util')


const helper = require('./helper');

const queryByConsumer = async (fcn, tokenId) => {
    const ccp = await helper.getCCP("farmer");

    const walletPath = await helper.getWalletPath("farmer");
    const wallet = await Wallets.newFileSystemWallet(walletPath);

    let identity = await wallet.get("admin");

    const gateway = new Gateway();
    await gateway.connect(ccp, {
        wallet, identity: "admin", discovery: { enabled: true, asLocalhost: true }
    });

    const network = await gateway.getNetwork("my-channel1");
    const contract = network.getContract("chaincode1");
    
    let result = await contract.submitTransaction(fcn, tokenId);
    console.log("result: =========", result);
    console.log("result: =========", result.toString());
    result = {txid: result.toString()}
    return result;
}


const query = async (channelName, chaincodeName, args, fcn, username, org_name, privateKey) => {

    try {
        // load the network configuration
        // const ccpPath = path.resolve(__dirname, '..', 'config', 'connection-org1.json');
        // const ccpJSON = fs.readFileSync(ccpPath, 'utf8')
        const ccp = await helper.getCCP(org_name) //JSON.parse(ccpJSON);

        // Create a new file system based wallet for managing identities.
        const walletPath = await helper.getWalletPath(org_name) //.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        let identity = await wallet.get(username);

        identity.credentials.privateKey = privateKey;

        if (!identity) {
            console.log(`An identity for the user ${username} does not exist in the wallet, so registering user`);
            await helper.getRegisteredUser(username, org_name, true)
            identity = await wallet.get(username);
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, {
            wallet, identity: username, discovery: { enabled: true, asLocalhost: true }
        });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork(channelName);

        // Get the contract from the network.
        const contract = network.getContract(chaincodeName);
        let result;

        switch (fcn) {
            case "generateTokenId":
                result = await contract.submitTransaction(fcn);
                console.log("result: =========", result);
                // result = {txid: result.toString()}
                break;
            case "nftExists":
                result = await contract.evaluateTransaction(fcn, args[0]);
                console.log("query result: =========", result);
                break;
            case "GetDocumentUsingCarContract":
                console.log("=============")
                result = await contract.evaluateTransaction('SmartContract:'+fcn, args[0]);
                break;
            case "GetHistoryForAsset":
            case "GetCarById":
                console.log("=============")
                result = await contract.evaluateTransaction(fcn, args[0]);
                break;
            default:
                break;
        }

        console.log(result)
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);

        result = JSON.parse(result.toString());
        return result
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        return error.message

    }
}

module.exports = {
    query,
    queryByConsumer
}