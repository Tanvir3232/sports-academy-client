import LoadingSpinner from "../../../components/LoadingSpinner";
import useAdmin from "../../../hooks/useAdmin";
import useInstructor from "../../../hooks/useInstructor";
import AdminHome from "./AdminHome";
import InstructorHome from "./InstructorHome";
import StudentHome from "./StudentHome";

const DashboardHome = () => {
    const [isAdmin,isAdminLoading] = useAdmin();

    const [isInstructor,isInstructorLoading] = useInstructor();
    if(isAdminLoading || isInstructorLoading){
        return <LoadingSpinner></LoadingSpinner>
    }
    console.log(isAdmin,isInstructor)
    return (
        <div>
             <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
           {isAdmin && <AdminHome></AdminHome>}
           {isInstructor && <InstructorHome></InstructorHome>}
           {(isAdmin || isInstructor) || <StudentHome></StudentHome>}
        </div> 
    );
};

export default DashboardHome;