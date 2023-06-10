import { useQuery } from "@tanstack/react-query";
import useUserSecure from "../../hooks/useUserSecure";
import SingleClass from "./SingleClass";
import LoadingSpinner from "../../components/LoadingSpinner";

const Classes = () => {
    const [userSecure] = useUserSecure();

    const { data: classes = [],isLoading,isError } = useQuery(['classes'], async () => {
        const res = await userSecure.get('/classes?status=approved');
        return res.data;
    })
    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner> 
      }
    
      if (isError) {
        return <div>Error occurred while fetching class data.</div>; 
      }
    console.log(classes);
    return (
        <div className="grid grid-cols-3 gap-6">
            {classes.map(classData=><SingleClass
             key={classData._id}
             classData={classData}
            ></SingleClass>)}
        </div>
    );
};

export default Classes;