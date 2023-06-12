import { useQuery } from "@tanstack/react-query";
import useUserSecure from "../../hooks/useUserSecure";
import SingleClass from "./SingleClass";
import LoadingSpinner from "../../components/LoadingSpinner";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import useInstructor from "../../hooks/useInstructor";

const Classes = () => {
    const [userSecure] = useUserSecure();
    const {user} = useAuth();
    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();
    let checkStudent = true;
    if(isAdmin || isInstructor){
        checkStudent = false;
    }
    const { data: classes = [],isLoading,isError } = useQuery(['classes'], async () => {
        const res = await userSecure.get('/classes?status=approved');
        return res.data;
    })
    const navigate = useNavigate();
    const location = useLocation();
    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner> 
      }
    
      if (isError) {
        return <div>Error occurred while fetching class data.</div>; 
      }
      const saveSelectedClass = classData =>{
        if(!user){
            Swal.fire({
                position: 'top-middle',
                icon: 'error',
                title: 'You must login to select the course',
                showConfirmButton: false,
                timer: 1500
              })
              navigate('/login', {state: {from: location}})
        }
        const {image,name,price,_id} = classData;
        const classInfo = {image,className:name,price,classId:_id,studentEmail:user.email};
        console.log(classInfo)
        userSecure.post('/selectedclasses', classInfo)
                .then(data => {
                  
                    if(data.data.insertedId){
                        
                        Swal.fire({
                            position: 'top-middle',
                            icon: 'success',
                            title: 'Class selected successfully',
                            showConfirmButton: false,
                            timer: 1500
                          })
                    }
                })
      }
    return (
        <div className="grid grid-cols-3 gap-6">
            {classes.map(classData=><SingleClass
             key={classData._id}
             classData={classData}
             saveSelectedClass={saveSelectedClass}
             checkStudent = {checkStudent}
            ></SingleClass>)}
        </div>
    );
};

export default Classes;