import httpService from "./httpService";



function postRequest(data) {
    return httpService.post("/request-for-cab", data);

}


export function getCabDetails(page,limit,date,from,to){
    return httpService.get(`/cab-requests?page=${page}&limit=${limit}${date ? `&date=${date}` : ''}${from ? `&headedfrom=${from}` : ''}${to ? `&headedto=${to}` : ''}`);
}

export function DeleteRequest(data){
    return httpService.delete("/cab-request-delete",{data : data})
}

export function getCabDetailsMe(){

    return httpService.get(`/cab-requests-me`)
  }

  function getRequestEnquire(id){
    return httpService.get(`/cab-request/phone-no/${id}`);
}


export function getRequest(id){
    return httpService.get(`/cab-request-me/${id}`);


}
function updateRequest(id, data) {

    let updateData = {
        requestid: id,
        data: {
            ...data
        }
    };
    
    return httpService.put(`/cab-request-update`, updateData);
}

const AutoService = {postRequest,getCabDetails,getCabDetailsMe,getRequestEnquire,DeleteRequest,getRequest,updateRequest};

export default AutoService;