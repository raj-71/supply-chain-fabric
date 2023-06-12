import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Loader from "../../common/loader";
import paitientService from "../../services/patientService";
import Table3 from "../Table/table3";
import authService from "../../services/authService";
function PaitentsRecords(props) {
  const [loader, setLoader] = useState(true);
  const [data, setData] = useState([]);
  const [columnNames, setColumnNames] = useState([]);
  //   const [recordData, setRecordData] = useState([]);
  const [currentId, setCurrentId] = useState(484192);

  useEffect(() => {
    const getPatientRecordsAccessList = async () => {
      const res = await paitientService.getPatientAccessList();
      console.log(res.data);
      if (res.data.success) {
        setData(res.data.accessMemberDetails);
        setLoader(false);
      }
      console.log(data);
    };

    const updateColumnNames = () => {
      const keys = Object.keys(dummyRecordData[0]);
      console.log("keys: ", keys);
      setColumnNames(keys);
    };

    getPatientRecordsAccessList();
    updateColumnNames();
  }, []);

  const patientIdButtonClick = (id) => {
    console.log("patientIdButtonClick: ", id);
    setCurrentId(id);
  };

  console.log(data);
  const dummyRecordData = [
    {
      patientId: "851280",
      name: "patient1",
      gender: "Female",
      contact: "9874563210",
      dob: "1999-10-10",
      bloodGroup: "A+",
      address: "delhi",
      // aadharNumber: "98965262666",
      // orgName: "patient",
    },
  ];

  let topbutton;
  console.log(authService.getRole());
  if (authService.getRole() == "doctor") {
    topbutton = (
      <>
        <Link to="/add-patient-records">
          <button
            type="submit"
            className="mt-8 ml-60 mb-0 bg-indigo-600 text-white  hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Add Records
          </button>
        </Link>
      </>
    );
  } else if (authService.getRole() == "lab") {
    topbutton = (
      <>
        <Link to="/add-reports">
          <button
            type="submit"
            className="mt-8 ml-60 mb-0 bg-indigo-600 text-white  hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Add Report
          </button>
        </Link>
      </>
    );
  } else if (authService.getRole() == "pharmacy") {
    topbutton = (
      <>
        <Link to="/generate-bill">
          <button
            type="submit"
            className="mt-8 ml-60 mb-0 bg-indigo-600 text-white  hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Generate Bill
          </button>
        </Link>
      </>
    );
  } else if (authService.getRole() == "insurance") {
    topbutton = (
      <>
        <Link to="/latest-requests">
          <button
            type="submit"
            className="mt-8 ml-60 mb-0 bg-indigo-600 text-white  hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Claim Request
          </button>
        </Link>
      </>
    );
  }

  return (
    <>
      {loader ? (
        <div className="mt-10">
          <Loader />
        </div>
      ) : (
        <>
          {data.length == 0 ? (
            <>
              <p>No Data to Show</p>
            </>
          ) : (
            <>
              {topbutton}

              <Table3
                tableName="Patients List"
                tableData={data}
                columnNames={columnNames}
                patientIdButtonClick={patientIdButtonClick}
              />

              {authService.getRole() == "doctor" || authService.getRole() == "insurance" ? (
                <div className="flex justify-between">
                  {data.map((record, index) => {
                    console.log(record.patientId === currentId);
                    console.log(typeof record.patientId);
                    console.log(record.medicalRecords);
                    return record.patientId === currentId ? (
                      record.medicalRecords.map((rec, index) => {
                        return (
                          <>
                            <div key={index}>
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
                                            {rec.doctorId}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            Date
                                          </td>
                                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {rec.createdAt}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            Diagnosis
                                          </td>
                                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {rec.diagnosis}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            Medicines
                                          </td>
                                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <ul className="list-disc list-inside">
                                              {rec.medicines.map(
                                                (medicine, index) => (
                                                  <li
                                                    key={index}
                                                    className={
                                                      "text-gray-600 text-gray-600"
                                                    }
                                                  >
                                                    {`${medicine.name} - ${medicine.dose}`}
                                                  </li>
                                                )
                                              )}
                                            </ul>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            Lab Tests
                                          </td>
                                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <ul className="list-disc list-inside">
                                              {rec.labTests.map(
                                                (lab, index) => (
                                                  <li
                                                    key={index}
                                                    className={
                                                      "text-gray-600 text-gray-600"
                                                    }
                                                  >
                                                    {`${lab.name}`}
                                                  </li>
                                                )
                                              )}
                                            </ul>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      })
                    ) : (
                      <div></div>
                    );
                  })}
                </div>
              ) : null}

              {authService.getRole() == "pharmacy" ? (
                <div className="flex justify-between">
                  {data.map((record, index) => {
                    console.log(record.patientId === currentId);
                    console.log(typeof record.patientId);
                    console.log(record.medicalRecords);
                    return record.patientId === currentId ? (
                      record.medicalRecords.map((rec, index) => {
                        return (
                          <>
                            <div key={index}>
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
                                            {rec.doctorId}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            Date
                                          </td>
                                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {rec.createdAt}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            Medicines
                                          </td>
                                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <ul className="list-disc list-inside">
                                              {rec.medicines.map(
                                                (medicine, index) => (
                                                  <li
                                                    key={index}
                                                    className={
                                                      "text-gray-600 text-gray-600"
                                                    }
                                                  >
                                                    {`${medicine.name} - ${medicine.dose}`}
                                                  </li>
                                                )
                                              )}
                                            </ul>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      })
                    ) : (
                      <div></div>
                    );
                  })}
                </div>
              ) : null}

              {authService.getRole() == "lab" ? (
                <div className="flex justify-between">
                  {data.map((record, index) => {
                    console.log(record.patientId === currentId);
                    console.log(typeof record.patientId);
                    console.log(record.medicalRecords);
                    return record.patientId === currentId ? (
                      record.medicalRecords.map((rec, index) => {
                        return (
                          <>
                            <div key={index}>
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
                                            {rec.doctorId}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            Date
                                          </td>
                                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {rec.createdAt}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            Lab Tests
                                          </td>
                                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <ul className="list-disc list-inside">
                                              {rec.labTests.map(
                                                (lab, index) => (
                                                  <li
                                                    key={index}
                                                    className={
                                                      "text-gray-600 text-gray-600"
                                                    }
                                                  >
                                                    {`${lab.name}`}
                                                  </li>
                                                )
                                              )}
                                            </ul>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      })
                    ) : (
                      <div></div>
                    );
                  })}
                </div>
              ) : null}
            </>
          )}
        </>
      )}
    </>
  );
}

export default PaitentsRecords;
