import httpService from "./httpService";

function getPatient(id) {
    return httpService.get(`/patients/${id}`);
}

function getPatientHealthRecords(id) {
    return httpService.get(`/patients/${id}/health-records`);
}

function patientExists(id) {
    return httpService.get(`/patients/${id}/exists`);
}

function getOrganizationList(orgName) {
    return httpService.get(`/user-list/${orgName}`);
}

function getPatientDetails(id) {
    return httpService.get(`/channels/main-channel1/chaincodes/chaincode1`);
}

function giveAccess(accessId) {
    return httpService.post(`/give-access`, { accessId });
}

function removeAccess(accessId) {
    return httpService.post(`/remove-access`, { accessId });
}

function getHealthRecords() {
    return httpService.get(`/patient-health-records`);
}

function getLabRecords() {
    return httpService.get(`/patient-lab-records`);
}

function getPharmacyRecords() {
    return httpService.get(`/patient-pharmacy-records`);
}

function getInsuranceRecords() {
    return httpService.get(`/patient-insurance-records`);
}

function getUserDetails(){
    return httpService.get('/get-user-detail');
}

function postPrescription(data){
    console.log('data: ', data);
    // return true;
    return httpService.post('/prescription', data);
}

function getPatientAccessList(){
    return httpService.get('/get-user-detail');
}

function postMedicinePharmacy(data){
    console.log('data: ', data);
    return httpService.post('/medicine-record', data);
}

function postLabReport(data){
    console.log('data: ', data);
    return httpService.post('/lab-reports', data);
}

function postInsuranceResponse(data){
    console.log('data: ', data);
    return httpService.post('/response-claim', data);
}

function postclaimrequest(data){
    return httpService.post(`/claim-request`, data);
}

const paitientService = { getOrganizationList,getUserDetails ,getPatientDetails, giveAccess, removeAccess, getHealthRecords, getInsuranceRecords, getLabRecords, getPharmacyRecords, postPrescription, getPatientAccessList, postclaimrequest, postMedicinePharmacy, getPatient, getPatientHealthRecords, patientExists, postInsuranceResponse ,postLabReport };
// const paitientService = { getOrganizationList,getUserDetails ,getPatientDetails, giveAccess, removeAccess, getHealthRecords, getInsuranceRecords, getLabRecords, getPharmacyRecords, postPrescription, getPatientAccessList, };
export default paitientService;