import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../common/loader";
import Table from "../Table/table";

function LabData() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [postLoading, setPostLoading] = useState(false);
  const [data, setData] = useState([]);
  const [columnNames, setColumnNames] = useState([]);

  const [doctorsList, setDoctorsList] = useState([]);

  const { id } = useParams();
  const [isEdit, setIsEdit] = useState(id ? true : false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e);
  };

  useEffect(() => {
    const getLabData = async () => {
      const patientDummyData = [
        {
          patientId: "123456",
          name: "John Doe",
          dob: "01-01-1990",
          gender: "Male",
          aadharNumber: "123456789012",
          contact: "+91 9876543210",
          bloodGroup: "O+",
          address: "123 Main St, Anytown, USA",
          createdAt: "01-01-2023",
          medicalRecords: [
            {
              recordId: "23523452435",
              doctorId: "252345",
              createdAt: "01-01-2023",
              diagnosis: "illness, flu, headache",
              medicines: [
                {
                  name: "Medicine1",
                  dose: "3 times a day",
                  dispensed: false,
                },
                {
                  name: "Medicine2",
                  dose: "2 times a day",
                  dispensed: true,
                },
              ],
              labTests: [
                {
                  name: "Ultrasound",
                  labReport: {
                    reportFileHash: "RandomHash_najskdfjksdf",
                    dateOfReport: "02-01-2023",
                  },
                },
              ],
            },
            {
              recordId: "23523452435",
              doctorId: "252345",
              createdAt: "01-01-2023",
              diagnosis: "illness, flu, headache",
              medicines: [
                {
                  name: "Medicine1",
                  dose: "3 times a day",
                  dispensed: false,
                },
                {
                  name: "Medicine2",
                  dose: "2 times a day",
                  dispensed: true,
                },
              ],
              labTests: [
                {
                  name: "Ultrasound",
                  labReport: {
                    reportFileHash: "RandomHash_najskdfjksdf",
                    dateOfReport: "02-01-2023",
                  },
                },
              ],
            },
            {
              recordId: "23523452435",
              doctorId: "252345",
              createdAt: "01-01-2023",
              diagnosis: "illness, flu, headache",
              medicines: [
                {
                  name: "Medicine1",
                  dose: "3 times a day",
                  dispensed: false,
                },
                {
                  name: "Medicine2",
                  dose: "2 times a day",
                  dispensed: true,
                },
              ],
              labTests: [
                {
                  name: "Ultrasound",
                  labReport: {
                    reportFileHash: "RandomHash_najskdfjksdf",
                    dateOfReport: "02-01-2023",
                  },
                },
              ],
            },
          ],
          insuranceRecords: [
            {
              claimRequestId: "1491327498",
              claimRequestDate: "10-01-2023",
              medicalRecordAttached: ["23523452435", "23523453232"],
              status: "Pending",
            },
          ],
        },
      ];
      setData(patientDummyData[0].medicalRecords);
      console.log(patientDummyData[0].medicalRecords);
    };
    getLabData();
    // console.log(data);
  }, [id]);

  return (
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
                <div key={index} className="mx-5" >
                  <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200 mt-8">
                          <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                Lab ID
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
                                {record.createdAt}
                              </td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                Lab Tests
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <ul className="list-disc list-inside">
                                  {record.labTests.map((lab, index) => (
                                    <li
                                      key={index}
                                      className={"text-gray-600 text-gray-600"}
                                    >
                                      {`${lab.name}`}
                                    </li>
                                  ))}
                                </ul>
                              </td>
                            </tr>
                            {
                              record.labTests.map((labTest, index) => (
                                <tr key={index}>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {labTest.name}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    Report data
                                  </td>
                                </tr>
                              ))
                            }
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
  );
}

export default LabData;
