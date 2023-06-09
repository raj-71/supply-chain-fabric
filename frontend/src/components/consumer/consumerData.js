import React, { useState } from "react";
import Error from "../../common/error";
import FormButton from "../../common/formButton";
import Input from "../../common/input";
import Loader from "../../common/loader";
import Success from "../../common/success";
import ConsumerService from "../../services/consumerService";

function ConsumerData() {
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const [tokenId, setTokenId] = useState("");
    const [show, setShow] = useState(false);
    const [tokenData, setTokenData] = useState([]);
    const [parentData, setParentData] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoader(true);
        setError("");
        setSuccess("");

        sendRequest();

    };

    const sendRequest = async () => {
        try {
            setLoader(true);
            setShow(false);
            const res = await ConsumerService.getTokenData(tokenId);

            console.log("response: ", res.data);
            setLoader(false);

            if (res.data.success) {
                setError("");
                setLoader(false);
                console.log("response data");
                console.log(res.data);

                setTokenData(JSON.parse(res.data.message.result.txid));
                setParentData(JSON.parse(res.data.message.parentResult.txid));

                setShow(true);
            } else {
                setSuccess("");
                setError(res.data.error.message);
            }
        } catch (error) {
            console.log(error);
            setLoader(false);
            setSuccess("");
            setError("Something went wrong!");
        }
    }

    const columnNames = ["Parent Token Id", "Token Id", "New Product Name", "Quantity", "Expiration Date", "Bought From"]

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
            <section className="bg-gray-50 dark:bg-gray-900 min-h-[93vh] py-10">
                <div className="flex flex-col items-center justify-center px-6 mx-auto lg:py-0">
                    <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                        <h2 className="mb-1 text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            View Data
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

                            <Error error={error} />

                            <Success success={success} />

                            <FormButton name="Submit" loader={loader} />

                        </form>
                    </div>
                    {
                        show ?
                            <>
                                <div className="container my-12 px-6 mx-auto">
                                    <section className="mb-32 text-center">
                                        <div className="mx-auto px-3 lg:px-6">
                                            <h2 className="text-3xl text-gray-50 font-bold mb-12">Tracking Data</h2>
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
                                                                    <tr>
                                                                        <TableData data={tokenData.parentTokenId} />
                                                                        <TableData data={tokenData.tokenId} />
                                                                        <TableData data={JSON.parse(tokenData.metadataURI).newProductName} />
                                                                        <TableData data={JSON.parse(tokenData.metadataURI).quantity} />
                                                                        <TableData data={JSON.parse(tokenData.metadataURI).expirationDate} />
                                                                        <TableData data={tokenData.owner.match(/CN=([^:]+)/)?.[1] || "NA"} />
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                                {
                                    parentData.length > 0 ?
                                        <>
                                            <div>
                                                <div>
                                                    <h2 className="text-3xl text-gray-50 font-bold mb-12 text-center">Parent Token Transaction History</h2>
                                                </div>
                                                {parentData.map((item, index) => {
                                                    return (
                                                        <div className="container my-12 px-6 mx-auto text-gray-50 text-left">
                                                            <section className="mb-16">
                                                                <div className="mx-auto px-3 lg:px-6">
                                                                    Transaction Id - {item.transactionId} <br />
                                                                    Time - {(new Date(item.timestamp.seconds.low * 1000)).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: "2-digit", hour12: true })} <br />
                                                                    Farmer - <div><pre>{(JSON.stringify(JSON.parse(JSON.parse(item.value).farmer), null, 2))}</pre></div>
                                                                    Value - <div><pre>{(JSON.stringify(JSON.parse(item.value), null, 2))}</pre></div>
                                                                </div>
                                                            </section>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </>
                                        : null
                                }
                            </>

                            :
                            null
                    }
                </div>
            </section>
        </>
    );
}
export default ConsumerData;
