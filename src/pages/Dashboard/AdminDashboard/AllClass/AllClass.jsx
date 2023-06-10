import { useQuery } from "@tanstack/react-query";
import useUserSecure from "../../../../hooks/useUserSecure";


const AllClass = () => {
    const [userSecure] = useUserSecure();
    const { data: classes = [] } = useQuery(['classes'], async () => {
        const res = await userSecure.get('/classes');
        return res.data;
    })
    console.log(classes);
    return (
        <div>
        <h1 className="text-3xl font-semibold ">All Classes</h1>
        <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
                {/* head */}
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Class Name</th>
                        <th>Instructor Name</th>
                        <th>Instructor Email</th>
                        <th>Image</th>
                        <th>Price</th>
                        <th>Seats</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        classes.map((classData, index) => <tr key={classData._id}>
                            <th>{index + 1}</th>
                            <td>{classData.name}</td>
                            <td>{classData.instructorName}</td>
                            <td>{classData.instructorEmail}</td>
                            <td><img className="w-24 h-20" src={classData.image} alt="" /></td>
                            <td>${classData.price}</td>
                            <td>{classData.seats}</td>
                            <td>{classData?.status?classData?.status:'pending'}</td>
                          
                            <td className="grid grid-cols-2 gap-2 ">
                           
                              <button className="btn btn-outline btn-success btn-xs ">approved</button>
                              <button className="btn btn-outline btn-error btn-xs">deny</button>
                              <button className="btn btn-outline col-span-2 btn-primary btn-xs">feedback</button>
                            </td>
                        </tr>)
                    }


                </tbody>
            </table>
        </div>
    </div>
    );
};

export default AllClass;