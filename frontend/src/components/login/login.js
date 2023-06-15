import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormButton from "../../common/formButton";
import Input from "../../common/input";
import Loader from "../../common/loader";
import Select from "../../common/select";
import authService from "../../services/authService";

function Login() {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [username, setUsername] = useState("");
  const [secret, setSecret] = useState("");
  const [org, setOrg] = useState("farmer");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoader(true);
    setError("");

    try {
      const res = await authService.login({username, orgName: org, secret});
      setLoader(false);
      // console.log(res);
      if (res.data.success) {
        navigate("/dashboard");
      } else {
        setError(res.data.error.message);
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

              <Select
                label="Login As"
                value={org}
                onChange={setOrg}
                options={["farmer", "wholesaler", "retailer"]}
              />

              {error && (
                <>
                  <div className="text-center text-red-500">{error}</div>
                </>
              )}

              <FormButton name="Sign In" loader={loader} />

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
