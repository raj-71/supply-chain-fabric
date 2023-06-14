import httpService from "./httpService";
const apiEndpoint = "channels/my-channel1/chaincodes/chaincode1";

function sellToConsumer(tokenId, privateKey){
    return httpService.post(apiEndpoint, {
        peers: ["peer0.retailer.supplychain.com"],
        fcn: "lockToken",
        args: [tokenId],
        privateKey
    });
}

function getTokens(privateKey){
    return httpService.post(apiEndpoint, {
        peers: ["peer0.retailer.supplychain.com"],
        fcn: "readAllNFT",
        args: [],
        privateKey
    });
}

const RetailerService = { sellToConsumer, getTokens };

export default RetailerService;