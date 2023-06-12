import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../common/loader";
import LoginPromt from "../../container/loginPrompt";
import buyAndSellService from "../../services/buyAndSellService";

const Product3 = (props) => {
  const [imgIndex, setImgIndex] = useState(0);
  const [loader, setLoader] = useState(true);
  const [productData, setProductData] = useState({});
  const [enquiry, setEnquiry] = useState(false);
  const [enquiryData, setEnquiryData] = useState("");
  const [enquiryLoader, setEnquiryLoader] = useState(false);
  const [loginPrompt, setLoginPrompt] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const getProduct = async () => {
      const res = await buyAndSellService.getProduct(id);
      console.log(res.data);
      setLoader(true);
      console.log(res.data)
      setProductData(res.data);
      setLoader(false);
    };

    getProduct();
  }, [id]);

  function getDateXDaysAgo(date) {
    const currentDate = new Date();
    let diff = currentDate - new Date(date);
    let diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  const enquireProduct = async (id) => {
    if (!localStorage.getItem("token")) {
      setLoginPrompt(true);
      return;
    }

    if (enquiryData.length < 10) {
      setEnquiryLoader(true);
      const res = await buyAndSellService.getProductEnquire(id);
      console.log(res.data);
      if (res.data.phoneNo) {
        setEnquiryData(res.data.phoneNo);
        setEnquiry(true);
        setEnquiryLoader(false);
      }
    }
  };

  const dialNumber = async (phNo) => {
    const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobileDevice) {
      window.location.href = `tel:${enquiryData}`;
    } else {
      // Handle non-mobile device behavior, e.g. show a message to call the number manually
    }
  }

  const toggleLoginPrompt = () => {
    console.log("toggle");
    setLoginPrompt(false);
  };

  return loader ? (
    <>
      <div className="mt-5 flex justify-center">
        <Loader />
      </div>
    </>
  ) : (
    <>
      <>
        <div className=" md:flex items-start justify-center py-5 2xl:px-20 md:px-6 px-4">
          <div className="md:w-1/2">
            <img
              className="w-full md:h-3/5 md:p-5"
              alt="product"
              src={productData?.product[0]?.iteminfo?.images[imgIndex]?.url}
            />
            <div className="flex items-center w-full  justify-start mt-1 space-x-4 md:space-x-0">
              {productData?.product[0]?.iteminfo?.images.map((img, index) => (
                <div className={`md:w-1/${5}`} key={index}>
                  <img
                    alt="img-tag-one"
                    className={`h-20 md:h-48 object-contain cursor-pointer ${
                      index === imgIndex ? "opacity-40" : ""
                    }`}
                    onClick={() => setImgIndex(index)}
                    src={img.url}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="xl:w-2/5 md:w-2/5 md:mt-5 mt-6 md:pl-5">
            <div className="border-b border-gray-200 pb-6 flex justify-between">
              <h1 className="lg:text-2xl text-xl font-semibold lg:leading-6 leading-7 text-gray-800 mt-2">
                {productData?.product[0]?.iteminfo?.itemname}
              </h1>

              <div className="flex pt-2">
                <svg
                  fill="#000000"
                  height="22"
                  width="22"
                  version="1.1"
                  id="Capa_1"
                  viewBox="0 0 297 297"
                >
                  <g>
                    <path
                      d="M148.5,0C87.43,0,37.747,49.703,37.747,110.797c0,91.026,99.729,179.905,103.976,183.645
		c1.936,1.705,4.356,2.559,6.777,2.559c2.421,0,4.841-0.853,6.778-2.559c4.245-3.739,103.975-92.618,103.975-183.645
		C259.253,49.703,209.57,0,148.5,0z M148.5,272.689c-22.049-21.366-90.243-93.029-90.243-161.892
		c0-49.784,40.483-90.287,90.243-90.287s90.243,40.503,90.243,90.287C238.743,179.659,170.549,251.322,148.5,272.689z"
                    />
                    <path
                      d="M148.5,59.183c-28.273,0-51.274,23.154-51.274,51.614c0,28.461,23.001,51.614,51.274,51.614
		c28.273,0,51.274-23.153,51.274-51.614C199.774,82.337,176.773,59.183,148.5,59.183z M148.5,141.901
		c-16.964,0-30.765-13.953-30.765-31.104c0-17.15,13.801-31.104,30.765-31.104c16.964,0,30.765,13.953,30.765,31.104
		C179.265,127.948,165.464,141.901,148.5,141.901z"
                    />
                  </g>
                </svg>
                <p className="px-2">
                  {productData?.product[0]?.iteminfo?.address}
                </p>
              </div>
            </div>

            <div>
              <h1 className="lg:text-2xl text-xl font-semibold lg:leading-6 leading-7 text-gray-800 mt-5">
                ₹
                {productData?.product[0]?.iteminfo?.price.toLocaleString(
                  "en-IN"
                )}
              </h1>
              <p className="text-base leading-normal text-gray-600 mt-7">
                <span className="font-semibold">Condition: </span>
                {productData?.product[0]?.iteminfo?.condition}
              </p>
              <div className="text-base lg:leading-tight leading-normal text-gray-600 mt-2">
                <span className="font-semibold">Description: </span>
                <br />
                <p className="mt-1">
                  {productData?.product[0]?.iteminfo?.description}
                </p>
                {/* {productData?.product[0]?.iteminfo?.description} */}
              </div>
              <p className="text-base leading-4 mt-5 text-gray-600">
                <span className="font-semibold">Posted: </span>
                {getDateXDaysAgo(productData?.product[0]?.createdat) < 1
                  ? "Today"
                  : getDateXDaysAgo(productData?.product[0]?.createdat) +
                    " days ago"}
              </p>
            </div>

            <div>
              <button
                onClick={() => {enquiry ? dialNumber(id) : enquireProduct(id)}}
                className="focus:ring-offset-2 flex items-center justify-center leading-none py-4 mt-10 m-4 bg-indigo-600 hover:bg-indigo-800 shadow-md hover:shadow-lg transition duration-150 ease-in-out focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg text-white text-m font-bold rounded-full w-11/12"
              >
                {enquiryLoader ? (
                  <Loader height={5} width={5} />
                ) : enquiry ? (
                  `${enquiryData}`
                ) : (
                  "Enquire!"
                )}
              </button>
            </div>
            {loginPrompt && (
              <LoginPromt toggleLoginPrompt={() => toggleLoginPrompt()} />
            )}
          </div>
        </div>
      </>
    </>
  );
};

export default Product3;
