import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../common/loader";
import authService from "../../services/authService";

function Login() {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [org, setOrg] = useState("patient");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoader(true);
    setError("");

    try {
      const res = await authService.login(username, password, org);

      console.log(res);
      if (res.success) {
        setLoader(false);
        navigate("/dashboard");
      } else {
        setError("Something went wrong!");
      }
    } catch (error) {
      setLoader(false);
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong!");
      }
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
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
              </div>

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
                  <option value={"patient"}>Patient</option>
                  <option value={"doctor"}>Doctor</option>
                  <option value={"lab"}>Lab</option>
                  <option value={"pharmacy"}>Pharmacy</option>
                  <option value={"insurance"}>Insurance</option>
                  <option value={"Admin"}>Admin</option>

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
