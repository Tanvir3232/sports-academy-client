import { useQuery } from "@tanstack/react-query";
import useUserSecure from "../../hooks/useUserSecure";
import SingleInstructor from "./SingleInstructor";
import SectionTitle from "../../components/SectionTitle";
import { Helmet } from "react-helmet";

const Instructors = () => {
    const [userSecure] = useUserSecure();

    const { data: instructors = [] } = useQuery(['instructors'], async () => {
        const res = await userSecure.get(`/users?instructors=instructor`);
        return res.data;
    })
    console.log(instructors);
    return (
        <>
            <Helmet>
                <title>SportsElevate | Instructors</title>
            </Helmet>
            <SectionTitle title='Our Instructors'></SectionTitle>
            <div className="grid grid-cols-3 gap-6 ">
                {
                    instructors.map(instructor => <SingleInstructor
                        key={instructor._id}
                        instructor={instructor}
                    ></SingleInstructor>)
                }
            </div>
        </>
    );
};

export default Instructors;