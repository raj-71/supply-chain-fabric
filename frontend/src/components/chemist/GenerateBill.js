import React, { useState } from "react";
import Input from "../../common/input";
import Loader from "../../common/loader";
import paitientService from "../../services/patientService";

function GenerateBill() {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const [patientId, setPatientId] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [medicineBill, setMedicineBill] = useState([]);
  const [recordId, setRecordId] = useState("");
  //   const [labTests, setLabTests] = useState([]);
  //   const [dispensed, setDispensed] = useState([]);
  //   const [comment, setComment] = useState([]);

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

  const handleMedicineNameChange = (index, name) => {
    const updatedMedicines = [...medicines];
    updatedMedicines[index] = {
      ...updatedMedicines[index],
      name: name,
    };
    setMedicines(updatedMedicines);
    console.log("medicines: ", medicines[index]);
  };

  const handleDoseNameChange = (index, dose) => {
    const updatedMedicines = [...medicines];
    updatedMedicines[index] = {
      ...updatedMedicines[index],
      dose: dose,
    };
    setMedicines(updatedMedicines);
    console.log("dose: ", medicines[index]);
  };

  const handleDispensedChange = (index, dispensed) => {
    const updatedMedicines = [...medicines];
    updatedMedicines[index] = {
      ...updatedMedicines[index],
      dispensed: dispensed,
    };
    setMedicines(updatedMedicines);
    console.log("dispensed: ", medicines[index]);
  };

  const handleCommentChange = (index, comment) => {
    const updatedMedicines = [...medicines];
    updatedMedicines[index] = {
      ...updatedMedicines[index],
      comment: comment,
    };
    setMedicines(updatedMedicines);
    console.log("comment: ", medicines[index]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoader(true);
    setError("");
    setSuccess("");

    console.log("medicines: ", medicines);
    console.log("medicine Bill: ", medicineBill);
    console.log("patientId: ", patientId);
    console.log("recordId: ", recordId);
    console.log(": ");

    // const args = [diagnosis, medicines, labTests, patientId];

    const postData = {
        recordId: recordId,
        patientId: patientId,
        medicines: medicines,
        medicineBill: medicineBill,
        username: "pharmacy1"
    };

    try {
        const res = await paitientService.postMedicinePharmacy(postData);
        if (res.data.success) {
            setSuccess("Data uploaded successfully");
            setError("");
            setLoader(false);
            console.log("response data");
            console.log(res.data);
        } else {
            setError("Error uploading data");
            setSuccess("");
            setLoader(false);
        }
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 min-h-[93vh] py-10">
        <div className="flex flex-col items-center justify-center px-6 mx-auto lg:py-0">
          <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h2 className="mb-1 text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Add Patient Record
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

              <div
                className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-2 rounded"
                onClick={handleMedicineButtonClick}
              >
                Add Medicines +
              </div>
              {inputFields.map((value, index) => (
                <div key={index} className="mb-4">
                  <div className="mt-3">
                    <label
                      htmlFor={"medicine"}
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {"Medicine"}
                    </label>
                    <input
                      type={"text"}
                      name={"name"}
                      id={"name"}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                      placeholder={"Name"}
                      required
                      value={medicines[index].name}
                      onChange={(e) =>
                        handleMedicineNameChange(index, e.target.value)
                      }
                    />
                  </div>
                  <div className="mt-3">
                    <label
                      htmlFor={"dose"}
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {"Dose"}
                    </label>
                    <input
                      type={"text"}
                      name={"dose"}
                      id={"dose"}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                      placeholder={"Dose"}
                      required
                      value={medicines[index].dose}
                      onChange={(e) =>
                        handleDoseNameChange(index, e.target.value)
                      }
                    />

                    <div class="mt-6">
                      <label
                        for="dispensed"
                        class="block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Dispensed
                      </label>
                      <div class="mt-2 relative">
                        <select
                          id="dispensed"
                          name="dispensed"
                          className="block appearance-none w-full py-2 px-3 border text-gray-300 border-gray-500 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          value={medicines[index].dispensed}
                          onChange={(e) =>
                            handleDispensedChange(index, e.target.value)
                          }
                        >
                          <option value="True" class="bg-gray-800 text-white">
                            True
                          </option>
                          <option value="False" class="bg-gray-800 text-white">
                            False
                          </option>
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                          <svg
                            class="h-4 w-4 fill-current"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M14.95 7.95a1 1 0 01-1.414 0L10 4.414l-3.536 3.536a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <br></br>
                    <input
                      type={"text"}
                      name={"comment"}
                      id={"comment"}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                      placeholder={"Comment"}
                      value={medicines[index].comment}
                      onChange={(e) =>
                        handleCommentChange(index, e.target.value)
                      }
                      required
                    />
                  </div>
                  <br></br>
                  <hr></hr>
                </div>
              ))}

              <Input
                label="Total Bill"
                type="number"
                id="medicineBill"
                required
                value={medicineBill}
                onChange={setMedicineBill}
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
export default GenerateBill;
