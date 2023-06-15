import React, { useState } from "react";
import { Link } from "react-router-dom";
import FormButton from "../../common/formButton";
import Input from "../../common/input";
import Loader from "../../common/loader";
import Select from "../../common/select";
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
    setSecret("");
    setError("");

    try {
      const res = await registerService.register({
        orgName: org,
        username
      });

      setLoader(false);

      if (res.data.success) {
        setSuccess(
          "User registered successfully."
        );
        setUsername("")
        setSecret(res.data.message.secret);
        exportKey(res.data.message.privateKey);
        return;
      }
      else {
        return setError(res.data.error.message);
      }
    } catch (error) {
      setLoader(false);
      setSuccess("");
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
              <Select
                label="Organization"
                value={org}
                onChange={setOrg}
                options={["farmer", "wholesaler", "retailer"]}
              />

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

              <FormButton name="Register" loader={loader} />

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
