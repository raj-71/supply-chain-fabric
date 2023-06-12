import { Navigate, Outlet } from "react-router-dom";
import authService from "../services/authService";

const RoleAccessProfile = ({ roles = [] }) => {
    const user = authService.getRole();
    
      return !roles.length || roles.includes(user)
        ? <Outlet />
        : <Navigate to="/404" replace />;
    // }
  };
  
export default RoleAccessProfile;