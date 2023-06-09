import { useQuery } from "@tanstack/react-query";
import useUserSecure from "../../../../hooks/useUserSecure";
import { FaTrashAlt, FaUserShield } from "react-icons/fa";
import Swal from "sweetalert2";

const AllUser = () => {
    const [userSecure] = useUserSecure();
    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await userSecure.get('/users');
        return res.data;
    })
    const handleMakeAdmin = user => {
        console.log(user)
    }
    const handleMakeInstructor = user => {
        console.log(user)
    }
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
               userSecure.delete(`/users/${id}`)
               .then(res=>{
                  console.log('deleted res',res.data);
                  if(res.data.deletedCount > 0){
                    refetch();
                    Swal.fire(
                        'Deleted!',
                        'User has been deleted successfully.',
                        'success'
                    )
                  }
               })
            }
        })
    }
    return (
        <div>
            <h1 className="text-3xl font-semibold ">Manage Users</h1>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.role === 'admin' ? <div className="font-bold text-green-600">admin</div> :
                                    <div className="flex items-center justify-between">
                                        <h6 className="font-bold ">{user.role}</h6>
                                        <div className="flex flex-col gap-2">
                                        <button onClick={() => handleMakeAdmin(user)} className="btn btn-xs mr-2 w-36 btn-outline">make Admin</button>
                                        <button onClick={() => handleMakeInstructor(user)} className="btn btn-xs w-36  btn-warning btn-outline">make Instructor</button>
                                        </div>
                                    </div>
                                        
                                    }
                                </td>

                                <td><button onClick={() => handleDelete(user._id)} className="btn btn-outline btn-error"><FaTrashAlt></FaTrashAlt></button></td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUser;