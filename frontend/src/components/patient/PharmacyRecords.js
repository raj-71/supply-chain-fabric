import React, { useEffect, useState } from "react";
import Loader from "../../common/loader";
import paitientService from "../../services/patientService";

function PharmacyRecords(props) {
  const [loader, setLoader] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getPatientDetails = async () => {
      let res = await paitientService.getPharmacyRecords();
      console.log(res.data.recordsData);
        setData(res.data.recordsData);
        setLoader(false);
      
    }

    getPatientDetails();
  }, []);


  return (
    <>
      {
        loader ?
          <div className="mt-10">
            <Loader />
          </div>
          :
          <>
            {data.length === 0 ? (
              <div className="text-lg text-center">No Data Available</div>
            ) : (
              <div className="flex justify-center">
                <div className="flex flex-col">
                  <h2 className="font-bold text-lg mb-2 text-center mt-10">
                    Record Details
                  </h2>
                  <div className="flex justify-between">
                    {data.map((record, index) => (
                      <div key={index} >
                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                              <table className="min-w-full divide-y divide-gray-200 mt-8">
                                <tbody className="bg-white divide-y divide-gray-200">
                                  <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                      Doctor ID
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      {record.doctorId}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                      Date
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      {new Date(record.createdAt).toLocaleString("en-US", {timeZone: "Asia/Kolkata"})}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                      Medicines
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      <ul className="list-disc list-inside">
                                        {record.medicines.map((medicine, index) => (
                                          <li
                                            key={index}
                                            className={"text-gray-600 text-gray-600"}
                                          >
                                            {`${medicine.name} - ${medicine.dose}`}
                                          </li>
                                        ))}
                                      </ul>
                                    </td>
                                  </tr>
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
          </>

      }
    </>
  );




}

export default PharmacyRecords;