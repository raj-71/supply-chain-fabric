import Canteen from "../assets/images/dashboard/canteen.png";
import BuyAndSell from "../assets/images/dashboard/buysell.png";
import AutoShare from "../assets/images/dashboard/autoshare.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import authService from "../services/authService";

function Dashboard() {
  const user = authService.getRole();
  const [apps, setApps] = useState([]);
  const [loader, setloader] = useState(false);

  const farmerDashboard = [
    {
      name: "Create Token",
      imgSrc: Canteen,
      link: "/create-token",
      blocked: false,
    },
    {
      name: "Sell to Wholesaler",
      imgSrc: Canteen,
      link: "/sell-to-wholesaler",
      blocked: false,
    },
    {
      name: "My Tokens",
      imgSrc: Canteen,
      link: "/my-tokens",
      blocked: false,
    }
  ];

  const wholesalerDashboard = [
    {
      name: "Create Tokens over Token",
      imgSrc: Canteen,
      link: "/create-tokens-over-token",
      blocked: false,
    },
    {
      name: "Sell to Retailer",
      imgSrc: Canteen,
      link: "/sell-to-retailer",
      blocked: false,
    },
    {
      name: "My Tokens",
      imgSrc: Canteen,
      link: "/my-tokens",
      blocked: false,
    }
  ];

  const retailerDashboard = [
    {
      name: "Sell to Consumer",
      imgSrc: Canteen,
      link: "/sell-to-consumer",
      blocked: false,
    },
    {
      name: "My Tokens",
      imgSrc: Canteen,
      link: "/my-tokens",
      blocked: false,
    }
  ];

  useEffect( () => {

    if (user === "farmer") {
      setApps(farmerDashboard);
    } else if (user === "wholesaler") {
      setApps(wholesalerDashboard);
    } else if (user === "retailer") {
      setApps(retailerDashboard);
    }
    setloader(true)

  },[user]);

  const navigate = useNavigate();

  return (
    <>
      <div className="h-4/5">
        <div className="text-center flex h-1/3 justify-around items-center">
          <div className="text-center mt-10 text-3xl font-bold">
            Select your service
          </div>
        </div>

        {!loader ?
          <>
            Loading.......
          </> :
          <>

            <div className="text-center grid grid-cols-1 md:grid-cols-3 md:gap-5 justify-around mx-20 items-center mt-10 mb-10">
              {apps?.map((app, index) => (
                <div key={index} onClick={() => { app.blocked ? <></> : navigate(`${app.link}`) }}>
                  <div
                    // to={`${app.link}`}
                    className="scale-90 md:scale-100 border-2 rounded-3xl flex flex-col justify-center sm:mt-10 mx-5 md:mx-5 items-center border-blue-100  p-10 text-xl hover:border-blue-200 cursor-pointer hover:bg-blue-50 transition delay-100 hover:scale-90 md:hover:scale-110"
                  >
                    {app.name}
                  </div>
                </div>
              ))}
            </div>

          </>}


      </div>
    </>
  );
}

export default Dashboard;
