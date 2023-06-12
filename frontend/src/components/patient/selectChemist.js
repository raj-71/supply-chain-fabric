import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../common/loader";
import Table from "../Table/table";
import paitientService from "../../services/patientService";
function SelectChemist(props) {

  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [columnNames, setColumnNames] = useState([]);
  const [access, setAccess] = useState([]);

  useEffect(() => {
    const getPharmacyList = async () => {
      let pharmacyData = await paitientService.getOrganizationList("pharmacy");

      console.log(pharmacyData.data.records);
      console.log(pharmacyData.data.access);

      setData(pharmacyData.data.records);
      setAccess(pharmacyData.data.access);

      setLoader(false);
    };

    const updateColumnNames = () => {
      const keys = Object.keys(pharmacyDummyData[0]);
      console.log("keys: ", keys);
      setColumnNames(keys);
    };

    getPharmacyList();
    updateColumnNames();
  }, []);

  const pharmacyDummyData = [
    {
      address: "GGN",
      contact: "9955241545",
      // createdAt: "Mon Apr 17 2023 19:17:10 GMT+0530 (India Standard Time)",
      name: "pharmacy1",
      // pharmacyId: "200137"
    }
  ]


  const accessHandler = async (e, id) => {

    console.log("checkbox", e.target.checked);
    console.log("checkbox id", id);

    if (e.target.checked) {
      var confirmed = window.confirm("Are you sure you want to give access ?");

      if (confirmed) {
        console.log("Access given");
        const res = await paitientService.giveAccess(id);
        console.log(res);

        if (res.data.success) {
          console.log("id: ", id);
          window.alert(res.data.message);
          window.location.reload();
        }
        else {
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

        if (res.data.success) {
          window.alert(res.data.message);
          window.location.reload();
        }
        else {
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
                ) : (
                  <Table
                    tableName="Pharmacy List"
                    tableData={data}
                    columnNames={columnNames}
                    accessCheckbox={true}
                    accessHandler={accessHandler}
                    access={access}
                    orgName="pharmacy"
                  />
                )
            }
          </>
      }
    </>
  );
}

export default SelectChemist;