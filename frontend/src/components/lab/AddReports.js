import React, { useState } from "react";
import Input from "../../common/input";
import Loader from "../../common/loader";
import paitientService from "../../services/patientService";

function AddReports() {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const [patientId, setPatientId] = useState("");
  const [recordId, setRecordId] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [labTests, setLabTests] = useState([]);
  const [diagnosis, setDiagnosis] = useState("");
  const [labBill, setLabBill] = useState([]);

  const [inputFields, setInputFields] = useState([]);
  const [inputLabFields, setInputLabFields] = useState([]);

  const handleMedicineButtonClick = () => {
    setInputFields([...inputFields, ""]);
    console.log("medicines: ", medicines);
    let newMedicineData = {
      name: "",
      dose: "",
      dispensed: "",
      comment: "",
    };
    console.log("inputFields: ", inputFields);
    medicines.push(newMedicineData);
    setMedicines(medicines);
    console.log("medicines: ", medicines);
  };

  const handleLabButtonClick = () => {
    setInputLabFields([...inputLabFields, ""]);
    console.log("lab tests: ", labTests);

    let newLabTestData = {
      name: "",
      labReport: {
        report: "",
        dateOfReport: "",
      },
    };
    console.log("inputlabfields: ", inputLabFields);
    labTests.push(newLabTestData);
    setMedicines(labTests);
    console.log("labtests: ", labTests);
  };

  const handleMedicineNameChange = (index, name) => {
    const updatedMedicines = [...medicines];
    updatedMedicines[index] = {
      ...updatedMedicines[index],
      name: name,
    };
    setMedicines(updatedMedicines);
    console.log("medicines: ", medicines[index]);
  };

  const handleLabReportChange = (index, report) => {
    const updatedMedicines = [...medicines];
    updatedMedicines[index] = {
      ...updatedMedicines[index],
      labReport: { report: report, dateOfReport: new Date() },
    };
    setMedicines(updatedMedicines);
    console.log("dose: ", medicines[index]);
  };

  const handleInputChange = (index, value) => {
    const newInputFields = [...inputFields];
    newInputFields[index] = value;
    setInputFields(newInputFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoader(true);
    setError("");
    setSuccess("");

    console.log("medicines: ", medicines);
    console.log("lab tests: ", labTests);
    console.log("patientId: ", patientId);
    console.log("diagnosis: ", diagnosis);

    // const args = [
    //     diagnosis, medicines, labTests, patientId
    // ]

    const postData = {
      recordId: recordId,
      patientId: patientId,
      labReport: medicines,
      labBill: labBill,
      username: "lab1",
    };

    try {
      const res = await paitientService.postLabReport(postData);
      if(res.data.success){
            setSuccess("Report added successfully!");
            setLoader(false);
            setError("");
          console.log("response data");
          console.log(res.data);
          return;
      }
    } catch (error) {
        console.log("error");
    }

    // console.log("username: ", username);

    // setLoader(true);
    // setError("");
    // setSuccess("");

    // try {
    //     const res = await registerService.register({ username, orgName: "patient", password });
    //     // setLoader(false);

    //     if (res.data.success === true) {
    //         await handleLedgerRegistration(res.data.userId);
    //         return;
    //     }
    //     else {
    //         setError("Something went wrong!");
    //         return;
    //     }
    // } catch (error) {
    //     setLoader(false);

    //     if (error.response) {
    //         setError(error.response.data.message);
    //     } else {
    //         setError("Something went wrong!");
    //     }
    //     return;
    // }
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 min-h-[93vh] py-10">
        <div className="flex flex-col items-center justify-center px-6 mx-auto lg:py-0">
          <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h2 className="mb-1 text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Add Patient Report
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
                id="recordid"
                required
                value={recordId}
                onChange={setRecordId}
              />

              <div
                className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-2 rounded"
                onClick={handleLabButtonClick}
              >
                Add Lab Test +
              </div>
              {inputLabFields.map((value, index) => (
                <div key={index} className="mb-4">
                  <div className="mt-3">
                    <label
                      htmlFor={"labTest"}
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {"Test Name"}
                    </label>
                    <input
                      type={"text"}
                      name={"labTest"}
                      id={"labTest"}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                      placeholder={"Test Name"}
                      required
                      value={medicines[index].name}
                      onChange={(e) =>
                        handleMedicineNameChange(index, e.target.value)
                      }
                    />
                    <br></br>
                    <input
                      type={"text"}
                      name={"report"}
                      id={"report"}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                      placeholder={"Report Status"}
                      required
                      value={medicines[index].labReport.report}
                      onChange={(e) =>
                        handleLabReportChange(index, e.target.value)
                      }
                    />
                  </div>

                  {/* <Input
                                        label="Lab Test"
                                        type="text"
                                        id="labtest"
                                        required
                                        value={confirmPassword}
                                        onChange={setConfirmPassword}
                                    /> */}

                  <br></br>
                  <hr></hr>
                </div>
              ))}

              <Input
                label="Total Bill"
                type="number"
                id="medicineBill"
                required
                value={labBill}
                onChange={setLabBill}
              />

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
export default AddReports;
