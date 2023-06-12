import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../common/loader";
import AutoService from "../../services/AutoServices";
import Table from "../Table/table";
function CustomerList(props) {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [postLoading, setPostLoading] = useState(false);

    const [doctorsList, setDoctorsList] = useState([]);

    const { id } = useParams();
    const [isEdit, setIsEdit] = useState(id ? true : false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(e);
    };

    useEffect(() => {
        const getDoctorsList = async () => {
            if (id) {
                setIsEdit(true);
                const res = await AutoService.getRequest(id);
                console.log(res);
            }
        };

        getDoctorsList();
    }, [id]);

    const recordData = [
        {
            sno:1,
            date:"08/04/2023",
            paitent_name: "Dr. John Doe",
            address:"sasni gate",
            chemist_shop: "New drug house",
            insurance_status: "Not Claimed",
            claimed_date:"09/02/2023",
        },
        {
            sno:2,
            date:"07/03/2023",
            paitent_name: "Dr. Mark Jones",
            address:"sasni gate",
            chemist_shop: "New drug house",
            insurance_status: "Not Claimed",
            claimed_date:"09/02/2023",
        },
        {
            sno:3,
            date:"09/02/2023",
            paitent_name: "Dr. John Doe",
            address:"sasni gate",
            chemist_shop: "New drug house",
            insurance_status: "Not Claimed",
            claimed_date:"09/02/2023",
        }
    ]

    const columnNames=["S.No","Date","Paitient Name","Doctor Name","Chemist's Shop Name","Insurance Status","Claimed Date"]




    return (
        <>
            <Table tableName="Customer Records" tableData={recordData} columnNames={columnNames} />
        </>
    );
}

export default CustomerList;