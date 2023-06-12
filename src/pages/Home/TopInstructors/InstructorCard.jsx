

const InstructorCard = ({ instructorData }) => {
    const { instructorName, instructorImage, totalStudents, classes, _id } = instructorData;
    return (
        <div className="card   bg-base-100 shadow-xl pb-6">
            <div className="flex flex-col items-center">

                <figure className="w-40 h-40"><img src={instructorImage} className="w-full h-full rounded-full" alt="Movie" /></figure>
                <div className="card-body">
                    <h2 className="card-title text-center">{instructorName}</h2>
                    <h2 ><strong>Email:</strong> {_id}</h2>
                    <p><strong>Total Students:</strong> {totalStudents}</p>
                </div>
            </div>
            <h1 className="text-center font-bold text-xl my-5">All Classes</h1>
            {classes.map((classData, index) => <div className="flex flex-col md:flex-row px-8 justify-between " key={index}>
                <span>{classData.name}</span>
                <span>{classData.totalEnrolled}</span>
            </div>)}


        </div>
    );
};

export default InstructorCard;