import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useUserSecure from "../../../../hooks/useUserSecure";
import moment from "moment/moment";
import LoadingSpinner from "../../../../components/LoadingSpinner";


const PaymentHistory = () => {
    const [userSecure] = useUserSecure();
    const { user } = useAuth();
    const { data: payments = [] ,isLoading} = useQuery(['payments'], async () => {
        const res = await userSecure.get(`/payments?email=${user?.email}`);
        return res.data;
    })
  
    if(isLoading){
        return <LoadingSpinner></LoadingSpinner>
    }
    
    return (
        <div>
        <h1 className="text-3xl font-semibold ">My Payment History</h1>
        <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
                {/* head */}
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Class Name</th>
                        <th>Transaction id</th>
                        <th>Price</th>
                        <th>Date</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {
                        payments.map((classData, index) => <tr key={classData._id}>
                            <th>{index + 1}</th>
                            <td>{classData.className}</td>
                            <td>{classData.transactionId}</td>
                            <td>${classData.price}</td>
                            <td>{
                              moment(classData.date).format("DD MMM YYYY, h:mm:ss A")
                              }
                            </td>
                           
                           
                        </tr>)
                    }


                </tbody>
            </table>
        </div>
    </div>
    );
};

export default PaymentHistory;