import httpService from "./httpService";
const apiEndpoint = "channels/my-channel1/chaincodes/chaincode1";

function generateTokensOverToken(tokenId, numberOfTokens, metaData, privateKey){
    return httpService.post(apiEndpoint, {
        peers: ["peer0.wholesaler.supplychain.com"],
        fcn: "createTokensOverToken",
        args: [tokenId, numberOfTokens, metaData],
        privateKey
    });
}

function sellToRetailer(tokenId, retailerId, privateKey){
    return httpService.post(apiEndpoint, {
        peers: ["peer0.wholesaler.supplychain.com"],
        fcn: "transferFrom",
        args: [`x509::/OU=client/OU=retailer/OU=department1/CN=${retailerId}::/C=US/ST=California/L=San Francisco/O=retailer.supplychain.com/CN=ca.retailer.supplychain.com`, tokenId],
        privateKey
    });
}

function getTokens(privateKey){
    return httpService.post(apiEndpoint, {
        peers: ["peer0.wholesaler.supplychain.com"],
        fcn: "readAllNFT",
        args: [],
        privateKey
    });
}

const WholesalerService = { generateTokensOverToken, sellToRetailer, getTokens };

export default WholesalerService;