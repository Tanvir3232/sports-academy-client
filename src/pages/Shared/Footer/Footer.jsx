import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/logo.png'
const Footer = () => {
    return (
       <footer className="footer p-10 bg-[#1A244D] flex justify-between  text-white ">
                <div>
                    <img src={logo} className='h-12' alt="" />
                    <p>Sports Academy Ltd<br />Providing reliable sports since 2000</p>

                </div>
                <div>
                    <span className="footer-title">All pages</span>
                    <Link to='/'>Home</Link>
                    <Link to='/'>Instructors</Link>
                    <Link to='/all-toy'>Classes</Link>
                    <Link to='/my-toys'>Login</Link>
                </div>
                <div>
                    <span className="footer-title">Contact Us</span>
                    <li className='list-none'>Moblie : 01732328171</li>
                    <li className='list-none'>Tel No: +880-123-4567890</li>
                    <li className='list-none'>Email: tanvirahmadstudent@gmail.com</li>
                    <li className='list-none'>Address : Golapgonj, Sylhet, BD</li>
                </div>
                <div >
                    <div className="grid grid-cols-4 gap-4">
                        <Link to='https://www.facebook.com/' ><FaFacebook className='w-10 h-8 text-blue-700' /></Link>
                        <Link to='https://www.youtube.com/' ><FaYoutube className='w-10 h-8 text-red-600' /></Link>
                        <Link to='https://www.twitter.com/' ><FaTwitter className='w-10 h-8 text-sky-600' /></Link>
                        <Link to='https://www.instagram.com/' ><FaInstagram className='w-10 h-8 text-red-400' /></Link>
                    </div>
                    <p className='text-center pb-4'>Copyright &copy; 2023 - All right reserved by Sports academy Ltd</p>
                </div>
            </footer>
  
    );
};

export default Footer;