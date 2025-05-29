import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";


export default function RequireAuth({ myRoles }) {
    const {isLogin , role } = useSelector(state => state.auth)

    
     if (isLogin) {        
        if (myRoles.includes(role)) {
            return <Outlet />
        }else{
            return <Navigate to='/access_denide' />
        }
    }else{
        return <Navigate to="/login" />
    }

}