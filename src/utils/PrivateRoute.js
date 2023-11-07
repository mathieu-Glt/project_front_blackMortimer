import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoutes() {

    const authentication = localStorage.getItem('access_token')

    return authentication ? <Outlet/> : <Navigate to ='/login' />
}
