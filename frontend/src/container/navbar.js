import { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import authService from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/common/logo.png";
import defaultProfile from "../assets/images/common/defaultProfile.jpg";

const navigation = [
  { name: "Dashboard", href: "/dashboard", current: true },
  { name: "Canteen", href: "/canteen", current: false },
  { name: "Buy/Sell", href: "/buyAndSell", current: false },
  { name: "Auto Sharing", href: "/autoShare", current: false },
];

const userNavigation = [
  { name: "Your Profile", href: "/profile" },
  { name: "Sign out", href: "/logout" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [navbarDropdown, setNavbarDropdown] = useState(false);
  
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <Link to={"/"}>
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <img
                            className="h-10 w-10"
                            src={logo}
                            alt="Your Company"
                          />
                        </div>
                        <div className="text-white ml-5 font-semibold text-lg">
                           Supply Chain Management
                        </div>
                      </div>
                    </Link>

                    {authService.getCurrentUser() &&
                      authService.getRole() === "user" && (
                        <>
                          <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                              {navigation.map((item) => (
                                <Link
                                  key={item.name}
                                  to={item.href}
                                  className={classNames(
                                    "/" + window.location.pathname.split('/')[1] === item.href
                                      ? "bg-gray-900 text-white"
                                      : "text-gray-100 hover:bg-gray-700 hover:text-white",
                                    "px-3 py-2 rounded-md text-sm font-medium"
                                  )}
                                  aria-current={
                                    item.current ? "page" : undefined
                                  }
                                >
                                  {item.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      {/* Profile dropdown */}

                      {authService.getCurrentUser() && (
                        <>
                          <Menu as="div" className="relative ml-3">
                            <div>
                              <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                <span className="sr-only">Open user menu</span>
                                <img
                                  className="h-8 w-8 rounded-full"
                                  src={localStorage.getItem("profileImage") || defaultProfile}
                                  alt=""
                                />
                              </Menu.Button>
                            </div>
                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                {userNavigation.map((item) => (
                                  <Menu.Item key={item.name}>
                                    {({ active }) => (
                                      <Link
                                        to={item.href}
                                        className={classNames(
                                          active ? "bg-gray-300" : "",
                                          "block px-4 py-2 text-sm text-gray-700"
                                        )
                                      }
                                      >
                                        {item.name}
                                      </Link>
                                    )}
                                  </Menu.Item>
                                ))}
                              </Menu.Items>
                            </Transition>
                          </Menu>
                        </>
                      )}

                      {!authService.getCurrentUser() && (
                        <>
                          <button
                            className="bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 px-5 rounded-full"
                            onClick={() => navigate("/login")}
                          >
                            Login
                          </button>
                          <button
                            className="bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 px-5 rounded-full ml-4"
                            onClick={() => navigate("/register")}
                          >
                            Register
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                    
                    
                    
                    
                    {/* Mobile menu button */}

                  <div onClick={() => setNavbarDropdown(!navbarDropdown)} className="-mr-2 flex md:hidden">
                    <div className="inline-flex cursor-pointer items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open main menu</span>
                      <svg
                        className="w-6 h-6"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {navbarDropdown && <div className="md:hidden">
                <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setNavbarDropdown(!navbarDropdown)}
                      className={classNames(
                        "/" + window.location.pathname.split('/')[1] === item.href
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block px-3 py-2 rounded-md text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                {authService.getCurrentUser() ? (
                  <>
                    <div className="border-t border-gray-700 pb-3">
                      <div className="mt-3 space-y-1 px-2">
                        {userNavigation.map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="border-t border-gray-700 pt-4 pb-3">
                      <div className="mt-3 space-y-1 px-2">
                        <Disclosure.Button
                          key={"login"}
                          as="a"
                          onClick={() => {navigate("/login"); setNavbarDropdown(false);}}
                          className="block rounded-md px-3 py-2 text-base font-medium text-white bg-gray-800 hover:bg-gray-700 hover:text-white cursor-pointer"
                        >
                          Login
                        </Disclosure.Button>
                        <Disclosure.Button
                          key={"register"}
                          as="a"
                          onClick={() => {navigate("/register"); setNavbarDropdown(false);}}
                          className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700 hover:text-white cursor-pointer"
                        >
                          Register
                        </Disclosure.Button>
                      </div>
                    </div>
                  </>
                )}
              </div>}
            </>
          )}
        </Disclosure>
      </div>
    </>
  );
}
