import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import AccessDenidePage from "../Pages/AccessDenide";

export default function RequireAuth({ myRoles }) {
    const {isLogin , role } = useSelector(state => state.auth)

     if (isLogin) {        
        if (myRoles.find(el=>el === role)) {
            return <Outlet />
        }else{
            return <Navigate to={<AccessDenidePage />} />
        }
    }else{
        return <Navigate to="/login" />
    }

}