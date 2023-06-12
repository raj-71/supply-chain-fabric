import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../common/loader";
import profileService from "../../services/profileService";
import defaultProfile from "../../assets/images/common/defaultProfile.jpg";

function UpdateProfile() {
  const location = useLocation();

  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [roomNo, setRoomNo] = useState("");
  const [hallNo, setHallNo] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [profileImageUpload, setProfileImageUpload] = useState();
  const [textPrompt, setTextPrompt] = useState("");

  const navigate = useNavigate();

  const getProfile = async () => {
    setLoader(true);

    if (location.state) {
      setTextPrompt(location.state.promptText);
    }
    const res = await profileService.getProfileToUpdate();

    if (res.data.success) {
      setName(res.data.user.name ? res.data.user.name : "");
      setGender(res.data.user.gender ? res.data.user.gender : "");
      setRoomNo(res.data.user.roomno ? res.data.user.roomno : "");
      setHallNo(res.data.user.hallno ? res.data.user.hallno : "");
      setFullAddress(res.data.user.address ? res.data.user.address : "");
      setPhoneNo(res.data.user.phoneno ? res.data.user.phoneno : "");
      setProfileImage(res.data.user.image ? res.data.user.image : "");
      setProfileImageUpload(res.data.user.image ? res.data.user.image : "");
    }

    setLoader(false);
  };

  useEffect(() => {
    getProfile();
  }, []);

  const handleUpdateDataChange = (e) => {
    if(e.target.files[0].size/1024 > 4096){
      setError("Image size should be less than 4MB");
      setProfileImageUpload("");
      return;
    }
    else{

      const reader = new FileReader();
      setProfileImageUpload("");
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfileImage(reader.result);
        setProfileImageUpload(reader.result);
      }
    };
    
    reader.readAsDataURL(e.target.files[0]);
  }
  };

  const postProfile = async (e) => {
    setLoader(true);
    e.preventDefault();
    setError("");
    setSuccess("");

    const data = {
      phoneno: phoneNo,
      address: fullAddress,
      gender: gender,
      roomno: roomNo,
      hallno: hallNo,
      image: profileImageUpload,
    };

    try {
      const res = await profileService.updateProfile(data);
      if (res.data.success) {
        setLoader(false);
        setTextPrompt("");
        localStorage.setItem("profile", true);
        setSuccess(res.data.message + "!");

        setTimeout(() => {
          navigate("/profile");
        }, 1000);
      } else {
        setLoader(false);
        setError("Something went wrong!!!");
      }
    } catch (error) {
      setError("Something went wrong!!!");
      setLoader(false);
    }
  };

  // const handleFileChange = (e) => {
  //   setProfileImageUpload(e.target.files[0]);
  //   setProfileImage(URL.createObjectURL(e.target.files[0]));
  // };

  return (
    <>
      <div>
        <div className="flex-auto px-4 lg:px-10 pb-10 text-2xl mt-5 mx-5 md:mx-48">
          <div className="text-center mb-3 font-bold uppercase">
            <small>Update Profile</small>
          </div>
          <form onSubmit={(e) => postProfile(e)}>
            <div className="relative w-full mb-3 mt-7">
              <div className="flex justify-center mb-7">
                <div className="w-28 h-28 relative">
                  <img
                    className="rounded-full mx-auto border w-28 h-28"
                    src={profileImage ? profileImage : defaultProfile}
                    alt="Rounded avatar"
                  />
                  <div className="profile-image">
                    <label
                      htmlFor="file-input"
                      className="absolute bottom-0 right-0 p-1 inline-block w-10 h-10 border-2 cursor-pointer border-white bg-gray-300 rounded-full"
                    >
                      <svg
                        xmlns="h    ttp://www.w3.org/2000/svg"
                        fill="black"
                        className="bi bi-camera"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z" />{" "}
                        <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />{" "}
                      </svg>
                    </label>
                    <input
                      type="file"
                      id="file-input"
                      name="avatar"
                      accept="image/*"
                      onChange={handleUpdateDataChange}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>
              <div className="text-red-500 text-center text-base my-5">
                {textPrompt}
              </div>
              <div className="grid gap-1 grid-cols-2">
                <div>
                  <label
                    className="block uppercase text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Name
                  </label>
                  <input
                    type="name"
                    className="border-0 px-3 py-3 placeholder-gray-400 
                  text-gray-700 bg-white rounded text-sm shadow 
                  focus:outline-none focus:ring w-full"
                    placeholder="Name"
                    style={{ transition: "all 0.15s ease 0s" }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    className="block uppercase text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Gender
                  </label>
                  <select
                    id="gender"
                    className={`form-control cursor-pointer block w-full px-3
                   py-3 text-sm font-normal ${
                     gender === "" ? "text-gray-400" : "text-gray-700"
                   } bg-white 
                   bg-clip-padding border-0 border-solid border-gray-300 
                   rounded transition ease-in-out focus:text-gray-700
                    focus:bg-white focus:border-indigo-600 shadow
                    focus:outline-none`}
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                  >
                    <option value="" disabled hidden>
                      Gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Address
              </label>
              <div className="grid gap-1 grid-cols-2">
                <input
                  type="text"
                  className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                  placeholder="Room No."
                  style={{ transition: "all 0.15s ease 0s" }}
                  value={roomNo}
                  onChange={(e) => setRoomNo(e.target.value)}
                  required
                />
                <input
                  type="text"
                  className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                  placeholder="Hall No."
                  style={{ transition: "all 0.15s ease 0s" }}
                  value={hallNo}
                  onChange={(e) => setHallNo(e.target.value)}
                  required
                />
                <input
                  type="text"
                  className="border-0 col-span-2 px-3 mt-2 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                  placeholder="Complete Address"
                  style={{ transition: "all 0.15s ease 0s" }}
                  value={fullAddress}
                  onChange={(e) => setFullAddress(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Phone Number
              </label>
              <input
                type="number"
                className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                placeholder="Phone Number"
                style={{ transition: "all 0.15s ease 0s" }}
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                required
              />
            </div>
            {error ? (
              <div className="text-red-500 text-sm text-center  ">{error}</div>
            ) : null}
            {success ? (
              <div className="text-green-500 text-sm text-center  ">
                {success}
              </div>
            ) : null}
            <div className="text-center mt-4">
              <button
                className="bg-indigo-600 text-white active:bg-indigo-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                type="submit"
                style={{ transition: "all 0.15s ease 0s" }}
                disabled={loader}
              >
                {loader ? <Loader height={5} width={5} /> : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default UpdateProfile;
