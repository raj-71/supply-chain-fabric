import { Link } from "react-router-dom";

function UnAuthorizedPrompt(props){
  return (
    <>
      <div className="text-white -center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="container mx-auto px-4 h-full z-10">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full lg:w-4/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg bg-gray-800 border-0">
                <div className="mt-5">
                  
                </div>
                <>
                  <div className="flex-auto px-4 lg:px-10 pb-10 text-2xl pt-0">
                    <div className="text-center mb-3 font-bold">
                      <small>You are not Authourized to Access</small>
                    </div>
                    <div className="text-center text-sm font-light">
                      To use this feature you need to login first as owner
                    </div>
                    <Link to="/login">
                      <div className="whitespace-nowrap mt-3 mb-2 flex justify-center text-lg font-bold underline cursor-pointer">
                        Login
                      </div>
                    </Link>
                    <div className="text-center text-sm">or</div>
                    <Link to="/register">
                      <div className="whitespace-nowrap mt-3 flex justify-center text-lg font-bold underline cursor-pointer">
                        Register
                      </div>
                    </Link>
                  </div>
                </>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-40 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default UnAuthorizedPrompt;
