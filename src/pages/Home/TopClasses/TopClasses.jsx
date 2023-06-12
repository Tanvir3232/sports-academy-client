import { useQuery } from "@tanstack/react-query";
import useUserSecure from "../../../hooks/useUserSecure";

import ClassCard from "./ClassCard";
import SectionTitle from "../../../components/SectionTitle";

const TopClasses = () => {
    const [userSecure] = useUserSecure();
    const { data: classes = [] } = useQuery(['classes'], async () => {
        const res = await userSecure.get('/classes/topclasses');
        return res.data;
    })
    return (
        <>
            <SectionTitle title='Top Classes'></SectionTitle>
            <div className="grid grid-cols-3 gap-6">
                {classes.map(classData => <ClassCard
                    key={classData._id}
                    classData={classData}
                ></ClassCard>)}
            </div>
        </>
    );
};

export default TopClasses;