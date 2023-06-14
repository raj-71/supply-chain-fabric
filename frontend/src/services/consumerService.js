import httpService from "./httpService";
const apiEndpoint = "/consumer";

function getTokenData(tokenId){
    return httpService.get(apiEndpoint, {params: {tokenId}});
}

const ConsumerService = { getTokenData };

export default ConsumerService;