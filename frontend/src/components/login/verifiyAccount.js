import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Loader from "../../common/loader";
import registerService from "../../services/registerService";

function VerifyAccount() {
  const [sendOtpLoader, setSendOtpLoader] = useState(false);
  const [submitLoader, setSubmitLoader] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [resendOtp, setResendOtp] = useState(false);
  const [seconds, setSeconds] = useState(30);

  const navigate = useNavigate();
  const location = useLocation();

  const ResendOtp = () => {

    useEffect(() => {
      const interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
  
        if (seconds === 0) {
          clearInterval(interval);
          setResendOtp(true);
        }
      }, 1000);
  
      return () => {
        clearInterval(interval);
      };
    }, [seconds]);

    return (
      <>
        <div>
          <div className="text-white flex justify-center" >
            {resendOtp ?
            <button onClick={() => sendOtp()} className="">
              <small>Resend Otp</small>
            </button>
            :
            <small>Resend Otp in {seconds} secs...</small>
            }
          </div>
        </div>
      </>
    );
  };

  const sendOtp = async () => {
    setSendOtpLoader(true);
    setResendOtp(false);
    setSeconds(30);
    setError(""); 
    setOtp("");
    try {
      const res = await registerService.resendOtp();
      console.log(res);
      if (res.status) {
        setSendOtpLoader(false);
      }
    } catch (err) {
      setSendOtpLoader(false);
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong");
      }
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoader(true);

    setSuccess("");
    setError("");

    const data = {
      otp: e.target.otp.value,
    };

    if (data.otp.length < 6) {
      setSubmitLoader(false);
      setError("Invalid OTP!");
      return;
    }

    try {
      const res = await registerService.verifyOtp(data);
      console.log(res);
      if (res.data.success === false) {
        setSubmitLoader(false);
        setError(res.data.message);
      } else if (res.status === 200) {
        setSubmitLoader(false);
        setSuccess(res.data.message);
        setTimeout(() => {
          navigate("/update-profile");
        }, 1000);
      }
    } catch (error) {
      setSubmitLoader(false);
      setError("Something went wrong");
    }
  };



  useEffect(() => {
    if (location?.state?.previousUrl !== "/register") {
      sendOtp();
    }
  }, []);

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 h-[93vh]">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
          {/* <a
              href="/#"
              className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
            >
              <img
                className="w-8 h-8 mr-2"
                src={logo}
                alt="logo"
              />
              Campus Suvidha
            </a> */}
          <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <div className="w-8 h-8 mr-2" />
          </div>
          <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h2 className="mb-1 text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Verify Account
            </h2>
            <p className="text-sm mt-5 text-center font-semibold text-gray-300 dark:text-gray-400">
              {sendOtpLoader ? (
                <Loader height={5} width={5} />
              ) : (
                "Enter the OTP sent to your email! Check SPAM folder also!"
              )}
            </p>
            <form
              className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
              onSubmit={(e) => handleOtpSubmit(e)}
            >
              <div>
                <label
                 htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Enter OTP
                </label>
                <input
                  type="password"
                  name="otp"
                  id="otp"
                  placeholder="••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-600 dark:focus:border-indigo-600"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              {/* <div>
                <div className="text-white">
                  <small>Resend Otp in {seconds}...</small>
                </div>
              </div> */}
              {success && (
                <>
                  <p className="text-center text-sm text-green-500 my-5">
                    {success}
                  </p>
                </>
              )}
              {error && (
                <>
                  <p className="text-center text-sm text-red-500 my-5">
                    {error}
                  </p>
                </>
              )}
              <button
                type="submit"
                className="w-full text-white bg-indigo-600 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                {submitLoader ? <Loader height={5} width={5} /> : "Submit"}
              </button>
                <ResendOtp/>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default VerifyAccount;
