
import { FaExclamationCircle } from 'react-icons/fa';
import errorLogo from '../../assets/images/error.png';

import { Link, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
    let errorData = useRouteError();
    const { error, status } = errorData;

    return (
        <div className='mx-auto text-center shadow-2xl  w-64 md:w-96 my-20 md:my-60' >
            <div className="hero w-full " style={{ backgroundImage: `url(${errorLogo})` }}>
                <div className="hero-overlay bg-opacity-80"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <figure className='mx-auto w-10 md:w-32'>
                            <FaExclamationCircle  className='md:w-32 md:h-28 h-10 w-10 rounded-full text-red-500'></FaExclamationCircle>
                            
                        </figure>
                        <h1 className="mb-5 text-5xl font-bold">{status}</h1>
                        <p className="mb-5">{error.message}</p>
                        <Link to='/'>  <button className='btn btn-outline btn-success mt-3'>Back to Home</button></Link>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ErrorPage;