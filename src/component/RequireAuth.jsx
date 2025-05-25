import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function RequireAuth({ myRoles }) {
    const {isLogin , role } = useSelector(state => state.auth)

     if (isLogin) {        
        if (myRoles.find(el=>el === role)) {
            return <Outlet />
        }else{
            return <Navigate to="/*" />
        }
    }else{
        return <Navigate to="/login" />
    }

}