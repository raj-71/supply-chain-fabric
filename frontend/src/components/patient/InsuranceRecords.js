import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../common/loader";
import AutoService from "../../services/AutoServices";
import Table from "../Table/table";
import paitientService from "../../services/patientService";
import authService from "../../services/authService";
function InsuranceRecords(props) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [postLoading, setPostLoading] = useState(false);

  const [doctorsList, setDoctorsList] = useState([]);
  const [data, setData] = useState([]);

  const { id } = useParams();
  const [isEdit, setIsEdit] = useState(id ? true : false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e);
  };

  const applyforclaim = async (recordId, patientId) => {
    console.log(recordId, patientId);
    let ClaimStatus = await paitientService.postclaimrequest({
      recordId,
      patientId,
    });
    if (ClaimStatus.success) {
      window.alert(`${ClaimStatus.message.message}`);
      window.location.reload();
    }
  };

  useEffect(() => {
    const getInsuranceRecords = async () => {
      let InsuranceRecords = await paitientService.getInsuranceRecords();
      console.log(InsuranceRecords.data.recordsData);
      setData(InsuranceRecords.data.recordsData);
    };
    getInsuranceRecords();
  }, [id]);

  return (
    <>
      <>
        {data.length === 0 ? (
          <div className="text-lg">No Prescription</div>
        ) : (
          <div className="flex justify-center">
            <div className="flex flex-col">
              <h2 className="font-bold text-lg mb-2 text-center mt-10">
                Record Details
              </h2>
              <div className="flex justify-between">
                {data.map((record, index) => (
                  <div key={index}>
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                          <table className="min-w-full divide-y divide-gray-200 mt-8">
                            <tbody className="bg-white divide-y divide-gray-200">
                              <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  Record ID
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {record.recordId}
                                </td>
                              </tr>
                              <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  Date
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {record.claimRequestDate}
                                </td>
                              </tr>
                              <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  Status
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {record.status}
                                </td>
                              </tr>

                              {record.insuranceClaim ? (
                                <>
                                  <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                      Claim
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      <button className="w-full text-white bg-indigo-600 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                        Claimed
                                      </button>
                                    </td>
                                  </tr>
                                </>
                              ) : (
                                <>
                                  <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                      Claim
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      <button
                                        onClick={() =>
                                          applyforclaim(
                                            record.recordId,
                                            authService.getId()
                                          )
                                        }
                                        className="w-full text-white bg-green-600 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                      >
                                        Apply for Claim
                                      </button>
                                    </td>
                                  </tr>
                                </>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {/* Show prescription by Doctor */}
      </>
    </>
  );
}

export default InsuranceRecords;
