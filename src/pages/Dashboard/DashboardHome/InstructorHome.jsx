import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useUserSecure from "../../../hooks/useUserSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";
import StatCard from "../../../components/StatCard";
import { FaUsers, FaExclamationCircle, FaCheckCircle } from "react-icons/fa";
import BarContainer from "../../../components/BarContainer";
import PieContainer from "../../../components/PieContainer";

const InstructorHome = () => {
  const [userSecure] = useUserSecure();
  const { user } = useAuth();
  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ['instructor-stats'],
    queryFn: async () => {
      const res = await userSecure(`/instructor-stats?email=${user.email}`);
      return res.data;
    },
  });
  const { data: pieData = {} } = useQuery({
    queryKey: ['class-students'],
    queryFn: async () => {
      const res = await userSecure(`/class-students?email=${user.email}`);
      return res.data;
    },
  });
  const { data: barData = {} } = useQuery({
    queryKey: ['instructor-earnings'],
    queryFn: async () => {
      const res = await userSecure(`/instructor-earnings?instructorEmail=${user.email}`);
      return res.data;
    },
  });
  console.log(barData);
  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>
  }



  return (
    <div>
      <div className="grid grid-cols-3 gap-6">
        <StatCard
          value={stats.totalStudents}
          icon={<FaUsers className='w-8 h-8 text-white'></FaUsers>}
          title="Total Students"
          iconBgColor="bg-blue-500"
        />
        <StatCard
          value={stats.pendingClasses}
          icon={<FaExclamationCircle className='w-8 h-8 text-white'></FaExclamationCircle>}
          title="Pending Classes"
          iconBgColor="bg-yellow-500"
        />
        <StatCard
          value={stats.totalApprovedClasses}
          icon={<FaCheckCircle className='w-8 h-8 text-white'></FaCheckCircle>}
          title="Approved Classes"
          iconBgColor="bg-green-500"
        />
      </div>

      <div className='flex gap-6 mt-8'>
        
         
          <div className='card shadow-xl  bg-gray-200'>
          <h1 className="text-2xl p-5 font-semibold  "> Class Enrollment Distribution</h1>
            <PieContainer pieData={pieData} dataKey='totalEnrolled' nameKey='name' ></PieContainer>
          </div>
      
        
          <div className='card shadow-xl  bg-gray-200'>
          <h1 className="text-2xl p-5 font-semibold  ">  Revenue by Instructor</h1>
            <BarContainer barData={barData} xLabel='name' yValue='earnings'></BarContainer>
          </div>
        </div>
      
    </div>
  );
};

export default InstructorHome;
