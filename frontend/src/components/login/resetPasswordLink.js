import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../common/loader";
import passwordService from "../../services/passwordService";

function ResetPasswordLink() {
  const [loader, setLoader] = useState(false);
  const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const token = window.location.pathname.split("/")[3];

  const navigate = useNavigate();
  
  const resetPassword = async (e) => {
    e.preventDefault();
    setLoader(true);
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
        setLoader(false);
        setError("Passwords do not match");
        return;
    }

    try {
      const res = await passwordService.resetPassword(password, token);
      console.log(res);
      setLoader(false);
      if(res.status === 200){
          setSuccess("Password reset successfully");
          setTimeout(() => {
            navigate('/login');
          }, 1000);
          setPassword("");
          setConfirmPassword("");
      }
    } catch (err) {
        setLoader(false);
        if(err.response.status === 498){
            setError("Invalid token");
        }
        else{
            setError("Error in sending password reset link");
        }
    }
  };

  return (
    <>
      <>
        <section className="bg-gray-50 dark:bg-gray-900 h-[93vh]">
          <div className="flex flex-col items-center justify-center px-6 py-8 my-auto">
          <div
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <div className="w-8 h-8 mr-2" />
          </div>
            <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
              <h2 className="mb-1 text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Reset Password
              </h2>
              <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={(e) => resetPassword(e)}>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm password
                  </label>
                  <input
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                {error && (
                  <>
                    <div className="text-center text-red-500">{error}</div>
                  </>
                )}
                {success && (
                  <>
                    <div className="text-center text-green-500">{success}</div>
                  </>
                )}
                <button
                  type="submit"
                  className="w-full text-white bg-indigo-600 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  disabled={loader}
                >
                    {loader ? <Loader height={5} width={5} /> : "Reset Password" }
                </button>
              </form>
            </div>
          </div>
        </section>
      </>
    </>
  );
}

export default ResetPasswordLink;
