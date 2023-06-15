import React, { useState } from "react";
import FormButton from "../../common/formButton";
import Input from "../../common/input";
import PromptPrivateKey from "../../common/promptPrivateKey";
import FarmerService from "../../services/farmerService";

function CreateToken() {
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const [promptPrivateKeyModal, setPromptPrivateKeyModal] = useState(false);

    const [productName, setProductName] = useState("");
    const [placeOfOrigin, setPlaceOfOrigin] = useState("");
    const [quantity, setQuantity] = useState("");

    const [tokenId, setTokenId] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoader(true);
        setError("");
        setSuccess("");

        setPromptPrivateKeyModal(true);
    };

    const sendRequest = async (key) => {
        try {
            let tokenData = {
                productName,
                placeOfOrigin,
                quantity,
                productionDate: new Date().toISOString(),
            }

            console.log("tokenData: ", tokenData);

            const res = await FarmerService.createToken(tokenData, key);
            
            console.log("response: ", res.data);
            setLoader(false);

            if (res.data.success) {
                setError("");
                setSuccess("Token Created Successfully!");
                setTokenId(res.data.message.result);
            } else {
                setSuccess("");
                setError(res.data.error.message);
            }
        } catch (error) {
            setLoader(false);
            setSuccess("");
            setError("Something went wrong!");
            console.log(error);
        }
    }

    const handlePromptPrivateKey = (promptPrivateKey) => {
        setPromptPrivateKeyModal(false);
        sendRequest(promptPrivateKey);
    }

    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900 min-h-[93vh] py-10">
                <div className="flex flex-col items-center justify-center px-6 mx-auto lg:py-0">
                    <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                        <h2 className="mb-1 text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create Token
                        </h2>
                        <form
                            className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
                            onSubmit={(e) => handleSubmit(e)}
                        >
                            <Input
                                label="Product Name"
                                type="text"
                                id="productName"
                                required
                                value={productName}
                                onChange={setProductName}
                            />

                            <Input
                                label="Place of Origin"
                                type="text"
                                id="placeOfOrigin"
                                required
                                value={placeOfOrigin}
                                onChange={setPlaceOfOrigin}
                            />

                            <Input
                                label="Quantity (in kg)"
                                type="number"
                                id="quantity"
                                required
                                value={quantity}
                                onChange={setQuantity}
                            />

                            {error ? (
                                <div className="text-red-500 text-sm text-center  ">
                                    {error}
                                </div>
                            ) : null}
                            {success ? (
                                <>
                                <div className="text-green-500 text-sm text-center  ">
                                    {success}
                                </div>
                                <div className="text-gray-50 text-md text-center  ">
                                    Token ID: {tokenId}
                                    </div>
                                </>
                            ) : null}

                            <FormButton name="Submit" loader={loader} />

                        </form>
                        {
                            promptPrivateKeyModal ? <PromptPrivateKey handlePromptPrivateKey={handlePromptPrivateKey} /> : null
                        }
                    </div>
                </div>
            </section>
        </>
    );
}
export default CreateToken;
