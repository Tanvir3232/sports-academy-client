import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useUserSecure from "../../../hooks/useUserSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";
import StatCard from "../../../components/StatCard";
import { FaUsers, FaExclamationCircle, FaCheckCircle } from "react-icons/fa";

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
  
  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>
  }
  
  console.log(stats);
  
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
    </div>
  );
};

export default InstructorHome;
