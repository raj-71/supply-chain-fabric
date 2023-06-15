import React, { useEffect, useState } from "react";
import Loader from "../../common/loader";
import PromptPrivateKey from "../../common/promptPrivateKey";
import FarmerService from "../../services/farmerService";

function MyTokensFarmer() {
    const [error, setError] = useState(false);
    const [loader, setLoader] = useState(false);

    const [promptPrivateKeyModal, setPromptPrivateKeyModal] = useState(true);

    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);

    const sendRequest = async (key) => {
        try {
            setLoader(true);
            console.log("privateKey: ", key);

            const res = await FarmerService.getTokens(key);

            console.log("response: ", res.data);
            setLoader(false);

            if (res.data.success) {
                setShow(true);
                setData(res.data.message.result);
                console.log(data)
            } else {
                setError(res.data.error.message);
            }
        } catch (error) {
            console.log(error);
            setError("Something went wrong!");
        }
    }

    const handlePromptPrivateKey = (promptPrivateKey) => {
        setPromptPrivateKeyModal(false);
        sendRequest(promptPrivateKey);
    }

    const columnNames = ["Token Id", "Product Name", "Origin", "Quantity (in Kg)"];

    const TableData = ({ data }) => {
        return (
            <>
                <td className="px-3 py-4 whitespace-nowrap">
                    <div className="flex">
                        <div className="ml-4">
                            <div className="text-sm text-left font-medium text-gray-900">
                                {data}
                            </div>
                        </div>
                    </div>
                </td>
            </>
        )
    }

    return (
        <>
            {
                show ?
                    <div className="container my-12 px-6 mx-auto">
                        <section className="mb-32 text-center">
                            <div className="mx-auto px-3 lg:px-6">
                                <h2 className="text-3xl font-bold mb-12">My Tokens</h2>
                                {/* Table of Doctors with column Name Department Degree and Access Toggle Button */}
                                <div className="flex flex-col">
                                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                                <table className="min-w-full divide-y divide-gray-200">
                                                    <thead className="bg-gray-50">
                                                        <tr>
                                                            {columnNames.map((column, index) => {
                                                                return (
                                                                    <th key={index}
                                                                        scope="col"
                                                                        className="px-7 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                                    >
                                                                        {column}
                                                                    </th>
                                                                )
                                                            }
                                                            )}
                                                        </tr>
                                                    </thead>
                                                    <tbody className="bg-white divide-y divide-gray-200">
                                                        {data.map((item, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td className="px-3 py-4 whitespace-nowrap">
                                                                        <div className="flex">
                                                                            <div className="ml-4">
                                                                                <div className="text-sm text-left font-medium text-gray-900">
                                                                                    {item.Key}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <TableData data={JSON.parse(item.Record.farmer).productName} />
                                                                    <TableData data={JSON.parse(item.Record.farmer).placeOfOrigin} />
                                                                    <TableData data={JSON.parse(item.Record.farmer).quantity} />
                                                                </tr>
                                                            )
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    :
                    null
            }
            {
                error && <div className="text-red-500 text-center my-10 text-lg font-semibold">{error}</div>
            }
            {
                loader ? <div className="mt-5">
                    <Loader />
                </div>  : null
            }
            {
                promptPrivateKeyModal ? <PromptPrivateKey handlePromptPrivateKey={handlePromptPrivateKey} /> : null
            }
        </>
    );
}
export default MyTokensFarmer;
