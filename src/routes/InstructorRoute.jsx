import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import useInstructor from "../hooks/useInstructor";
import LoadingSpinner from "../components/LoadingSpinner";


const InstructorRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isInstructor, isInstructorLoading] = useInstructor();
    const location = useLocation();

    if(loading || isInstructorLoading){
        return <LoadingSpinner></LoadingSpinner>
    }

    if (user && isInstructor) {
        return children;
    }
    return <Navigate to="/login" state={{from: location}} replace></Navigate>
};

export default InstructorRoute;