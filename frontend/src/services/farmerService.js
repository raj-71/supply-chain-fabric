import httpService from "./httpService";
const apiEndpoint = "channels/my-channel1/chaincodes/chaincode1";

function createToken(data){
    return httpService.post(apiEndpoint, {
        peers: ["peer0.farmer.supplychain.com"],
        fcn: "createToken",
        args: [data]
    });
}

const FarmerService = { createToken };

export default FarmerService;