import httpService from "./httpService";
const apiEndpoint = "/contact-us";

function postContactUs(data){
    return httpService.post(apiEndpoint, data);
}

const contactService = {postContactUs};

export default contactService;