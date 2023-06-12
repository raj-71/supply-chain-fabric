import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../common/input";
import Loader from "../../common/loader";
import authService from "../../services/authService";

function Login() {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [username, setUsername] = useState("");
  const [secret, setSecret] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [org, setOrg] = useState("farmer");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoader(true);
    setError("");

    try {
      const res = await authService.login({username, orgName: org, secret, privateKey});
      // console.log(res);
      if (res) {
        setLoader(false);
        navigate("/dashboard");
      } else {
        setError("Something went wrong!");
      }
    } catch (error) {
      setLoader(false);
      setError("Something went wrong!");
    }
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 min-h-[93vh]">
        <div className="flex flex-col items-center justify-center px-6 py-8 my-auto">
          <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h2 className="mb-1 text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign In
            </h2>
            <form
              className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
              onSubmit={(e) => handleSubmit(e)}
            >
              <Input
                label="Username"
                type="text"
                id="username"
                required
                value={username}
                onChange={setUsername}
              />

              <Input
                label="Secret"
                type="password"
                id="secret"
                required
                value={secret}
                onChange={setSecret}
              />
              
              <Input
                label="Private Key"
                type="text"
                id="privateKey"
                required
                value={privateKey}
                onChange={setPrivateKey}
              />

              <div className="relative">
                <label
                  htmlFor="dropdown"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Login For
                </label>
                <select
                  id="dropdown"
                  name="dropdown"
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-600 focus:border-primary-600 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  defaultValue="Select"
                  value={org}
                  onChange={(e) => setOrg(e.target.value)}
                >
                  <option value={"farmer"}>Farmer</option>
                  <option value={"wholesaler"}>Wholesaler</option>
                  <option value={"retailer"}>Retailer</option>

                </select>
                <div className="absolute inset-y-0 right-0 top-5 flex items-center pr-2 pointer-events-none">
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
              {error && (
                <>
                  <div className="text-center text-red-500">{error}</div>
                </>
              )}
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white  hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {loader ? <Loader height={5} width={5} /> : "Sign In"}
              </button>

              <Link
                to="/register"
                className="flex flex-wrap mt-3 justify-center cursor-pointer font-semibold"
              >
                <div className="text-center text-lg text-gray-900 dark:text-white">
                  <small>Create new account</small>
                </div>
              </Link>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
export default Login;
