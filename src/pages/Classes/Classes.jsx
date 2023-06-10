import { useQuery } from "@tanstack/react-query";
import useUserSecure from "../../hooks/useUserSecure";
import SingleClass from "./SingleClass";

const Classes = () => {
    const [userSecure] = useUserSecure();

    const { data: classes = [] } = useQuery(['classes'], async () => {
        const res = await userSecure.get('/classes?status=approved');
        return res.data;
    })
    console.log(classes);
    return (
        <div className="grid grid-cols-3 gap-6">
            {classes.map(classData=><SingleClass
             key={classData._id}
             classData={classData}
            ></SingleClass>)}
        </div>
    );
};

export default Classes;