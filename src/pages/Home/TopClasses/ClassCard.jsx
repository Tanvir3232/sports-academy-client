
const ClassCard = ({classData}) => {
    const {image,name,instructorName,seats,price} = classData;
    return (
        <div className="card  bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                <img src={image} alt="Shoes" className="rounded-xl" />
            </figure>
            <div className="card-body ml-6">
                <h2 className="card-title">{name}</h2>
                <p><strong>Seats: </strong>{seats}</p>
                <p><strong>Price: </strong>${price}</p>
                <h2 className=""><strong>Instructor Name:</strong> <span className="text-green-600">{instructorName}</span></h2>
            </div>
        
        </div>
    );
};

export default ClassCard;