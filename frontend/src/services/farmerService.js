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

const FarmerService = { createToken };

export default FarmerService;