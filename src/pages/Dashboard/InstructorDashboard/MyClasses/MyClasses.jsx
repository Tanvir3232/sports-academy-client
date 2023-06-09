import { useQuery } from "@tanstack/react-query";
import useUserSecure from "../../../../hooks/useUserSecure";
import {  FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const MyClasses = () => {
    const [userSecure] = useUserSecure();
    const { data: classes = [] } = useQuery(['classes'], async () => {
        const res = await userSecure.get('/classes');
        return res.data;
    })
    return (
        <div>
        <h1 className="text-3xl font-semibold ">My Classes</h1>
        <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
                {/* head */}
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Class Name</th>
                        <th>Image</th>
                        <th>Price</th>
                        <th>Seats</th>
                        <th>Status</th>
                        <th>Total Enrolled</th>
                        <th>Feedback</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        classes.map((classData, index) => <tr key={classData._id}>
                            <th>{index + 1}</th>
                            <td>{classData.name}</td>
                            <td><img className="w-24 h-20" src={classData.image} alt="" /></td>
                            <td>${classData.price}</td>
                            <td>{classData.seats}</td>
                            <td>{classData?.status?classData?.status:'pending'}</td>
                            <td>{classData?.totalEnrolled}</td>
                            <td>{classData?.feedback?classData?.feedback:'no feedback'}</td>
                            <td>
                           
                            <Link title="update class" to={`/dashboard/updateclass/${classData._id}`}  className="btn btn-outline btn-info"><FaRegEdit></FaRegEdit></Link>
                            </td>
                        </tr>)
                    }


                </tbody>
            </table>
        </div>
    </div>
    );
};

export default MyClasses;