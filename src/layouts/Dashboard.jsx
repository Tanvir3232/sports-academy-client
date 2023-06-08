import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png'
import useAuth from '../hooks/useAuth';
import { FaBook, FaCheckSquare, FaClipboard, FaGraduationCap, FaHome, FaTachometerAlt, FaUser, FaUserGraduate } from 'react-icons/fa';
const Dashboard = () => {
    const { user } = useAuth();
    const userRole = 'instructor';
    
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                {/* Page content here */}
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

                <ul className="menu p-4 w-80 h-full bg-[#1A244D] text-white">
                    {/* Sidebar content here */}
                    <img src={logo} className='w-2/3' alt="" />
                    <figure className='flex flex-col justify-center items-center py-5'>
                        <img src={user?.photoURL} className='rounded-full w-20' alt="not found" />
                        <h3>{user?.displayName}</h3>
                    </figure>
                    <div className="divider text-yellow-100 h-[1px] bg-red-100"></div>
                    {
                        userRole == 'admin'  &&
                        <div className="w-2/3 mx-auto">
                            <li><Link to='/dashboard'><FaTachometerAlt></FaTachometerAlt> My Dashboard</Link></li>

                            <li><Link to='/selected-classes'><FaClipboard></FaClipboard> Manage Classes</Link></li>
                            <li><Link to='/enrolled-classes'><FaUser></FaUser> Manage Users</Link></li>
                        </div>

                    }
                    {
                        userRole == 'instructor' &&
                        <div className="w-2/3 mx-auto">
                            <li><Link to='/dashboard'><FaTachometerAlt></FaTachometerAlt> My Dashboard</Link></li>

                            <li><Link to='/selected-classes'><FaCheckSquare></FaCheckSquare> My Classes</Link></li>
                            <li><Link to='/enrolled-classes'><FaBook></FaBook> Add a Class</Link></li>
                        </div>
                    }
                    {
                        userRole == 'student' &&
                        <div className="w-2/3 mx-auto">
                            <li><Link to='/dashboard'><FaTachometerAlt></FaTachometerAlt> My Dashboard</Link></li>

                            <li><Link to='/selected-classes'><FaCheckSquare></FaCheckSquare> My Selected Classes</Link></li>
                            <li><Link to='/enrolled-classes'><FaBook></FaBook> My Enrolled Classes</Link></li>
                        </div>
                    }
                   
                    <div className="divider text-yellow-100 h-[1px] bg-red-100"></div>
                    <div className="w-2/3 mx-auto">
                        <li><Link to='/'> <FaHome></FaHome> Home</Link></li>

                        <li><Link to='/classes'><FaGraduationCap></FaGraduationCap> Classes</Link></li>
                        <li><Link to='/instructors'><FaUserGraduate></FaUserGraduate> Instructors</Link></li>
                    </div>


                </ul>

            </div>
        </div>
    );
};

export default Dashboard;