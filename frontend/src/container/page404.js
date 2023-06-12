import { Link } from "react-router-dom";

function Page404() {
    return (
    <>
    <main className="h-screen overflow-y-clip w-full flex flex-col justify-center items-center bg-[#1A2238]">
	    <h1 className="text-9xl font-extrabold text-white tracking-widest">404</h1>
	<div className="bg-indigo-600 px-2 text-sm rounded rotate-12 absolute">
		Page Not Found
	</div>
	<button className="mt-5">
      <Link
        to="/"
        className="relative inline-block text-sm font-medium text-indigo-600 group active:text-indigo-600 focus:outline-none focus:ring"
      >
        <span
          className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-indigo-600 group-hover:translate-y-0 group-hover:translate-x-0"
        ></span>

        <span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
          Go Home
        </span>
      </Link>
    </button>
    </main>
    </>);
  }
  
  export default Page404;
  