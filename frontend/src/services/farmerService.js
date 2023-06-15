import httpService from "./httpService";
const apiEndpoint = "channels/my-channel1/chaincodes/chaincode1";

function createToken(data, privateKey){
    return httpService.post(apiEndpoint, {
        peers: ["peer0.farmer.supplychain.com"],
        fcn: "createToken",
        args: [data],
        privateKey
    });
}

function sellToWholesaler(tokenId, wholesalerId, privateKey){
    return httpService.post(apiEndpoint, {
        peers: ["peer0.farmer.supplychain.com"],
        fcn: "transferFrom",
        args: [`x509::/OU=client/OU=wholesaler/OU=department1/CN=${wholesalerId}::/C=US/ST=California/L=San Francisco/O=wholesaler.supplychain.com/CN=ca.wholesaler.supplychain.com`, tokenId],
        privateKey
    });
}

function getTokens(privateKey){
    console.log("privateKey: ", privateKey);
    return httpService.post(apiEndpoint, {
        peers: ["peer0.farmer.supplychain.com"],
        fcn: "readAllNFT",
        args: [],
        privateKey
    });
}

const FarmerService = { createToken, sellToWholesaler, getTokens };

export default FarmerService;