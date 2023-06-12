import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../common/loader";
import Table from "../Table/table";
import paitientService from "../../services/patientService";
function SelectInsuranceCompany(props) {

  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [columnNames, setColumnNames] = useState([]);
  const [access, setaccess] = useState([]);

  useEffect(() => {
    const getInsurancesList = async () => {
      let insuranceData = await paitientService.getOrganizationList("insurance");

      console.log(insuranceData.data.records);
      console.log(insuranceData.data.access);

      setData(insuranceData.data.records);
      setaccess(insuranceData.data.access);

      setLoader(false);
    };

    const updateColumnNames = () => {
      const keys = Object.keys(insuranceDummyData[0]);
      console.log("keys: ", keys);
      setColumnNames(keys);
    };

    getInsurancesList();
    updateColumnNames();
  }, []);

  const insuranceDummyData = [
    {
      address: "Mumbai",
      contact: "596595655",
      // createdAt: "Mon Apr 17 2023 19:17:41 GMT+0530 (India Standard Time)",
      // insuranceId: "837133",
      name: "insurance1"
    }
  ]


  const accessHandler = async (e, id) => {


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
            <Loader/>
          </div>
        :
        <>
          {
            data.length === 0 ? (
              <div className="mt-10 text-center">
                No Data Available
              </div>
            ) : (
              <Table
                tableName="Insurance Companies List"
                tableData={data}
                columnNames={columnNames}
                accessCheckbox={true}
                accessHandler={accessHandler}
                access={access}
                orgName="insurance"
              />
            )
          }
        </>
      }
    </>
  );
}

export default SelectInsuranceCompany;

