import { useState } from "react";
import Input from "./input";

const PromptPrivateKey = ({ handlePromptPrivateKey }) => {

    const [privateKey, setPrivateKey] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        handlePromptPrivateKey(privateKey);
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const text = e.target.result;
            console.log("text", text);
            setPrivateKey(text);
        }

        reader.readAsText(file);
    }

    return (
        <>
            <div className="text-white -center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="container mx-auto px-4 h-full z-10">
                    <div className="flex content-center items-center justify-center h-full">
                        <div className="w-full lg:w-6/12 px-4">
                            <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg bg-gray-800 border-0">
                                <div className="flex-auto px-4 lg:px-10 pb-10 px-10 text-2xl pt-0">
                                    <form onSubmit={(e) => handleSubmit(e)}>
                                        <div className="text-center mb-3 mt-5 font-bold">
                                            <small>Enter Private Key</small>
                                        </div>
                                        <input type="file" onChange={handleFileUpload} />
                                        {/* <Input
                                            label="Private Key"
                                            type="text"
                                            id="privateKey"
                                            required
                                            value={privateKey}
                                            onChange={setPrivateKey}
                                        /> */}
                                        <button
                                            type="submit"
                                            className="w-full mt-5 text-white bg-indigo-600 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                        >
                                            Submit
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-40 fixed inset-0 z-40 bg-black"></div>
        </>
    );
};

export default PromptPrivateKey;