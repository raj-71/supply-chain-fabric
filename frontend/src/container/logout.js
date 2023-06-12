import { useEffect } from "react";
import Loader from "../common/loader";
import authService from "../services/authService";

const Logout = () => {
    
    const logout = async () => {
        let isLogout = await authService.logout();
        
        window.location = '/';
    }

    useEffect(() => {
        logout();
    }, []);
    
    return(
        <div className="mt-5 flex justify-center">
            <Loader/>
        </div>
    )
}

export default Logout;