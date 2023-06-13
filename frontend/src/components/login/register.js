import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../common/input";
import Loader from "../../common/loader";
import registerService from "../../services/registerService";
function Register() {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [username, setUsername] = useState("");
  const [org, setOrg] = useState("farmer");
  const [secret, setSecret] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoader(true);
    setError("");
    setSuccess("");

    try {
      const res = await registerService.register({
        orgName: org,
        username
      });

      setLoader(false);

      if (res.data.success === true) {
        setSuccess(
          "User registered successfully."
        );
        console.log("before export")
        setUsername("")
        setSecret(res.data.secret);
        exportKey(res.data.privateKey);
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

  const exportKey = (key) => {
    console.log("exporting key...", key);
    const element = document.createElement("a");
    const file = new Blob([key], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${username}.txt`;
    document.body.appendChild(element);
    element.click();
    return document.body.removeChild(element);
  }

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

              <div className="mt-6">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Organization
                </label>
                <div className="relative">
                  <select
                    id="dropdown"
                    name="dropdown"
                    className=" pl-3 w-full py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-600 focus:border-primary-600 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    defaultValue="Select"
                    value={org}
                    onChange={(e) => setOrg(e.target.value)}
                  >
                    <option value={"farmer"}>Farmer</option>
                    <option value={"wholesaler"}>Wholesaler</option>
                    <option value={"retailer"}>Retailer</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
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
              <Input
                label="Username"
                type="text"
                id="username"
                required
                value={username}
                onChange={setUsername}
              />

              {error ? (
                <div className="text-red-500 text-sm text-center  ">
                  {error}
                </div>
              ) : null}
              {success ? (
                <div>
                  <div className="text-green-500 text-sm text-center  ">
                    {success}
                  </div>
                  <div>
                    <div className="text-gray-50 text-md mt-3">
                      Secret: {secret}
                    </div>
                  </div>
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
export default Register;
