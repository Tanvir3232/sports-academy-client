
import useAuth from './useAuth';
import useUserSecure from './useUserSecure';
import { useQuery } from '@tanstack/react-query';

const useInstructor = () => {
    const {user,loading} = useAuth();
    const [userSecure] = useUserSecure();
    const {data: isInstructor, isLoading: isInstructorLoading} = useQuery({
        queryKey: ['isInstructor', user?.email],
        enabled:!loading,
        queryFn: async () => {
            const res = await userSecure.get(`/users/instructor/${user?.email}`);
            return res.data.instructor;
        }
    })
    return [isInstructor, isInstructorLoading]
};

export default useInstructor;