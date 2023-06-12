import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";
import LoadingSpinner from "../components/LoadingSpinner";


const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if(loading || isAdminLoading){
        return <LoadingSpinner></LoadingSpinner>
    }

    if (user && isAdmin) {
        return children;
    }
    return <Navigate to="/login" state={{from: location}} replace></Navigate>
};

export default AdminRoute;