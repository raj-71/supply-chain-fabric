import React, { useState } from "react";
import { Link } from "react-router-dom";
import authService from "../../services/authService";
import Loader from "../../common/loader";
import LoginPromt from "../../container/loginPrompt";
import AutoService from "../../services/AutoServices";
import defaultProfile from "../../assets/images/common/defaultProfile.jpg";

function RequestCard({ cabdata }) {
  const [loader, setLoader] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [enquiry, setEnquiry] = useState(false);
  const [enquiryData, setEnquiryData] = useState("");
  const [enquiryLoader, setEnquiryLoader] = useState(false);
  const [loginPrompt, setLoginPrompt] = useState(false);

    console.log(cabdata);

  const toggleLoginPrompt = () => {
    console.log("toggle");
    setLoginPrompt(false);
  };

  const deleteProduct = async (id) => {
    setLoader(true);
    const data = {
      requestid: `${id}`,
    };

    try {
      const res = await AutoService.DeleteRequest(data);
      console.log(res);

      if (res.data.success) {
        setDeleted(true);
      }
      setLoader(false);
    } catch (error) {
      setLoader(false);
    }
  };

  const enquireProduct = async (id) => {
    if (!localStorage.getItem("token")) {
      setLoginPrompt(true);
      return;
    }

    if (enquiryData.length < 10) {
      setEnquiryLoader(true);
      const res = await AutoService.getRequestEnquire(id);
      console.log(res.data);
      if (res.data.phoneNo) {
        setEnquiryData(res.data.phoneNo);
        setEnquiry(true);
        setEnquiryLoader(false);
      }
    }
  };

  const dialNumber = async (phNo) => {
    const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(
      navigator.userAgent
    );
    if (isMobileDevice) {
      window.location.href = `tel:${enquiryData}`;
    } else {
      // Handle non-mobile device behavior, e.g. show a message to call the number manually
    }
  };

  return (
    <>
      <div className="max-w-2xl px-8 py-4 m-2 mb-5 bg-white rounded-lg shadow-md hover:shadow-lg">
        <div className="flex items-center justify-between">
          <span className="text-md md:text-lg font-medium  text-gray-700">
            <small>From - </small>
            {cabdata?.placeinfo.location.from}
            <br />
            <small>To - </small>
            {cabdata?.placeinfo.location.to}
          </span>
          <button className="px-3 py-1 text-xs md:text-sm font-bold text-gray-100 bg-indigo-600 rounded ">
            {" "}
            <span className="font-semibold">Seats Left</span> -{" "}
            <big>{cabdata?.no_of_riders}</big>{" "}
          </button>
        </div>
        <div className="mt-2">
          <p className=" text-md md:text-lg font-medium text-gray-700 hover:text-gray-800">
            <small>Date Of Journey</small> -{" "}
            {new Date(cabdata?.placeinfo.Date).toLocaleDateString("en-GB", {})}
          </p>
        </div>
        <br></br>

        <div className="flex items-center mt-2 space-x-2">
          <span className="inline-flex items-center leading-none px-2.5 py-1.5 text-sm font-medium text-skin-inverted rounded-full border border-skin-input">
            <svg
              className="mr-1.5 h-2 w-2 brand-react"
              fill="currentColor"
              viewBox="0 0 8 8"
            >
              <circle cx="4" cy="4" r="3"></circle>
            </svg>
            Time -&nbsp;<span className="uppercase">{cabdata?.placeinfo.timeFormated}</span>
          </span>
          <span className="inline-flex items-center leading-none px-2.5 py-1.5 text-sm font-medium text-skin-inverted rounded-full border border-skin-input">
            <svg
              className="mr-1.5 h-2 w-2 brand-react"
              fill="currentColor"
              viewBox="0 0 8 8"
            >
              <circle cx="4" cy="4" r="3"></circle>
            </svg>
            Cab Type - {cabdata?.transport}
          </span>
        </div>
        <div className=" items-center justify-between mt-4">
          {authService.getCurrentUser() === cabdata?.userid ? (
            <>
              <div className="grid grid-cols-2 gap-4 h-12">
                <Link to={`/autoShare/editRequest/${cabdata?._id}`}>
                  <div className="flex justify-center">
                    <button className="m-2 p-2 bg-indigo-600 text-white hover:bg-indigo-800 text-m font-bold rounded-full w-full">
                      Edit
                    </button>
                  </div>
                </Link>

                <div
                  className="flex justify-center"
                  onClick={() => deleteProduct(cabdata?._id)}
                >
                  <button
                    className={`m-2 p-2 ${
                      deleted
                        ? "bg-red-700 hover:bg-red-800"
                        : "bg-indigo-600 hover:bg-indigo-800"
                    } text-white text-m font-bold rounded-full w-full`}
                  >
                    {loader ? (
                      <Loader height={5} width={5} />
                    ) : deleted ? (
                      "Deleted"
                    ) : (
                      "Delete"
                    )}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center">
                <img
                  src={
                    cabdata?.userid.image
                      ? cabdata?.userid.image
                      : defaultProfile
                  }
                  alt="Profile Pic"
                  className=" object-cover w-10 h-10 mx-4 rounded-full sm:block"
                />
                <div className="font-bold text-gray-700 cursor-pointer">
                  {cabdata?.userid.name}
                  <p className="text-sm text-gray-400">
                    {cabdata?.userid.email}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  enquiry
                    ? dialNumber(cabdata?._id)
                    : enquireProduct(cabdata?._id);
                }}
                className="focus:ring-offset-2 flex items-center justify-center leading-none py-4 mt-10 m-4 bg-indigo-600 hover:bg-indigo-800 shadow-md hover:shadow-lg transition duration-150 ease-in-out focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg text-white text-m font-bold rounded-full w-11/12"
              >
                {enquiryLoader ? (
                  <Loader height={5} width={5} />
                ) : enquiry ? (
                  `${enquiryData}`
                ) : (
                  "Enquire!"
                )}
              </button>
            </>
          )}
          {loginPrompt && (
            <LoginPromt toggleLoginPrompt={() => toggleLoginPrompt()} />
          )}
        </div>
      </div>
    </>
  );
}

export default RequestCard;
