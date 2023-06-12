import { useState } from "react";
import Loader from "../../common/loader";
import contactService from "../../services/contactService";

function ContactUs() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loader, setLoader] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [msgChecked, setMsgChecked] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    setError("");
    setSuccess("");
    if (name === "" || email === "" || phone === "" || message === "") {
      setError("Please fill all the fields");
    } else {
      const data = {
        name,
        email,
        number:phone,
        message,
        sendcopy: msgChecked
      }
      
      try {
        const res = await contactService.postContactUs(data);
        
        if(res.data.success === true){
          setSuccess("Message sent successfully!");
          setName("");
          setEmail("");
          setPhone("");
          setMessage("");
          setMsgChecked(false);
          setLoader(false);
        }
        else{
          setError("Message not sent!");
          setLoader(false);
        }
        
      } catch (error) {
          setError("Something went wrong!");
          setLoader(false);
      }
    }
  };

  return (
    <>
      <div className="container my-24 px-6 mx-auto">
        {/* <!-- Section: Design Block --> */}
        <section className="text-center">
          <div className="max-w-[700px] mx-auto px-3 lg:px-6">
            <h2 className="text-3xl font-bold mb-5 md:mb-8">Contact us</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="form-group mb-6">
                <input
                  type="text"
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-indigo-600 focus:outline-none"
                  id="exampleInput7"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group mb-6">
                <input
                  type="email"
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-indigo-600 focus:outline-none"
                  id="email"
                  placeholder="Email address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group mb-6">
                <input
                  type="tel"
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-indigo-600 focus:outline-none"
                  id="phone number"
                  placeholder="Phone Number"
                  maxLength={10}
                  minLength={10}
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="form-group mb-6">
                <textarea
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-indigo-600 focus:outline-none"
                  id="exampleFormControlTextarea13"
                  rows="3"
                  placeholder="Message"
                  required
                  minLength={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>
              <div className="form-group form-check text-center mb-6">
                <input
                  type="checkbox"
                  className="form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-indigo-600 checked:border-indigo-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
                  value="messageCheckbox"
                  id="exampleCheck87"
                  checked={msgChecked}
                  onChange={() => setMsgChecked(!msgChecked)}
                />
                <label
                  className="form-check-label inline-block text-gray-800"
                  htmlFor="exampleCheck87"
                >
                  Send me a copy of this message
                </label>
              </div>
              <button
                type="submit"
                className="w-full px-6 py-2.5 bg-indigo-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                {loader ? <><Loader height={5} width={5} /></> :<>Send</>}
              </button>
              {error && (<div className="text-red-500 text-sm mt-2">{error}</div>)}
              {success && (<div className="text-green-500 text-sm mt-2">{success}</div>)}
            </form>
          </div>
        </section>
        {/* <!-- Section: Design Block --> */}
      </div>
    </>
  );
}

export default ContactUs;
