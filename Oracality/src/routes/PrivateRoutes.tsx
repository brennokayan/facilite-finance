import {Navigate, Outlet} from 'react-router-dom';
import { isLogged } from '../utils/login';
export const PrivateRoutes = () => {
    return(
        isLogged() ? <Outlet/> : <Navigate to='/welcome'/>
    )
}