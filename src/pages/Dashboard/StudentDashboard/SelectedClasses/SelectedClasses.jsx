import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useUserSecure from "../../../../hooks/useUserSecure";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const SelectedClasses = () => {
    const [userSecure] = useUserSecure();
    const { user } = useAuth();
    const { data: selectedclasses = [], refetch } = useQuery(['selectedclasses'], async () => {
        const res = await userSecure.get(`/selectedclasses?email=${user.email}`);
        return res.data;
    })
    
    const handleDelete = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                userSecure.delete(`/selectedclasses/${id}`)
                    .then(res => {
                        console.log('deleted res', res.data);
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                'class has been deleted successfully.',
                                'success'
                            )
                        }
                    })
            }
        })
    }
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
                          
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            selectedclasses.map((classData, index) => <tr key={classData._id}>
                                <th>{index + 1}</th>
                                <td>{classData.className}</td>
                                <td><img className="w-24 h-20" src={classData.image} alt="" /></td>
                                <td>${classData.price}</td>
                              
                                <td >
                                    <div className="flex items-center">

                                        <button onClick={() => handleDelete(classData._id)} className="btn btn-outline mr-2 btn-error"><FaTrashAlt></FaTrashAlt></button>
                                        <Link to={`/dashboard/payment/${classData._id}`} className="btn btn-outline btn-success">Pay</Link>
                                    </div>
                                </td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SelectedClasses;