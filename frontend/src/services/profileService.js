import httpService from "./httpService";
const apiEndpoint = "/profile-me";

function getProfile() {
    return httpService.get(apiEndpoint);
}

function getProfileToUpdate(){
    return httpService.get("/profile");
}

function updateProfile(data) {
    console.log(data);
    return httpService.put('update-profile', data);
}

const profileService = { getProfile, updateProfile, getProfileToUpdate };

export default profileService;