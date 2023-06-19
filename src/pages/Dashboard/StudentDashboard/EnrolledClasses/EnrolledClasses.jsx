import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useUserSecure from "../../../../hooks/useUserSecure";
import LoadingSpinner from "../../../../components/LoadingSpinner";


const EnrolledClasses = () => {
    const [userSecure] = useUserSecure();
    const { user } = useAuth();
    const { data: enrolledclasses = [] ,isLoading} = useQuery(['enrolledclasses'], async () => {
        const res = await userSecure.get(`user/enrolledclasses?email=${user?.email}`);
        return res.data;
    })
    if(isLoading){
        return <LoadingSpinner></LoadingSpinner>
    }
    
    return (
        <div>
        <h1 className="text-3xl font-semibold ">My Enrolled Classes</h1>
        <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
                {/* head */}
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Class Name</th>
                        <th>Image</th>
                        <th>Price</th>
                        <th>Instructor Name</th>
                       
                    </tr>
                </thead>
                <tbody>
                    {
                        enrolledclasses.map((classData, index) => <tr key={classData._id}>
                            <th>{index + 1}</th>
                            <td>{classData.name}</td>
                            <td><img src={classData.image} className="w-60 h-40" alt="" /></td>
                            <td>${classData.price}</td>
                            <td className="text-green-500 font-medium">{classData.instructorName}</td>
                           
                           
                        </tr>)
                    }


                </tbody>
            </table>
        </div>
    </div>
    );
};

export default EnrolledClasses;