import Canteen from "../../assets/images/landingPage/canteen.png";
import buyAndSell from "../../assets/images/landingPage/trade.png";
import cabSharing from "../../assets/images/landingPage/autoShare.png";
import { Link } from "react-router-dom";

function Services() {
  const services = [
    {
      id: 1,
      title: "Canteen",
      link: "/canteen",
      description: "Let food celebrate life",
      image: Canteen,
    },
    {
      id: 2,
      title: "Buy and Sell",
      link: "/buyAndSell",
      description: "Buy the best, and forget the rest",
      image: buyAndSell,
    },
    {
      id: 3,
      title: "Cab/Auto Sharing",
      link: "/autoShare",
      description: "Let's ride together and save more",
      image: cabSharing,
    },
  ];

  return (
    <>
      <div>
        <div className="text-center text-4xl font-bold mt-12">Our Services</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 justify-around md:mx-0 lg:mx-20 mx-20 gap-8 md:gap-0 lg:gap-8 group mt-5">
        {services.map((service, index) => (
          <div className="bg-gray-800 md:mb-6 md:mx-10 md:my-8 duration-500 group-hover:blur-none hover:!blur-none group-hover:scale-[0.85] hover:!scale-100 cursor-pointer p-8 rounded-lg mix-blend-luminosity"
          key={index}>
            <Link
              to={service.link}
            >
              <div>
                <div className="flex justify-center">
                  <img
                    src={service.image}
                    className="md:mx-auto h-28 w-32 mb-5 object-scale-down"
                    alt={service.title}
                  />
                </div>
                <h3 className="uppercase text-x1 text-white font-bold text-center">
                  {service.title}
                </h3>
                <p className="text-lg  md:my-3 text-white font-light text-center opacity-50">
                  {service.description}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default Services;
