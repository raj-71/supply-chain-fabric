import { useEffect, useState } from "react";
import Loader from "../../common/loader";
import AutoService from "../../services/AutoServices";
import RequestCard from "./RequestCard";

function MyRequests(params) {
  const [loader, setLoader] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getMyProducts = async () => {
      setLoader(true);
      const res = await AutoService.getCabDetailsMe();
      setProducts(res.data.requests);
      setLoader(false);
    };

    getMyProducts();
  }, []);

  return (
    <>
      <div className="mx-5 my-10 md:mx-20">
        <div className="text-2xl font-bold text-center w-full mb-5">
          My Requests
        </div>

        {loader ? (
          <div className="flex justify-center">
            <Loader />
          </div>
        ) : (
          <>
            {products.length > 0 ? (
              products.map((product, key) => (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                  <div key={key}>
                    <RequestCard cabdata={product} />
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center col-span-2 text-xl w-full">
                No Requests Found!
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default MyRequests;
