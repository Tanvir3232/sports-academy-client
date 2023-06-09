
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useUserSecure from "./useUserSecure";

const useAdmin = () => {
    const {user,loading} = useAuth();
    const [userSecure] = useUserSecure();
    const {data: isAdmin, isLoading: isAdminLoading} = useQuery({
        queryKey: ['isAdmin', user?.email],
        enabled:!loading,
        queryFn: async () => {
            const res = await userSecure.get(`/users/admin/${user?.email}`);
            return res.data.admin;
        }
    })
    return [isAdmin, isAdminLoading]
}
export default useAdmin;