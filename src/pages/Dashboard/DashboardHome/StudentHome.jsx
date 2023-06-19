import { useQuery } from "@tanstack/react-query";
import useUserSecure from "../../../hooks/useUserSecure";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/LoadingSpinner";
import StatCard from "../../../components/StatCard";
import { FaBook, FaChalkboardTeacher, FaMoneyBillAlt } from "react-icons/fa";
import PaymentHistoryChart from "./PaymentHistoryChart";

const StudentHome = () => {
    const [userSecure] = useUserSecure();
    const { user } = useAuth();
    const { data: stats = {}, isLoading } = useQuery({
        queryKey: ['student-stats'],
        queryFn: async () => {
            const res = await userSecure(`/student-stats?email=${user.email}`);
            return res.data;
        },
    });
    const { data: paymentData = {} } = useQuery({
        queryKey: ['payment-chart'],
        queryFn: async () => {
            const res = await userSecure(`/payment-chart?email=${user.email}`);
            return res.data;
        },
    });
    
    if (isLoading) {
        return <LoadingSpinner />;
    }

    console.log(paymentData);
    return (
        <div>
            <div className="grid grid-cols-3 gap-6">
                <StatCard
                    value={stats.selectedClasses}
                    icon={<FaChalkboardTeacher className="w-8 h-8 text-white" />}
                    title="Selected Classes"
                    iconBgColor="bg-blue-500"
                />
                <StatCard
                    value={stats.enrolledClasses}
                    icon={<FaBook className="w-8 h-8 text-white" />}
                    title="Enrolled Classes"
                    iconBgColor="bg-green-500"
                />
                <StatCard
                    value={stats.totalPayment}
                    icon={<FaMoneyBillAlt className="w-8 h-8 text-white" />}
                    title="Total Payments"
                    iconBgColor="bg-yellow-500"
                />
            </div>
            <h1 className="text-2xl font-bold my-12">Payment History</h1>
            <div className="mx-auto w-[650px] my-5">
                <div className='card shadow-xl  bg-gray-200 py-5'>
                    <PaymentHistoryChart paymentData={paymentData}></PaymentHistoryChart>
                </div>
            </div>
        </div>
    );
};

export default StudentHome;
