import React, { useState } from "react";
import Error from "../../common/error";
import FormButton from "../../common/formButton";
import Input from "../../common/input";
import PromptPrivateKey from "../../common/promptPrivateKey";
import Success from "../../common/success";
import WholesalerService from "../../services/wholesalerService";

function SellToRetailer() {
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const [promptPrivateKeyModal, setPromptPrivateKeyModal] = useState(false);

    const [tokenId, setTokenId] = useState("");
    const [retailerId, setRetailerId] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoader(true);
        setError("");
        setSuccess("");

        setPromptPrivateKeyModal(true);
    };

    const sendRequest = async (key) => {
        try {
            console.log("tokenId: ", tokenId, "retailerId: ", retailerId);

            const res = await WholesalerService.sellToRetailer(tokenId, retailerId, key);
            
            console.log("response: ", res.data);
            setLoader(false);

            if (res.data.success) {
                setError("");
                setSuccess("Token Transfered Successfully!");
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
                                label="Reatiler Username"
                                type="text"
                                id="retailerId"
                                required
                                value={retailerId}
                                onChange={setRetailerId}
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
export default SellToRetailer;
