
import Footer from '../pages/Shared/Footer/Footer';
import Header from '../pages/Shared/Header/Header';
import { Outlet } from 'react-router-dom';

const Main = () => {
    
    return (
        <div>
            <Header></Header>
            <div className='min-h-[calc(100vh-190px)] md:mx-12 mx-3 my-5'>
                <Outlet></Outlet>
             </div>
            <Footer></Footer>
        </div>
    );
};

export default Main;