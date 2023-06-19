import { useQuery } from "@tanstack/react-query";
import useUserSecure from "../../../hooks/useUserSecure";

import ClassCard from "./ClassCard";
import SectionTitle from "../../../components/SectionTitle";
import LoadingSpinner from "../../../components/LoadingSpinner";

const TopClasses = () => {
    const [userSecure] = useUserSecure();
    const { data: classes = [],isLoading } = useQuery(['classes'], async () => {
        const res = await userSecure.get('/classes/topclasses');
        return res.data;
    })
    if(isLoading){
        return <LoadingSpinner></LoadingSpinner>
    }
    
    return (
        <>
            <SectionTitle title='Top Classes'></SectionTitle>
            <div className="grid md:grid-cols-3 gap-6">
                {classes.map(classData => <ClassCard
                    key={classData._id}
                    classData={classData}
                ></ClassCard>)}
            </div>
        </>
    );
};

export default TopClasses;