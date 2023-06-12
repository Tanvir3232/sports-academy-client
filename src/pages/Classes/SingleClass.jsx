

const SingleClass = ({classData,saveSelectedClass,checkStudent}) => {
    const {image,name,instructorName,seats,price} = classData;
    console.log(seats)
    return (
        <div className={`card ${seats>0?'bg-base-100':'bg-red-400'} shadow-xl`}>
            <figure className="h-64"><img src={image} className="w-full h-full" alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p className={seats==0?'text-white text-xl':''}><strong>Available Seats: </strong> {seats}</p>
                <p><strong>Price: </strong> {price}</p>
                <p><strong>Instructor Name: </strong> {instructorName}</p>
               
                    <button disabled={!checkStudent} onClick={()=>saveSelectedClass(classData)} className="btn btn-warning btn-block">Select Class</button>
                
            </div>
        </div>
    );
};

export default SingleClass;