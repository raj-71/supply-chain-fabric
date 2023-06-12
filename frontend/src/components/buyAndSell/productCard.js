import React, { useState } from "react";
import { Link } from "react-router-dom";
import authService from "../../services/authService";
import buyAndSellService from "../../services/buyAndSellService";
import Loader from "../../common/loader";

function ProductCard(props) {
  const [loader, setLoader] = useState(false);
  const [deleted, setDeleted] = useState(false);

  function getDateXDaysAgo(date) {
    const currentDate = new Date();

    let diff = currentDate - new Date(date);

    let diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));

    return diffDays;
  }

  const deleteProduct = async (e, id) => {
    e.preventDefault();
    setLoader(true);
    const data = {
      productid: `${id}`,
    };

    try {
      const res = await buyAndSellService.deleteProduct(data);

      if (res.data.success) {
        setDeleted(true);
      }
      setLoader(false);
    } catch (error) {
      setLoader(false);
    }
  };

  return (
    <>
      <Link
        to={
          authService.getCurrentUser() === props?.user
            ? `/buyAndSell/product-me/${props?.id}`
            : `/buyAndSell/${props?.id}`
        }
      >
        <div className="relative mx-auto w-full">
          <div className="relative inline-block duration-300 ease-in-out transition-transform transform w-full">
            <div className="shadow p-4 rounded-lg bg-white">
              <div className="flex justify-center relative rounded-lg overflow-hidden h-52">
                <div className="transition-transform duration-500 transform ease-in-out w-full">
                  <img
                    alt="about"
                    className="h-60 w-full"
                    src={props?.data.images[0]?.url}
                  />
                </div>

                {/* <div className="absolute flex justify-center bottom-0 mb-3"></div> */}
              </div>

              <div className="my-4">
                <div className="grid grid-cols-2 mt-8">
                  <div className="flex items-center">
                    <p className="font-medium text-base md:text-lg text-gray-800 line-clamp-1">
                      {props?.data.itemname}
                    </p>
                  </div>

                  <div className="flex justify-end">
                    <p className="inline-block font-semibold text-primary whitespace-nowrap leading-tight rounded-xl">
                      <span className="text-sm uppercase">₹</span>
                      <span className="text-lg">
                        {props?.data?.price.toLocaleString("en-IN")}
                      </span>
                    </p>
                  </div>
                </div>
                <p
                  className="mt-2 text-sm text-gray-800 line-clamp-1"
                  title="New York, NY 10004, United States"
                >
                  {props?.data.description.length > 20
                    ? props?.data.description.slice(0, 40) + "..."
                    : props?.data.description}
                </p>
              </div>

              {authService.getCurrentUser() === props?.user ? (
                <>
                  <div className="grid grid-cols-2 gap-4 h-12">
                    <Link to={`/buyAndSell/editPost/${props?.id}`}>
                      <div className="flex justify-center">
                        <button className="m-2 p-2 bg-indigo-600 text-white hover:bg-indigo-800 text-m font-bold rounded-full w-full">
                          Edit
                        </button>
                      </div>
                    </Link>


                    <div
                      className="flex justify-center"
                      
                    >
                      <button
                        className={` m-2 p-2 ${
                          deleted
                            ? "bg-red-700 hover:bg-red-800"
                            : "bg-indigo-600 hover:bg-indigo-800"
                        } text-white text-m font-bold rounded-full w-full`}
                        onClick={(e) => deleteProduct(e, props?.id)}
                      >
                        {loader ? (
                          <Loader height={5} width={5} />
                        ) : deleted ? (
                          "Deleted"
                        ) : (
                          "Delete"
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-row-reverse justify-between text-sm h-12 items-center">
                    {props?.showVerify ? (
                      <>
                        <div>
                          <span className="font-semibold">Verified: </span>
                          {props?.verified ? "Yes" : "No"}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                    <div>
                      <span className="font-semibold">Posted: </span>
                      {getDateXDaysAgo(props?.postedOn) < 1
                        ? "Today"
                        : getDateXDaysAgo(props?.postedOn) + " days ago"}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-row-reverse justify-between text-sm h-12 items-center">
                    <div>
                      <span className="font-semibold">Posted: </span>
                      {getDateXDaysAgo(props?.postedOn) < 1
                        ? "Today"
                        : getDateXDaysAgo(props?.postedOn) + " days ago"}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

export default ProductCard;
