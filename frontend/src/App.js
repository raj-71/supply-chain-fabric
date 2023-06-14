import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./container/home";
import Navbar from "./container/navbar";
import Page404 from "./container/page404";
import Login from "./components/login/login";
import Register from "./components/login/register";
import Dashboard from "./container/dashboard";
import Logout from "./container/logout";
import CreateToken from "./components/farmer/createToken";
import SellToWholesaler from "./components/farmer/sellToWholesaler";
import SellToRetailer from "./components/wholesaler/sellToRetailer";
import TokensOverToken from "./components/wholesaler/tokensOverToken";
import MyTokensWholesaler from "./components/wholesaler/myTokensWholesaler";
import MyTokensFarmer from "./components/farmer/myTokensFarmer";
import SellToConsumer from "./components/retailer/sellToConsumer";
import MyTokensRetailer from "./components/retailer/myTokensRetailer";
import ConsumerData from "./components/consumer/consumerData";
function App() {

  // console.log = function(){};

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/*farmer */}
        <Route path="/create-token" element={<CreateToken />} />
        <Route path="/sell-to-wholesaler" element={<SellToWholesaler />} />
        <Route path="/my-tokens-farmer" element={<MyTokensFarmer />} />

        {/*wholesaler */}
        <Route path="/create-tokens-over-token" element={<TokensOverToken />} />
        <Route path="/sell-to-retailer" element={<SellToRetailer />} />
        <Route path="/my-tokens-wholesaler" element={<MyTokensWholesaler />} />

        {/*retailer */}
        <Route path="/sell-to-consumer" element={<SellToConsumer />} />
        <Route path="/my-tokens-retailer" element={<MyTokensRetailer />} />

        {/*consumer */}
        <Route path="/consumer" element={<ConsumerData />} />

        <Route path="/logout" element={<Logout />} />

        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
}

export default App;


{/*
- farmer
  - create token
  - sell to wholesaler
  - my tokens

- wholesaler
  - create token over token with metadata
  - my tokens
  - sell to retailer

- retailer
  - my tokens
  - sell to consumer lock token

- consumer
  - if token is lock then show data otherwise authenticate

*/}