import ProductCard from "./productCard";
import buyAndSellService from "../../services/buyAndSellService";
import { useEffect, useState } from "react";
import Loader from "../../common/loader";

function MyPosts(params) {
  const [loader, setLoader] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getMyProducts = async () => {
      setLoader(true);
      const res = await buyAndSellService.myProducts();
      setProducts(res.data.product);
      setLoader(false);
    };

    getMyProducts();
  }, []);

  return (
    <>
      <div className="mx-5 my-10 md:mx-20">
        <div className="text-2xl font-bold text-center w-full mb-5">
          My Posts
        </div>

        {loader ? (
          <div className="flex justify-center">
            <Loader />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {products.length > 0 ? products.map((product, key) => (
                <div key={key}>
                  <ProductCard
                    data={product.iteminfo}
                    user={product.user}
                    id={product._id}
                    postedOn={product.createdat}
                    showVerify={true}
                    verified={product.verified}
                  />
                </div>
              )) :
              <>
                <div className="text-center text-xl font-bold">
                  No Posts Found
                </div>
              </>
              }
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default MyPosts;
