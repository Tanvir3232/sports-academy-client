import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useUserSecure from "../../../../hooks/useUserSecure";

const EnrolledClasses = () => {
    const [userSecure] = useUserSecure();
    const { user } = useAuth();
    const { data: selectedclasses = [] } = useQuery(['selectedclasses'], async () => {
        const res = await userSecure.get(`user/payments?email=${user.email}`);
        return res.data;
    })
    return (
        <div>
        <h1 className="text-3xl font-semibold ">My Selected Classes</h1>
        <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
                {/* head */}
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Class Name</th>
                        <th>Image</th>
                        <th>Price</th>
                      
                    </tr>
                </thead>
                <tbody>
                    {
                        selectedclasses.map((classData, index) => <tr key={classData._id}>
                            <th>{index + 1}</th>
                            <td>{classData.className}</td>
                            <td><img className="w-24 h-20" src={classData.image} alt="" /></td>
                            <td>${classData.price}</td>
                            <td>{classData.seats}</td>
                           
                        </tr>)
                    }


                </tbody>
            </table>
        </div>
    </div>
    );
};

export default EnrolledClasses;