import React, { useEffect, useState } from "react";
// import { Menu } from "@headlessui/react";
import { Link } from "react-router-dom";
import Loader from "../../common/loader";
import LoginPromt from "../../container/loginPrompt";
import AutoService from "../../services/AutoServices";
import RequestCard from "./RequestCard";

function ASHome() {
  // console.log("auto share home page 0");
  const [loader, setLoader] = useState(true);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);
  const [readMore, setReadMore] = useState(false);
  const [date, setdate] = useState("");
  const [from, setfrom] = useState("")
  const [to, setto] = useState("")
  const [loginPrompt, setLoginPrompt] = useState(false);
  const limit = 12;

  // console.log("auto share home page");

  const getProducts = async () => {
    setReadMore(true);
    const res = await AutoService.getCabDetails(
      page,
      limit,
      date,
      from,
      to
    );

    console.log(res.data.data);
    res.data.data.map((item) => {
      const originalTime = item.placeinfo.time;
      console.log(originalTime);
      const dateObj = new Date();
      dateObj.setHours(originalTime.split(":")[0]);
      dateObj.setMinutes(originalTime.split(":")[1]);
      const newTime = dateObj.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
      return item.placeinfo["timeFormated"] = newTime;
    });

    setProducts((prev) => [...prev, ...res.data.data]);
    setMaxPages(res.data.totalPages);

    setLoader(false);
    setReadMore(false);
  };

  const filterProducts = async () => {
    setLoader(true);
    setProducts([]);
    const res = await AutoService.getCabDetails(
      page,
      limit,
      date,
      from,
      to

    );

      console.log(res);

    setProducts((prev) => [...res.data.data]);
    setMaxPages(res.data.totalPages);
    setLoader(false);
    setReadMore(false);
  };



  useEffect(() => {
    getProducts();
    // console.log("use effect");
  }, [page]);

  const handleLoadMore = () => {
    console.log("load more");
    setReadMore(true);
    if (page < maxPages) {
      setPage(page + 1);
    }
    setReadMore(false);
  };

  const toggleLoginPrompt = () => {
    console.log("toggle");
    setLoginPrompt(false);
  };

  const openLoginPrompt = () => {
    if (!localStorage.getItem("token")) {
      setLoginPrompt(true);
      return;
    }
  };

  return (
    <>
      <div className="">
        <div className="flex mx-3 mb-5 pt-3 text-center">
          <div className="text-2xl font-bold w-full">Auto/Cab Sharing</div>
        </div>

        <div className="text-center font-light text-md md:text-lg mx-10 my-5">
          "!! Now find ride partners on Campus Suvidha & make your rides affordable !!"
        </div>



        <div className="flex justify-center text-center text-sm pb-4 md:px-10">
          {localStorage.getItem("token") ? (
            <>
              <Link
                to="/autoShare/myRequests"
                className="bg-indigo-600 hover:bg-indigo-800 text-white font-bold px-6 py-2 rounded-full whitespace-nowrap"
              >
                My Request
              </Link>
              <Link
                to="/autoShare/addRequest"
                className="bg-indigo-600 hover:bg-indigo-800 text-white font-bold px-6 mx-5 py-2 rounded-full whitespace-nowrap"
              >
                Add Requests
              </Link>
            </>
          ) : (
            <>
              <div
                onClick={() => openLoginPrompt()}
                className="cursor-pointer bg-indigo-600 hover:bg-indigo-800 text-white font-bold px-6 mx-5 py-2 rounded-full whitespace-nowrap"
              >
                Add Request
              </div>
              <div
                onClick={() => openLoginPrompt()}
                className="cursor-pointer bg-indigo-600 hover:bg-indigo-800 text-white font-bold px-6 py-2 rounded-full whitespace-nowrap"
              >
                My Requests
              </div>
            </>
          )}
        </div>

        {loginPrompt && (
          <LoginPromt toggleLoginPrompt={() => toggleLoginPrompt()} />
        )}

        {/* <form> */}
        {/* <div className="flex mx-5 md:mx-28 md:mt-10">
          <Menu as="div" className="inline-block">
            <div>
              <Menu.Button className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-white bg-indigo-600 border border-gray-300 rounded-l-lg hover:bg-indigo-800">
                {searchCategory.length > 0 ? searchCategory : "Cateogry"}
              </Menu.Button>
            </div>

            <Menu.Items className="absolute z-10 my-2 divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-10">
              {dropdownCategoriesList.map((category, key) => (
                <div
                  key={key}
                  className={`cursor-pointer text-center px-10 hover:bg-gray-200`}
                  onClick={() => {
                    setSearchCategory(category.name);
                  }}
                >
                  <>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={` ${
                            active ? "" : "text-gray-900"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          {category.name}
                        </button>
                      )}
                    </Menu.Item>
                  </>
                </div>
              ))}
            </Menu.Items>
          </Menu>
          <div className="relative w-full mb-2">
            <input
              type="search"
              id="search-dropdown"
              className="block p-2.5 w-full z-20 text-sm placeholder-black text-black bg-gray-300 rounded-r-lg border border-gray-300 outline-0"
              placeholder="Search to buy..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              required
            />

            <button
              type="submit"
              className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-indigo-600 rounded-r-lg border border-indigo-600 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-800"
              onClick={() => filterProducts()}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>
        </div> */}
        {/* </form> */}

        <div className="flex justify-center mx-2 my-1  mb-10">
          <div className="flex flex-col md:flex-row items-center space-x-4">
            <div className="relative">
              <label htmlFor="datepicker" className="block text-gray-700 font-medium">Date:</label>
              <input
                value={date}
                onChange={(e) => setdate(e.target.value)}
                required
                type="Date"
                className="form-control cursor-pointer block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
            </div>
            <div className="relative">
              <label htmlFor="dropdown1" className="block text-gray-700 font-medium">Headed From:</label>
              <select value={from}
                onChange={(e) => setfrom(e.target.value)}
                required id="dropdown1" className="block cursor-pointer appearance-none w-full bg-white border border-gray-300 py-2 px-3 pr-8 rounded-md shadow-sm text-gray-700 leading-tight focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
                <option value="IIT Kanpur">IIT Kanpur</option>
                <option value="Rawatpur">Rawatpur</option>
                <option value="Moti Jheel">Moti Jheel</option>
                <option value="Swaroop Nagar">Swaroop Nagar</option>
                <option value="Kanpur Central">Kanpur Central</option>
                <option value="South-X-Mall">South-X-Mall</option>
                <option value="Z-Square">Z-Square</option>
                <option value="Rave-3">Rave-3</option>
                <option value="Bithor">Bithor</option>
                <option value="CHakeri Aiport">CHakeri Aiport</option>
                <option value="Lucknow Aiport">Lucknow Aiport</option>

              </select>
            </div>
            <div className="relative">
              <label htmlFor="dropdown2" className="block text-gray-700 font-medium">Headed To:</label>
              <select value={to}
                onChange={(e) => setto(e.target.value)}
                required id="dropdown2" className="block cursor-pointer appearance-none w-full bg-white border border-gray-300 py-2 px-3 pr-8 rounded-md shadow-sm text-gray-700 leading-tight focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
                <option value="IIT Kanpur">IIT Kanpur</option>
                <option value="Rawatpur">Rawatpur</option>
                <option value="Moti Jheel">Moti Jheel</option>
                <option value="Swaroop Nagar">Swaroop Nagar</option>
                <option value="Kanpur Central">Kanpur Central</option>
                <option value="South-X-Mall">South-X-Mall</option>
                <option value="Z-Square">Z-Square</option>
                <option value="Rave-3">Rave-3</option>
                <option value="Bithor">Bithor</option>
                <option value="CHakeri Aiport">CHakeri Aiport</option>
                <option value="Lucknow Aiport">Lucknow Aiport</option>

              </select>
            </div>
            <button onClick={() => filterProducts()} className="bg-indigo-600 mt-6 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">Apply</button>
          </div>

        </div>

        <div className="">
          <div>
            <div className="text-center text-2xl my-3 font-bold">
              Recent Sharing Requests
            </div>
          </div>
          <div className="mx-5">
            {loader ? (
              <Loader></Loader>
            ) : (
              <>
                {products?.length === 0 && loader === false ? (
                  <>
                    <div className="text-center w-full text-lg mt-10">
                      No Requests to list!!!
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full mb-10">
                      {products?.map((product, key) => (
                        <div key={key}>
                          <RequestCard
                            cabdata={product}

                          />
                        </div>
                      ))}
                    </div>
                  </>
                )}
                {readMore ? (
                  <div className="flex justify-center mb-10">
                    <Loader />
                  </div>
                ) : (
                  page < maxPages && (
                    <div className="flex justify-center mb-10">
                      <button
                        className="bg-indigo-600 hover:bg-indigo-800 text-white font-bold mt-10 px-6 py-2 rounded-full whitespace-nowrap"
                        onClick={() => {
                          setReadMore(true);
                          handleLoadMore();
                        }}
                      >
                        Load More
                      </button>
                    </div>
                  )
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ASHome;
