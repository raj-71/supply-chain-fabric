import { Link } from "react-router-dom";

export default function Title() {
  return (
    <>
      <div className="flex flex-1 items-center justify-left sm:items-stretch sm:justify-start">
        <div className="flex flex-shrink-0 items-center">
          <img
            className="h-8 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
            alt="Your Company"
          />
        </div>
        <div className="sm:ml-6 sm:block">
          <div className="flex space-x-4">
            <Link
              to="/"
              className="text-white px-3 py-2 rounded-md text-xl font-medium"
              aria-current="page"
            >
              Suvidha
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
