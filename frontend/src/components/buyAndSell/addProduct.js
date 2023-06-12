import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../common/loader";
import buyAndSellService from "../../services/buyAndSellService";

function AddProduct(props) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [postLoading, setPostLoading] = useState(false);
  const [prodImages, setProdImages] = useState([]);
  const [prodImagesLocal, setProdImagesLocal] = useState([]);
  const [prodName, setProdName] = useState("");
  const [prodPrice, setProdPrice] = useState("");
  const [prodDesc, setProdDescription] = useState("");
  const [prodCategory, setProdCategory] = useState("");
  const [prodCondition, setProdCondition] = useState("");
  const [prodLocation, setProdLocation] = useState("");
  const [productID, setProductID] = useState("");

  const { id } = useParams();
  const [isEdit, setIsEdit] = useState(id ? true : false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    
    for(let i=0; i<e.target.files.length; i++){
      if(e.target.files[i].size/1024 > 4096){
        setError("Each image size should be less than 4MB");
        return;
      }
    }

    if ((e.target.files.length+prodImagesLocal.length) > 0 && (e.target.files.length + prodImagesLocal.length) <= 5) {
      setError("");

      const files = Array.from(e.target.files);

      files.forEach((file) => {
        const reader = new FileReader();

        reader.onload = () => {
          if (reader.readyState === 2) {
            setProdImagesLocal((oldArray) => [...oldArray, reader.result]);
            setProdImages((oldArray) => [...oldArray, reader.result]);
          }
        };

        reader.readAsDataURL(file);
      });
    } else {
      if (prodImages.length < 1 && prodImages.length > 5){
        setPostLoading(false);
        setError("Please select 1-5 images");
      }
    }
  };

  const addProduct = async (e) => {
    setPostLoading(true);
    e.preventDefault();
    setError("");
    setSuccess("");
    if (prodImages.length < 1) {
      setError("Please select 1-5 images");
      setPostLoading(false);
      return;
    }

    const data = {
      itemname: prodName,
      category: prodCategory,
      condition: prodCondition,
      price: prodPrice,
      address: prodLocation,
      description: prodDesc,
      images: prodImages,
    };

    setError("");
    setSuccess("");

    try {
      const res = await buyAndSellService.postProducts(data);
      if (res.status === 200) {
        setSuccess("Post is successfully uploaded and sent for review!!!");
        setPostLoading(false);
        setProdCategory("");
        setProdCondition("");
        setProdDescription("");
        setProdImages([]);
        setProdImagesLocal([]);
        setProdLocation("");
        setProdName("");
        setProdPrice("");
      }
    } catch (error) {
      setError("Something went wrong!!!");
      setPostLoading(false);
    }
  };

  const editProduct = async (e) => {
    setPostLoading(true);
    e.preventDefault();
    const data = {
      itemname: prodName,
      category: prodCategory,
      condition: prodCondition,
      price: prodPrice,
      address: prodLocation,
      description: prodDesc,
      images: prodImages,
    };

    if(prodImages.length < 1){
      setError("Please select 1-5 images");
      setPostLoading(false);
      return;
    }

    try {
      const res = await buyAndSellService.updateProduct(id, data);
      if(res.data.success){
        setSuccess("Post is successfully updated and sent for review!!!");
        setTimeout(() => {
          return navigate(`/buyandsell/product-me/${productID}`);
        }, 1000);
      }
      setPostLoading(false);
    } catch (error) {
      setPostLoading(false);
    }
  };

  

  useEffect(() => {
    const getProduct = async () => {
      if (id) {
        setIsEdit(true);
        const res = await buyAndSellService.getProductMe(id);
        setProdName(res.data.product[0].iteminfo.itemname);
        setProdCategory(res.data.product[0].iteminfo.category);
        setProdCondition(res.data.product[0].iteminfo.condition);
        setProdPrice(res.data.product[0].iteminfo.price);
        setProdLocation(res.data.product[0].iteminfo.address);
        setProdDescription(res.data.product[0].iteminfo.description);
        setProdImages(res.data.product[0].iteminfo.images);
        setProdImagesLocal(res.data.product[0].iteminfo.images);
        setProductID(res.data.product[0]._id);
      }
    };

    getProduct();
  }, [id]);


  const popImage = (index) => {
    const newImages = prodImagesLocal.filter((item, i) => i !== index);
    setProdImagesLocal(newImages);
    const newImages2 = prodImages.filter((item, i) => i !== index);
    setProdImages(newImages2);
  };


  return (
    <>
      <div className="container my-12 px-6 mx-auto">
        <section className="mb-32 text-center">
          <div className="max-w-[700px] mx-auto px-3 lg:px-6">
            <h2 className="text-3xl font-bold mb-12">Sell Your Item Here</h2>
            <form onSubmit={(e) => (isEdit ? editProduct(e) : addProduct(e))}>
              <div className="form-group mb-6">
                <input
                  type="text"
                  maxLength={50}
                  required
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-indigo-600 focus:outline-none"
                  id="exampleInput7"
                  placeholder="What are you Selling?"
                  value={prodName}
                  onChange={(e) => setProdName(e.target.value)}
                />
              </div>

              <div className="form-group mb-6 text-red">
                <select
                  id="exampleInput8"
                  className="form-control cursor-pointer block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-indigo-600 focus:outline-none"
                  value={prodCategory}
                  onChange={(e) => setProdCategory(e.target.value)}
                  required
                >
                  <option value="" disabled hidden>
                    Select Category
                  </option>
                  <option value="Electronics">Electronics</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Vehicles">Vehicles</option>
                  <option value="Books">Books</option>
                  <option value="Sports">Sports</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              <div className="form-group mb-6 text-red">
                <select
                  id="exampleInput8"
                  className="form-control cursor-pointer block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-indigo-600 focus:outline-none"
                  value={prodCondition}
                  onChange={(e) => setProdCondition(e.target.value)}
                  required
                >
                  <option value="" disabled hidden>
                    Condition
                  </option>
                  <option value="Excellent">Excellent</option>
                  <option value="Good">Good</option>
                  <option value="Average">Average</option>
                </select>
              </div>

              <div className="form-group mb-6">
                <input
                  type="number"
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-indigo-600 focus:outline-none"
                  id="exampleInput8"
                  required
                  value={prodPrice}
                  onChange={(e) => setProdPrice(e.target.value)}
                  placeholder="Price"
                />
              </div>
              <div className="form-group mb-6">
                <input
                  type="text"
                  maxLength={100}
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-indigo-600 focus:outline-none"
                  id="exampleInput8"
                  value={prodLocation}
                  onChange={(e) => setProdLocation(e.target.value)}
                  placeholder="Pickup Location"
                />
              </div>

              <div className="form-group mb-6">
                <textarea
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-indigo-600 focus:outline-none"
                  id="exampleFormControlTextarea13"
                  rows="3"
                  maxLength={700}
                  required
                  value={prodDesc}
                  onChange={(e) => setProdDescription(e.target.value)}
                  placeholder="Description"
                ></textarea>
              </div>

              <div className="mb-6">
                <div className="mb-5">
                  <label
                    htmlFor="images-input"
                    className="px-6 py-2.5 cursor-pointer bg-indigo-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-indigo-800 hover:shadow-lg focus:bg-indigo-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Upload Images
                  </label>
                  <input
                    id="images-input"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                    multiple
                  />
                </div>

                {prodImages?.length > 0 && (
                  <>
                    <div className="flex w-full justify-center h-28 mt-7">
                      {prodImagesLocal.map((image, index) => (
                        <div className="relative" key={index}>
                          <img
                            className={`md:max-w-1/${prodImages?.length} h-full`}
                            src={image.url ? image.url : image}
                            key={index}
                            alt="productImage"
                          />
                          <div className="absolute flex text-2xl -top-3 right-0 cursor-pointer" onClick={() => popImage(index)} >
                            <span className="text-white leading-5 align-top flex flex-col justify-center">
                              <p className="bg-gray-800 align-top px-1 pb-1">
                              &times;
                              </p>
                              </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full px-6 py-2.5 bg-indigo-600 text-white font-medium text-sm leading-tight uppercase rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out"
                  disabled={postLoading}
                >
                  {postLoading ? <Loader height={5} width={5} /> : "Post"}
                </button>
              </div>
              {error && (
                <div className="text-center text-red-500 text-lg my-5">
                  {error}
                </div>
              )}

              {success && (
                <div className="text-center text-green-500 text-lg my-5">
                  {success}
                </div>
              )}
            </form>
          </div>
        </section>
      </div>
    </>
  );
}

export default AddProduct;
