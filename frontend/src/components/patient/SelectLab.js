import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../common/loader";
import Table from "../Table/table";
import paitientService from "../../services/patientService";
function SelectLab(props) {

  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true)
  const [columnNames, setColumnNames] = useState([]);
  const [access, setAccess] = useState([]);

  useEffect(() => {
    const getLabsList = async () => {
      let labData = await paitientService.getOrganizationList("lab")

      console.log(labData.data.records);
      console.log(labData.data.access);

      setData(labData.data.records);
      setAccess(labData.data.access);

      setLoader(false);

    };

    getLabsList();
    updateColumnNames();
  }, []);

  const ShopData = [
    {
      address: "Gurgaon",
      contact: "9686596563",
      // createdAt: "Mon Apr 17 2023 19:15:48 GMT+0530 (India Standard Time)",
      // labId: "582354",
      name: "lab1"
    }
  ]

  const updateColumnNames = () => {
    const keys = Object.keys(ShopData[0]);
    setColumnNames(keys);
  };

  const accessHandler = async (e, id) => {

    console.log("checkbox: ", e.target.checked);
    console.log("checkbox id: ", id);

    if (e.target.checked) {
      var confirmed = window.confirm("Are you sure you want to give access ?");

      if (confirmed) {
        console.log("Access given");
        const res = await paitientService.giveAccess(id);
        console.log(res);

        if (res.data.success) {
          console.log("id: ",id);
          window.alert(res.data.message);
          window.location.reload();
        }
        else{
          window.alert("Providing Access Failed");
        }

      } else {
        e.target.checked = !e.target.checked
        console.log("Access cancelled");
      }
    } else {

      var confirmed = window.confirm("Are you sure you want to remove access ?");

      if (confirmed) {
        console.log("Access removed");
        const res = await paitientService.removeAccess(id);
        console.log(res);

        if(res.data.success){
          window.alert(res.data.message);
          window.location.reload();
        }
        else{
          window.alert("Removing Access Failed");
        }

      } else {
        e.target.checked = !e.target.checked
        console.log("Access cancelled");
      }

    }

  };

  return (
    <>
      {
        loader ?
          <div className="mt-10">
            <Loader />
          </div>
          :
          <>
            {
              data.length === 0 ?
                (
                  <div className="mt-10 text-center">
                    No Data Available
                  </div>
                )
                :
                (
                  <Table
                    tableName="Labs List"
                    tableData={data}
                    columnNames={columnNames}
                    accessCheckbox={true}
                    accessHandler={accessHandler}
                    access={access}
                    orgName="lab"
                  />
                )
            }
          </>
      }
    </>
  );
}

export default SelectLab;

