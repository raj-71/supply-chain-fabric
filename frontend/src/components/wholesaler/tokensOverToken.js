import React, { useState } from "react";
import Error from "../../common/error";
import FormButton from "../../common/formButton";
import Input from "../../common/input";
import PromptPrivateKey from "../../common/promptPrivateKey";
import Success from "../../common/success";
import WholesalerService from "../../services/wholesalerService";

function TokensOverToken() {
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const [promptPrivateKeyModal, setPromptPrivateKeyModal] = useState(false);

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

    const sendRequest = async (key) => {
        try {

            const res = await WholesalerService.generateTokensOverToken(tokenId, numberOfTokens, {newProductName, quantity, expirationDate}, key);

            console.log("response: ", res.data);
            setLoader(false);

            if (res.data.success) {
                setError("");
                setSuccess("Tokens Created Successfully!");
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
                            Create Tokens Over Token
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

                            <Error error={error} />
                            
                            <Success success={success} />

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
export default TokensOverToken;
