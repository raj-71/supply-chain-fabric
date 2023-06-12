import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../common/input";
import Loader from "../../common/loader";
import registerService from "../../services/registerService";

function RegisterByAdmin() {
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [name, setName] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("Male");
    const [aadhaarNumber, setAadhaarNumber] = useState("");
    const [contact, setContact] = useState("");
    const [department, setDepartment] = useState("");
    const [degree, setDegree] = useState("");
    const [org, setOrg] = useState("doctor");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [userAgreement, setUserAgreement] = useState(false);
    const [address, setAddress] = useState("");
    const [city,setCity] = useState("")
    const [specification,setSpecification] = useState("")


    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoader(true);
        setError("");
        setSuccess("");

      

        try {

            var res

            if(org === "doctor"){
                const args=[name,dob,gender,aadhaarNumber,contact,department,degree,specification];
                const fcn="registerDoctor";
                res = await registerService.register({args,username:name,orgName:org,password,fcn}); 
            }
            else if(org === "lab"){
                const args=[name,contact,city,address];
                const fcn="registerLab";
                res = await registerService.register({ args,username:name,orgName:org,password,fcn }); 


            }
            else if(org === "pharmacy"){
                const args=[name,contact,city,address]
                const fcn="registerPharmacy"
                res = await registerService.register({ args,username:name,orgName:org,password,fcn }); 

            }
            else if(org === "insurance"){
                const args=[name,contact,city,address]
                const fcn="registerInsurance"
                res = await registerService.register({ args,username:name,orgName:org,password,fcn}); 

            }
            
            
            
            
            
            setLoader(false);

            if (res.data.success === true) {
                setSuccess(
                    "User registered successfully."
                );

                setAadhaarNumber("")
                setAddress("")
                setCity("")
                setContact("")
                setDegree("")
                setName("")
                setPassword("")
                setGender("")
                setDepartment("")
                setSpecification("")
                setDob("")
               
                return;
            }
        } catch (error) {
            setLoader(false);

            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError("Something went wrong!");
            }
            return;
        }
    };

    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900 min-h-[93vh] py-10">
                <div className="flex flex-col items-center justify-center px-6 mx-auto lg:py-0">

                    <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                        <h2 className="mb-1 text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Register
                        </h2>
                        <form
                            className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
                            onSubmit={(e) => handleSubmit(e)}
                        >
                            <div class="mt-6">
                                {/* Dropdown input box, center aligned*/}
                                <div className="relative">
                                    <select
                                        id="dropdown"
                                        name="dropdown"
                                        className="block w-1/2 m-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-600 focus:border-primary-600 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        defaultValue="Select"
                                        value={org}
                                        onChange={(e) => setOrg(e.target.value)}
                                    >
                                        <option value={"doctor"}>Doctor</option>
                                        <option value={"lab"}>Lab</option>
                                        <option value={"pharmacy"}>Pharmacy</option>
                                        <option value={"insurance"}>Insurance</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-28 pointer-events-none">
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

                            {
                                org === "doctor" ?
                                    <div>
                                        <Input
                                            label="Name"
                                            type="text"
                                            id="name"
                                            required
                                            value={name}
                                            onChange={setName}
                                        />

                                        <div class="mt-3">
                                            <label for="gender" class="block text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                                            <div class="mt-2 relative">
                                                <select id="gender" value={gender} onChange={(e)=>setGender(e.target.value)} name="gender" class="block appearance-none w-full py-2 px-3 border text-gray-300 border-gray-500 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                    <option value="Male" class="bg-gray-800 text-white">Male</option>
                                                    <option value="Female" class="bg-gray-800 text-white">Female</option>
                                                    <option value="Other" class="bg-gray-800 text-white">Other</option>
                                                </select>
                                                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                                                    <svg class="h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M14.95 7.95a1 1 0 01-1.414 0L10 4.414l-3.536 3.536a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" /></svg>
                                                </div>
                                            </div>
                                        </div>

                                        <Input
                                            label="Aadhaar Number"
                                            type="text"
                                            id="aadhaar_number"
                                            required
                                            value={aadhaarNumber}
                                            onChange={setAadhaarNumber}
                                        />

                                        <Input
                                            label="Contact"
                                            type="tel"
                                            id="contact"
                                            required
                                            value={contact}
                                            onChange={setContact}
                                        />

                                        <Input
                                            label="Department"
                                            type="text"
                                            id="department"
                                            required
                                            value={department}
                                            onChange={setDepartment}
                                        />

                                        <Input
                                            label="Degree"
                                            type="text"
                                            id="degree"
                                            required
                                            value={degree}
                                            onChange={setDegree}
                                        />
                                         <Input
                                            label="Specification"
                                            type="text"
                                            id="specification"
                                            required
                                            value={specification}
                                            onChange={setSpecification}
                                        />
                                         <Input
                                            label="D.O.B"
                                            type="date"
                                            id="dob"
                                            required
                                            value={dob}
                                            onChange={setDob}
                                        />


                                        <Input
                                            label="Password"
                                            type="password"
                                            id="password"
                                            required
                                            value={password}
                                            onChange={setPassword}
                                        />
                                    </div>
                                    :
                                    <div>
                                        <Input
                                            label="Name"
                                            type="text"
                                            id="name"
                                            required
                                            value={name}
                                            onChange={setName}
                                        />

                                        <Input
                                            label="Contact"
                                            type="tel"
                                            id="contact"
                                            required
                                            value={contact}
                                            onChange={setContact}
                                        />
                                        <Input
                                            label="Password"
                                            type="password"
                                            id="password"
                                            required
                                            value={password}
                                            onChange={setPassword}
                                        />
                                        <Input
                                            label="City"
                                            type="text"
                                            id="city"
                                            required
                                            value={city}
                                            onChange={setCity}
                                        />
                                        <Input
                                            label="Address"
                                            type="Address"
                                            id="Address"
                                            required
                                            value={address}
                                            onChange={setAddress}
                                        />
                                    </div>
                            }


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
                                {loader ? <Loader height={5} width={5} /> : "Register"}
                            </button>

                            <Link
                                to="/login"
                                className="flex flex-wrap mt-3 justify-center cursor-pointer text-white"
                            >
                                <div>
                                    <small>Login</small>
                                </div>
                            </Link>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}
export default RegisterByAdmin;
