

const SingleInstructor = ({instructor}) => {
    const {name, email,photo} = instructor;
    return (
        <div className="card  bg-base-100 shadow-xl">
            <figure className="px-10 h-72  pt-10">
                <img src={photo} alt="Shoes" className="rounded-xl w-full h-full" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{name}</h2>
                <p>Email: {email}</p>
               
            </div>
        </div>
    );
};

export default SingleInstructor;