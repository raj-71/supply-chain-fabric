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
import MyTokens from "./components/farmer/myTokens";
import SellToRetailer from "./components/wholesaler/sellToRetailer";
import TokensOverToken from "./components/wholesaler/tokensOverToken";
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
        <Route path="/my-tokens" element={<MyTokens />} />

        {/*wholesaler */}
        <Route path="/create-tokens-over-token" element={<TokensOverToken />} />
        <Route path="/sell-to-retailer" element={<SellToRetailer />} />

        {/*retailer */}
        <Route path="/sell-to-consumer" element={<Dashboard />} />

        {/*consumer */}
        <Route path="/token-data" element={<Dashboard />} />

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