import React, { useEffect, useState } from "react";
import { Menu } from "@headlessui/react";
import ProductCard from "./productCard";
import buyAndSellService from "../../services/buyAndSellService";
import { Link } from "react-router-dom";
import Loader from "../../common/loader";
// import LoginPromt from "../../container/loginPrompt";
import LoginPrompt from "../../container/loginPrompt";

function BASHome() {
  const [loader, setLoader] = useState(true);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);
  const [readMore, setReadMore] = useState(false);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [searchSortBy, setSearchSortBy] = useState("");
  const [searchSortByFilter, setSearchSortByFilter] = useState("");
  const [searchSortByOrder, setSearchSortByOrder] = useState("");
  const [loginPrompt, setLoginPrompt] = useState(false);
  const limit = 12;

  const list = [
    { name: "Price: Low to High", filter: "iteminfo.price", order: "asc" },
    { name: "Price: High to Low", filter: "iteminfo.price", order: "" },
    { name: "Post: New to Old ", filter: "", order: "asc" },
    { name: "Post: Old to New", filter: "", order: "" },
  ];

  console.log("bashome");

  const dropdownCategoriesList = [
    { name: "Electronics" },
    { name: "Furniture" },
    { name: "Vehicles" },
    { name: "Books" },
    { name: "Sports" },
    { name: "Others" },
  ];

  const getProducts = async () => {
    setReadMore(true);
    const res = await buyAndSellService.getProducts(
      page,
      limit,
      searchCategory,
      searchSortByFilter,
      searchSortByOrder
    );

    setProducts((prev) => [...prev, ...res.data.data]);
    setMaxPages(res.data.totalPages);
    setLoader(false);
    setReadMore(false);
  };

  const filterProducts = async () => {
    setLoader(true);
    setProducts([]);
    const res = await buyAndSellService.getProducts(
      page,
      limit,
      searchCategory,
      searchSortByFilter,
      searchSortByOrder
    );

    setProducts((prev) => [...res.data.data]);
    setMaxPages(res.data.totalPages);
    setLoader(false);
    setReadMore(false);
  };

  useEffect(() => {
    getProducts();
  }, [page]);

  const handleLoadMore = () => {
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
          <div className="text-2xl font-bold w-full">Buy and Sell</div>
        </div>

        <div className="text-center font-light text-md md:text-lg mx-10 my-5">
          "Shop smarter on campus with Suvidha - where buying and selling is
          made easy!"
        </div>

        <div className="flex justify-center text-center text-sm pb-4 md:px-10">
          {localStorage.getItem("token") ? (
            <>
              <Link
                to="/buyAndSell/myPosts"
                className="bg-indigo-600 hover:bg-indigo-800 text-white font-bold px-6 py-2 rounded-full whitespace-nowrap"
              >
                My Posts
              </Link>
              <Link
                to="/buyAndSell/addPost"
                className="bg-indigo-600 hover:bg-indigo-800 text-white font-bold px-6 mx-5 py-2 rounded-full whitespace-nowrap"
              >
                Add Post
              </Link>
            </>
          ) : (
            <>
              <div
                onClick={() => openLoginPrompt()}
                className="cursor-pointer bg-indigo-600 hover:bg-indigo-800 text-white font-bold px-6 mx-5 py-2 rounded-full whitespace-nowrap"
              >
                Add Post
              </div>
              <div
                onClick={() => openLoginPrompt()}
                className="cursor-pointer bg-indigo-600 hover:bg-indigo-800 text-white font-bold px-6 py-2 rounded-full whitespace-nowrap"
              >
                My Posts
              </div>
            </>
          )}
        </div>

        {loginPrompt && (
          <LoginPrompt toggleLoginPrompt={() => toggleLoginPrompt()} />
        )}

        {/* <form> */}
        <div className="flex mx-5 md:mx-28 md:mt-10">
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
        </div>
        {/* </form> */}

        <div className="flex justify-center mx-2 my-1  mb-10">
          <Menu as="div" className="inline-block">
            <div>
              <Menu.Button className="flex justify-center rounded-lg bg-indigo-600 px-7 py-2 text-sm font-medium text-white hover:bg-indigo-800">
                {searchSortBy.length > 0 ? searchSortBy : "Sort By"}
              </Menu.Button>
            </div>

            <Menu.Items className="absolute z-10 my-2 divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-10">
              {list.map((sortby, key) => (
                <div
                  key={key}
                  className={`text-center px-10 hover:bg-gray-200`}
                >
                  <>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={` ${
                            active ? "text-indigo-600" : "text-gray-900"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          onClick={() => {
                            setSearchSortBy(sortby.name);
                            setSearchSortByFilter(sortby.filter);
                            setSearchSortByOrder(sortby.order);
                          }}
                        >
                          {sortby.name} {String.fromCharCode("&uarr;")}
                        </button>
                      )}
                    </Menu.Item>
                  </>
                </div>
              ))}
            </Menu.Items>
          </Menu>
        </div>

        <div className="">
          <div>
            <div className="text-center text-2xl my-3 font-bold">
              Top Selling Items
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
                      No Products to list!!!
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full mb-10">
                      {products?.map((product, key) => (
                        <div key={key}>
                          <ProductCard
                            data={product.iteminfo}
                            id={product._id}
                            user={product.user}
                            postedOn={product.createdat}
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

export default BASHome;
