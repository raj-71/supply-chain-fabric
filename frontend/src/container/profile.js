import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../common/loader";
import profileService from "../services/profileService";
import defaultProfile from "../assets/images/common/defaultProfile.jpg";

function Profile() {
  const [loader, setLoader] = useState(true);
  const [userData, setUserData] = useState();

  const navigate = useNavigate();

  const getProfile = async () => {
    try {
      const res = await profileService.getProfile();
      setUserData(res.data.user);
      localStorage.setItem("profileImage", res.data.user.image);
      setLoader(false);
    } catch (err) {
      if (err.response) {
      }
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      {loader ? <div className="mt-10"><Loader/></div> : (
        <>
          <div className="min-h-screen bg-gray-100">
            <div className="w-full text-white bg-main-color">
              <div
                x-data="{ open: false }"
                className="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8"
              ></div>
            </div>
            {/* <!-- End of Navbar --> */}

            <div className="container mx-auto my-5 p-5">
              <div className="md:flex no-wrap md:-mx-2">
                {/* <!-- Left Side --> */}
                <div className="w-full h-64 md:w-3/12 mx-2">
                  {/* <!-- Profile Card --> */}
                  <div className="bg-white p-3 border-t-4">
                    <div className="image overflow-hidden">
                      <img
                        className="h-auto w-full mx-auto"
                        src="img/myimage.jpeg"
                        alt=""
                      />
                    </div>
                    <h1 className="text-gray-900 text-center font-bold text-xl leading-8 my-1">
                      Profile Image
                    </h1>
                    <div className="flex justify-center">
                      <div className="w-28 h-28 my-5">
                        <img
                          className="rounded-full mx-auto"
                          // src={"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                          src={userData.image ? userData.image : defaultProfile}
                          alt="Rounded avatar"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full mx-2 h-64">
                  <div className="bg-white p-3 shadow-sm rounded-sm border-t-4">
                    <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                      <span clas="text-green-500">
                        <svg
                          className="h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </span>
                      <span className="tracking-wide">About</span>
                    </div>
                    <div className="text-gray-700 mt-5">
                      <div className="grid md:grid-cols-2 text-sm">
                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">
                            Full Name
                          </div>
                          <div className="px-4 py-2">{userData?.name}</div>
                        </div>
                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">Gender</div>
                          <div className="px-4 py-2">{userData?.gender}</div>
                        </div>
                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">
                            Contact No.
                          </div>
                          <div className="px-4 py-2">{userData?.phoneno}</div>
                        </div>
                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">
                            Room No.
                          </div>
                          <div className="px-4 py-2">
                            {userData?.roomno}
                          </div>
                        </div>
                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">
                            Hall No.
                          </div>
                          <div className="px-4 py-2">
                           {userData?.hallno}
                          </div>
                        </div>
                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">Email.</div>
                          <div className="px-4 py-2">
                            <a
                              className="text-blue-800"
                              href="mailto:jane@example.com"
                            >
                              {userData?.email}
                            </a>
                          </div>
                        </div>
                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">
                            Account Created
                          </div>
                          <div className="px-4 py-2">{(new Date(userData?.createdAt)).toLocaleDateString("en-US")}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 grid-rows-1 mt-4">
                    <div className="flex justify-center">
                      <Link to="/update-profile" className="m-2 p-2 bg-indigo-600 hover:bg-indigo-800 text-white text-center text-m font-bold rounded-full w-11/12 lg:w-fit lg:px-6">
                        Edit Profile
                      </Link>
                    </div>

                    <div
                      onClick={() => navigate("/updatePassword")}
                      className="flex justify-center"
                    >
                      <button className="m-2 p-2 bg-indigo-600 hover:bg-indigo-800 text-white text-m font-bold rounded-full w-11/12 lg:w-fit lg:px-6">
                        Change Password
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Profile;
