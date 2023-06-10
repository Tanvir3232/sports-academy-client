import { useQuery } from "@tanstack/react-query";
import useUserSecure from "../../../../hooks/useUserSecure";
import Swal from "sweetalert2";


const AllClass = () => {
    const [userSecure] = useUserSecure();
    const { data: classes = [],refetch } = useQuery(['classes'], async () => {
        const res = await userSecure.get('/classes');
        return res.data;
    })
    const handleApprove = classData => {
        console.log(classData)
        userSecure.patch(`/classes/approve/${classData._id}`)
        .then(res => {
            console.log(res.data)
            if(res.data.modifiedCount>0){
                refetch();
                Swal.fire({
                    position: 'top-middle',
                    icon: 'success',
                    title: `${classData.instructorName} class has been successfully Approved!`,
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        })
    }
    const handleDisapprove = classData => {
        console.log(classData)
        userSecure.patch(`/classes/disapprove/${classData._id}`)
        .then(res => {
            console.log(res.data)
            if(res.data.modifiedCount>0){
                refetch();
                Swal.fire({
                    position: 'top-middle',
                    icon: 'success',
                    title: `${classData.instructorName} class has been successfully Denied!`,
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        })
    }
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
                            <td className={`${classData.status=='approved'?'text-green-500':''} ${classData.status=='denied'?'text-red-500':''} font-bold`}>{classData.status}</td>
                          
                            <td className="grid grid-cols-2 gap-2 ">
                           
                              <button disabled={classData.status=='approved' || classData.status=='denied'} onClick={()=>handleApprove(classData)} className="btn btn-outline btn-success btn-xs ">approved</button>
                              <button  disabled={classData.status=='approved' || classData.status=='denied'}  onClick={()=>handleDisapprove(classData)} className="btn btn-outline btn-error btn-xs">deny</button>
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