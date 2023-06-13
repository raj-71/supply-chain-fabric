import React, { useState } from "react";
import Input from "../../common/input";
import Loader from "../../common/loader";
import PromptPrivateKey from "../../common/promptPrivateKey";
import WholesalerService from "../../services/wholesalerService";

function TokensOverToken() {
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const [promptPrivateKeyModal, setPromptPrivateKeyModal] = useState(false);
    const [privateKey, setPrivateKey] = useState("");

    const [tokenId, setTokenId] = useState("");
    const [numberOfTokens, setNumberOfTokens] = useState("");
    const [newProductName, setNewProductName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [expirationDate, setExpirationDate] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoader(true);
        setError("");
        setSuccess("");

        setPromptPrivateKeyModal(true);
    };

    const sendRequest = async () => {
        try {

            const res = await WholesalerService.generateTokensOverToken(tokenId, numberOfTokens, {newProductName, quantity, expirationDate}, privateKey);

            console.log("response: ", res.data);

            if (res.data.success) {
                setSuccess("Token Transfered Successfully!");
                setError("");
                setLoader(false);
                console.log("response data");
                console.log(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handlePromptPrivateKey = (promptPrivateKey) => {
        setPrivateKey(promptPrivateKey);
        setPromptPrivateKeyModal(false);
        sendRequest();
    }

    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900 min-h-[93vh] py-10">
                <div className="flex flex-col items-center justify-center px-6 mx-auto lg:py-0">
                    <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                        <h2 className="mb-1 text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sell to Retailer
                        </h2>
                        <form
                            className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
                            onSubmit={(e) => handleSubmit(e)}
                        >
                            <Input
                                label="Token Id"
                                type="text"
                                id="tokenId"
                                required
                                value={tokenId}
                                onChange={setTokenId}
                            />

                            <Input
                                label="Number of New Tokens"
                                type="number"
                                id="numberOfTokens"
                                required
                                value={numberOfTokens}
                                onChange={setNumberOfTokens}
                            />

                            <Input
                                label="New Product Name"
                                type="text"
                                id="newProductName"
                                required
                                value={newProductName}
                                onChange={setNewProductName}
                            />

                            <Input
                                label="Quantity"
                                type="number"
                                id="quantity"
                                required
                                value={quantity}
                                onChange={setQuantity}
                            />

                            <Input
                                label="Expiration Date"
                                type="date"
                                id="expirationDate"
                                required
                                value={expirationDate}
                                onChange={setExpirationDate}
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
                                </>
                            ) : null}

                            <button
                                type="submit"
                                className="w-full text-white bg-indigo-600 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                {loader ? <Loader height={5} width={5} /> : "Submit"}
                            </button>

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
export default TokensOverToken;
