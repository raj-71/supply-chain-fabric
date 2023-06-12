// import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import authService from "../services/authService";

const RoleAccess = ({ roles = [] }) => {
  
  const user = authService.getRole("orgName");

  return !roles.length || roles.includes(user) ? (
    <Outlet />
  ) : (
    <Navigate to="/404" replace />
  );
};

export default RoleAccess;
