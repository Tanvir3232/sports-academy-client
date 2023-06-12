import { useQuery } from "@tanstack/react-query";
import useUserSecure from "../../../../hooks/useUserSecure";
import Swal from "sweetalert2";
import { useState } from "react";



const AllClass = () => {
    const [userSecure] = useUserSecure();
    const [classDataModal, setClassDataModal] = useState(null);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const { data: classes = [], refetch } = useQuery(['classes'], async () => {
        const res = await userSecure.get('/classes');
        return res.data;
    })
    const handleApprove = classData => {
        console.log(classData)
        userSecure.patch(`/classes/approve/${classData._id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
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
        setClassDataModal(classData)
        userSecure.patch(`/classes/disapprove/${classData._id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
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
    const handleFeedback = (classData) => {
        console.log(classData);
        setClassDataModal(classData)
        window.my_modal_5.showModal();
    };
    const handleSendFeedback = (classData) => {
        const message = feedbackMessage; // Assuming you have the feedback message stored in the `feedbackMessage` variable
      
        if (!classData._id || !message) {
          console.log('Invalid request');
          return;
        }
      
        const classId = classData._id;
      
        userSecure
          .patch(`/classes/feedback/${classId}`, { message: message })
          .then((res) => {
            console.log(res.data);
            if (res.data) {
              Swal.fire({
                position: 'top-middle',
                icon: 'success',
                title: `${classData.instructorName} class feedback has been successfully send!`,
                showConfirmButton: false,
                timer: 1500,
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      };
      
      
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
                                <td className={`${classData.status == 'approved' ? 'text-green-500' : ''} ${classData.status == 'denied' ? 'text-red-500' : ''} font-bold`}>{classData.status}</td>

                                <td className="flex flex-col gap-2 ">

                                    <button disabled={classData.status == 'approved' || classData.status == 'denied'} onClick={() => handleApprove(classData)} className="btn  btn-success btn-xs ">approved</button>
                                    <button disabled={classData.status == 'approved' || classData.status == 'denied'} onClick={() => handleDisapprove(classData)} className="btn  btn-error btn-xs">deny</button>
                                    <button
                                        onClick={() => handleFeedback(classData)}
                                        className="btn btn-outline col-span-2 btn-primary btn-xs"
                                    >
                                        Feedback
                                    </button>
                                </td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <form method="dialog" className="modal-box">
                    <div className="flex flex-col items-center justify-between">
                        <h3 className="font-bold text-lg">Feedback Class </h3>
                        {classDataModal && (
                            <p className="font-medium text-xl my-5">
                                Selected Class: {classDataModal.name}
                            </p>
                        )}
                    </div>

                    <textarea 
                    className="textarea textarea-primary w-full h-40" placeholder="write message"
                    value={feedbackMessage}
                    onChange={(e) => setFeedbackMessage(e.target.value)}
                    ></textarea>
                    <div className="modal-action">
                        
                        <button className="btn btn-error btn-outline">Close</button>
                        <button onClick={()=>handleSendFeedback(classDataModal)}  className="btn btn-primary btn-outline">Send Feedback</button>
                    </div>
                </form>
            </dialog>
        </div>
    );
};

export default AllClass;