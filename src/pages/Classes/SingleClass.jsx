
const SingleClass = ({classData,saveSelectedClass}) => {
    const {image,name,instructorName,seats,price} = classData;
    return (
        <div className="card  bg-base-100 shadow-xl">
            <figure className="h-64"><img src={image} className="w-full h-full" alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p><strong>Available Seats: </strong> {seats}</p>
                <p><strong>Price: </strong> {price}</p>
                <p><strong>Instructor Name: </strong> {instructorName}</p>
               
                    <button onClick={()=>saveSelectedClass(classData)} className="btn btn-primary btn-outline btn-block">Select Class</button>
                
            </div>
        </div>
    );
};

export default SingleClass;