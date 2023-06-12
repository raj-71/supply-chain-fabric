import { Link } from "react-router-dom";
import authService from "../../services/authService";
import bgImage from "../../assets/images/landingPage/bgLandingPage.jpeg";

function LandingPage() {
  return (
    <>
      <div
        className="relative overflow-hidden bg-no-repeat bg-cover"
        style={{
          backgroundPosition: "50%",
          backgroundImage: `url(${bgImage})`,
          height: "350px",
        }}
      >
        <div
          className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}
        >
          <div className="flex justify-center items-center h-full">
            <div className="text-center text-white px-6 md:px-12">
              <h1 className="text-4xl font-bold mt-0 mb-10">Campus Suvidha</h1>
              <h3 className="text-4xl font-bold mb-8">
                "आपकी सेवा हमारा कर्तव्य"
              </h3>
              {authService.getRole() === "user" ? (
                <>
                  {authService.getCurrentUser() ? (
                    <>
                      <Link to="/dashboard">
                        <div className="inline-block px-6 py-2.5 bg-gray-500 border-2 border-white text-white font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-80 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
                          Dashboard
                        </div>
                      </Link>
                    </>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <>
                  {/* <div className="inline-block cursor-pointer px-6 py-2.5 bg-gray-500 border-2 border-white text-white font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-80 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
                    Login / Register
                  </div> */}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
