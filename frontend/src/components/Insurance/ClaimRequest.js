import React, { useState } from "react";
import Input from "../../common/input";
import Loader from "../../common/loader";
import paitientService from "../../services/patientService";

function ClaimRequest() {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const [patientId, setPatientId] = useState("");
  const [recordId, setRecordId] = useState("");
  const [claimStatus, setClaimStatus] = useState("Approve");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoader(true);
    setError("");
    setSuccess("");

    console.log("recordId: ", recordId);
    console.log("patientId: ", patientId);
    console.log("claimStatus: ", claimStatus);

    const postData = {
      recordId: recordId,
      patientId: patientId,
      status: claimStatus,
    };

    try {
      const res = await paitientService.postInsuranceResponse(postData);

      if (res) {
        setLoader(false);
        console.log("response data");
        console.log(res.data);
      }
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 min-h-[93vh] py-10">
        <div className="flex flex-col items-center justify-center px-6 mx-auto lg:py-0">
          <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h2 className="mb-1 text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Claim Response
            </h2>
            <form
              className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
              onSubmit={(e) => handleSubmit(e)}
            >
              <Input
                label="Patient Id"
                type="number"
                id="patientid"
                required
                value={patientId}
                onChange={setPatientId}
              />

              <Input
                label="Record Id"
                type="number"
                id="recordId"
                required
                value={recordId}
                onChange={setRecordId}
              />

              <div class="mt-6">
                {/* Dropdown input box, center aligned*/}
                <label
                  for="claimResponse"
                  class="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Claim Response
                </label>
                <div className="relative">
                  <select
                    id="dropdown"
                    name="dropdown"
                    className="block appearance-none w-full py-2 px-3 border text-gray-300 border-gray-500 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    defaultValue="Select"
                    value={claimStatus}
                    onChange={(e) => setClaimStatus(e.target.value)}
                  >
                    <option value={"Approve"}>Approve</option>
                    <option value={"Decline"}>Decline</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {error ? (
                <div className="text-red-500 text-sm text-center  ">
                  {error}
                </div>
              ) : null}
              {success ? (
                <div className="text-green-500 text-sm text-center  ">
                  {success}
                </div>
              ) : null}

              <button
                type="submit"
                className="w-full text-white bg-indigo-600 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {loader ? <Loader height={5} width={5} /> : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
export default ClaimRequest;
