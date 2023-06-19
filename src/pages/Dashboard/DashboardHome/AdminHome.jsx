import { FaUsers, FaBookOpen, FaDollarSign, FaCheckCircle } from 'react-icons/fa';
import StatCard from '../../../components/StatCard';
import useUserSecure from '../../../hooks/useUserSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../components/LoadingSpinner';
import PieContainer from '../../../components/PieContainer';
import BarContainer from '../../../components/BarContainer';



const AdminHome = () => {
    const [userSecure] = useUserSecure();
    const { data: stats = {}, isLoading } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await userSecure('/admin-stats')
            return res.data;
        }
    })
    const { data: chartData = [] } = useQuery({
        queryKey: ['user-role-distribution'],
        queryFn: async () => {
            const res = await userSecure('/user-role-distribution')
            return res.data;
        }
    });
    const { data: barData = [] } = useQuery({
        queryKey: ['monthly-payments'],
        queryFn: async () => {
            const res = await userSecure('/monthly-payments')
            return res.data;
           
        }
    });
    console.log(barData)
  
    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    console.log(stats)
    return (
        <div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <StatCard
                    value={stats.users}
                    icon={<FaUsers className='w-8 h-8 text-white'></FaUsers>}
                    title="Total Users"
                    iconBgColor="bg-blue-500"
                />
                <StatCard
                    value={stats.payments}
                    icon={<FaDollarSign className='w-8 h-8 text-white'></FaDollarSign>}
                    title="Successfull Payments"
                    iconBgColor="bg-green-500"
                />
                <StatCard
                    value={stats.approvedClasses}
                    icon={<FaCheckCircle className='w-8 h-8 text-white'></FaCheckCircle>}
                    title="Approved Classes"
                    iconBgColor="bg-yellow-500"
                />
                <StatCard
                    value={stats.classes}
                    icon={<FaBookOpen className='w-8 h-8 text-white'></FaBookOpen>}
                    title="Total Classes"
                    iconBgColor="bg-red-500"
                />
            </div>
            <div className='flex gap-6 my-5'>
                <div className='card shadow-xl  bg-gray-200'>
                    <PieContainer pieData={chartData}></PieContainer>
                </div>
                <div className='card shadow-xl  bg-gray-200'>
                    <BarContainer barData={barData}></BarContainer>
                </div>

            </div>
        </div>
    );
};

export default AdminHome;
