import logo from '../../../assets/images/logo.png'
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';

const Header = () => {
    const {user,logOut} = useAuth();
    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => Swal.fire({
                position: 'top-middle',
                icon: 'error',
                title: `${error.message}`,
                showConfirmButton: false,
                timer: 1500
              }))
    }
    const navItems = <>
        <li><Link to="/">Home</Link></li>
        <li><Link to='/instructors'>Instructors</Link></li>
        <li><Link to='/classes'>Classes</Link></li>
        {user && <li><Link to='/dashboard'>Dashboard</Link></li>}
       
    </>
    return (
        <div className="navbar bg-[#1A244D] text-white ">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow  bg-[#1A244D] text-white rounded-box w-52">
                         {navItems}
                          
                         {user ? <><span><img className='rounded-full w-10' src={user?.photoURL} title={user?.displayName} alt="" /> <button onClick={handleLogOut} className='btn btn-error my-2'>Logout</button></span></>:
                         <li><Link to='/login' className='border-2 border-yellow-500 text-yellow-500 w-20 hover:bg-yellow-500 hover:text-gray-950 uppercase'>Sign In</Link></li>}
                    </ul>
                </div>
                <Link to=''><img src={logo} alt="" /></Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                  {navItems}
                </ul>
            </div>
            <div className="navbar-end hidden lg:flex">
            {user ? <div className='flex items-center gap-3 '> <span><img className='rounded-full w-10' src={user?.photoURL} title={user?.displayName} alt="" /> </span><button onClick={handleLogOut} className='btn btn-error my-2'>Logout</button></div>:
                         <Link to='/login' className='btn btn-outline btn-warning'>Sign In</Link>}
            </div>
        </div>
    );
};

export default Header;