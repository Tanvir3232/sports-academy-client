import { Link, Outlet } from 'react-router-dom';
import logo from '../assets/images/logo.png'
import useAuth from '../hooks/useAuth';
import { FaBook, FaCheckSquare, FaClipboard, FaGraduationCap, FaHome, FaMoneyCheckAlt, FaPlus, FaTachometerAlt, FaUser, FaUserGraduate } from 'react-icons/fa';
import useAdmin from '../hooks/useAdmin';
import useInstructor from '../hooks/useInstructor';
const Dashboard = () => {
    const { user } = useAuth();
    const [isAdmin] = useAdmin();
    console.log('from admin',isAdmin);
    const [isInstructor] = useInstructor();
    console.log('from instructor',isInstructor);
    let userRole;
    if(isAdmin){
        userRole = 'admin';
    }else if(isInstructor){
        userRole = 'instructor';
    }else{
        userRole = 'student';
    }
    
    
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col p-5">
                {/* Page content here */}
                <Outlet></Outlet>
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

                <ul className="menu p-4 w-80 h-full bg-[#1A244D] text-white">
                    {/* Sidebar content here */}
                    <img src={logo} className='w-2/3' alt="" />
                    <figure className='flex flex-col justify-center items-center py-5'>
                        <img src={user?.photoURL} className='rounded-full w-20 h-20' alt="not found" />
                        <h3>{user?.displayName}</h3>
                    </figure>
                    <div className="divider text-yellow-100 h-[1px] bg-red-100"></div>
                    {
                        userRole == 'admin'  &&
                        <div className="w-2/3 mx-auto">
                            <li><Link to='/dashboard'><FaTachometerAlt></FaTachometerAlt> My Dashboard</Link></li>

                            <li><Link to='/dashboard/allclasses'><FaClipboard></FaClipboard> Manage Classes</Link></li>
                            <li><Link to='/dashboard/users'><FaUser></FaUser> Manage Users</Link></li>
                        </div>

                    }
                    {
                        userRole == 'instructor' &&
                        <div className="w-2/3 mx-auto">
                            <li><Link to='/dashboard'><FaTachometerAlt></FaTachometerAlt> My Dashboard</Link></li>

                            <li><Link to='/dashboard/myclasses'><FaCheckSquare></FaCheckSquare> My Classes</Link></li>
                            <li><Link to='/dashboard/addclass'><FaPlus></FaPlus> Add a Class</Link></li>
                        </div>
                    }
                    {
                        userRole == 'student' &&
                        <div className="w-2/3 mx-auto">
                            <li><Link to='/dashboard'><FaTachometerAlt></FaTachometerAlt> My Dashboard</Link></li>

                            <li><Link to='/dashboard/selectedClasses'><FaCheckSquare></FaCheckSquare> My Selected Classes</Link></li>
                            <li><Link to='/dashboard/enrolledClasses'><FaBook></FaBook> My Enrolled Classes</Link></li>
                            <li><Link to='/dashboard/paymenthistory'><FaMoneyCheckAlt></FaMoneyCheckAlt> My Payment history</Link></li>
                          
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