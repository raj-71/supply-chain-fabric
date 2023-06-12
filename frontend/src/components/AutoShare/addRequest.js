import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../common/loader";
import AutoService from "../../services/AutoServices";
function AddRequest(props) {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [postLoading, setPostLoading] = useState(false);
    const [noOfRiders, setNoOfRiders] = useState("");
    const [time, setTime] = useState("");
    const [from, setfrom] = useState("");
    const [to, setTo] = useState("");
    const [date, setDate] = useState("");
    const [transport, settransport] = useState("");

    const { id } = useParams();
    const [isEdit, setIsEdit] = useState(id ? true : false);

    console.log(from, to, date, transport)

    const handleSubmit = async (e) => {
        e.preventDefault();


        if (!noOfRiders || !time || !from || !to || !date || !transport) {
            setError("Please fill all the fields");
            return;
        }

        setError("");
        setSuccess("");

        if (from === "Headed From" || to === "Headed To" || transport === "Vehicle Type") {
            setError("Please fill all the fields");
            return;
        }

        try {
            const reqdata = {
                placeinfo: {
                    time,
                    location: {
                        from,
                        to
                    },
                    Date: date
                },
                transport,
                no_of_riders: noOfRiders
            }
            await AutoService.postRequest(reqdata);
            setSuccess("Requested successfully");
            setNoOfRiders("")
            setTime("")
            setfrom("")
            setTo("")
            setDate("")
            settransport("")


        } catch (err) {
            // if (er.response && er.response.status === 400) {
            //   console.log(er.response.data);
            // }
            if (err.response) {
                setError(err.response.data.message);
                console.log(err.response);
            } else {
                setError("Something went wrong");
                console.log(err);
            }

            return;
        }
    };



    const editRequest = async (e) => {
        console.log("jkjkj")
        setPostLoading(true);
        e.preventDefault();
        const reqdata = {
            placeinfo: {
                time,
                location: {
                    from,
                    to
                },
                Date: date
            },
            transport,
            no_of_riders: noOfRiders
        }



        try {
            const res = await AutoService.updateRequest(id, reqdata);
            console.log(res)
            if (res.data.success) {
                setSuccess("Request is successfully updated !!!");
            }
            setPostLoading(false);
        } catch (error) {
            setPostLoading(false);
        }
    };

    useEffect(() => {
        const getrequest = async () => {
            if (id) {
                setIsEdit(true);
                const res = await AutoService.getRequest(id);
                console.log(res)
                setNoOfRiders(res.data.cab[0].no_of_riders)
                setTime(res.data.cab[0].placeinfo.time)
                setfrom(res.data.cab[0].placeinfo.location.from)
                setTo(res.data.cab[0].placeinfo.location.to)
                setDate(res.data.cab[0].placeinfo.Date)
                settransport(res.data.cab[0].transport)
            }
        };

        getrequest();
    }, [id]);







    return (
        <>
            <div className="container my-12 px-6 mx-auto">
                <section className="mb-32 text-center">
                    <div className="max-w-[700px] mx-auto px-3 lg:px-6">
                        <h2 className="text-3xl font-bold mb-12">Add Your Sharing Request Here</h2>
                        <form onSubmit={(e) => (isEdit ? editRequest(e) : handleSubmit(e))} >
                            <div class="form-group mb-6">
                                <input
                                    type="number"
                                    class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Number of Rider you looking for"
                                    value={noOfRiders}
                                    onChange={(e) => setNoOfRiders(e.target.value)}
                                />
                            </div>
                            <div class="form-group mb-6">
                                <select
                                    required
                                    value={transport}
                                    onChange={(e) => settransport(e.target.value)}
                                    class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none">
                                    <option selected>Vehicle Type</option>
                                    <option value="Auto">Auto</option>
                                    <option value="Vikram">Vikram</option>
                                    <option value="Cab">Cab</option>
                                </select>
                            </div>
                            <div class="form-group mb-6">
                                <select
                                    required
                                    value={from}
                                    onChange={(e) => setfrom(e.target.value)}
                                    class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none">
                                    <option selected>Headed From</option>
                                    <option value="IIT Kanpur">IIT Kanpur</option>
                                    <option value="Rawatpur">Rawatpur</option>
                                    <option value="Moti Jheel">Moti Jheel</option>
                                    <option value="Swaroop Nagar">Swaroop Nagar</option>
                                    <option value="Kanpur Central">Kanpur Central</option>
                                    <option value="South-X-Mall">South-X-Mall</option>
                                    <option value="Z-Square">Z-Square</option>
                                    <option value="Rave-3">Rave-3</option>
                                    <option value="Bithor">Bithor</option>
                                    <option value="CHakeri Aiport">CHakeri Aiport</option>
                                    <option value="Lucknow Aiport">Lucknow Aiport</option>
                                </select>
                            </div>
                            <div class="form-group mb-6">
                                <select
                                    value={to}
                                    onChange={(e) => setTo(e.target.value)}
                                    required
                                    class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none">
                                    <option selected>Headed to</option>
                                    <option value="IIT Kanpur">IIT Kanpur</option>
                                    <option value="Rawatpur">Rawatpur</option>
                                    <option value="Moti Jheel">Moti Jheel</option>
                                    <option value="Swaroop Nagar">Swaroop Nagar</option>
                                    <option value="Kanpur Central">Kanpur Central</option>
                                    <option value="South-X-Mall">South-X-Mall</option>
                                    <option value="Z-Square">Z-Square</option>
                                    <option value="Rave-3">Rave-3</option>
                                    <option value="Bithor">Bithor</option>
                                    <option value="CHakeri Aiport">CHakeri Aiport</option>
                                    <option value="Lucknow Aiport">Lucknow Aiport</option>
                                </select>
                            </div>
                            <label for="datepicker " style={{"textAlign":"left"}} class="block text-gray-700 font-medium">Select Date:</label>

                            <div class="form-group mb-6">

                                <input
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}

                                    type="Date"
                                    class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                />
                            </div>
                            <label for="timepicker" style={{"textAlign":"left"}} class="block text-gray-700 font-medium">Select Time:</label>

                            <div class="form-group mb-6">

                                <input
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}

                                    type="time"
                                    class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                />
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

export default AddRequest;