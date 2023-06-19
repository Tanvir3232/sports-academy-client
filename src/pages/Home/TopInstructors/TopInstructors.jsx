import SectionTitle from '../../../components/SectionTitle';
import useUserSecure from '../../../hooks/useUserSecure';
import { useQuery } from '@tanstack/react-query';
import InstructorCard from './InstructorCard';
import LoadingSpinner from '../../../components/LoadingSpinner';

const TopInstructors = () => {
    const [userSecure] = useUserSecure();
    const { data: instructors = [],isLoading } = useQuery(['instructors'], async () => {
        const res = await userSecure.get('/instructors/topinstructors');
        return res.data;
    })
    if(isLoading){
        return <LoadingSpinner></LoadingSpinner>
    }
    
    return (
        <div>
           <SectionTitle title='Top Instructors'></SectionTitle>
           <div className="grid md:grid-cols-3 gap-6">
             {instructors.map(instructor=><InstructorCard
             key={instructor._id}
             instructorData={instructor}
           ></InstructorCard>)}
           </div>
        </div>
    );
};

export default TopInstructors;