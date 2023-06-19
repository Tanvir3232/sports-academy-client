import { Link, useLocation, useNavigate } from 'react-router-dom';
import loginBanner from '../../assets/images/login.png'
import { useForm } from "react-hook-form";
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const {signIn, signInWithGoogle} = useAuth();
    const [hidePassword, setHidePassword] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleSignInWithGoogle = (event) =>{
        event.preventDefault();
        signInWithGoogle()
        .then(res=>{
            const loggedUser = res.user;
            console.log(loggedUser);
            navigate(from, { replace: true });
            const userInfo = {name:loggedUser.displayName,email:loggedUser.email,photo:loggedUser.photoURL};
            fetch(`http://localhost:5000/users`,{
              method:"POST",
              headers:{
                  'content-type':'application/json'
              },
              body: JSON.stringify(userInfo)
            })
            .then(res=>res.json())
            .then(insertData=>{
             
              if(insertData.insertedId){
                 
                  Swal.fire({
                      position: 'top-middle',
                      icon: 'success',
                      title: 'your sign up successfully done',
                      showConfirmButton: false,
                      timer: 1500
                  })
                 
              }
            })
        })
        .catch(error=>{
            Swal.fire({
                position: 'top-middle',
                icon: 'error',
                title: `${error.message}`,
                showConfirmButton: false,
                timer: 1500
              })
        })
    }
    const onSubmit = data => {
        console.log(data);
        signIn(data.email,data.password)
        .then(result=>{
            const loggedUser = result.user;
            console.log(loggedUser);
            navigate(from, { replace: true });

        })
        .catch((error)=>{
            Swal.fire({
                position: 'top-middle',
                icon: 'error',
                title: `${error.message}`,
                showConfirmButton: false,
                timer: 1500
              })
        })
    };

    return (
        <div className="flex flex-col md:flex-row items-center gap-6 md:w-1/2 mx-auto">
            <figure className='md:w-1/2'>
                <img src={loginBanner} className='w-full' alt="" />
            </figure>
            <div className='md:w-1/2 border-2 p-2 bg-slate-700 rounded-xl text-white'>
                <h1 className='text-3xl font-semibold text-center mb-12'>Please  Sign In </h1>
                <form onSubmit={handleSubmit(onSubmit)}>


                    <div className="w-full ">
                        <input type='email' placeholder='Enter your email' className='my-input' {...register("email", { required: true })} />
                        {/* errors will return when field validation fails  */}
                        {errors.email && <span className='text-red-500'>email field is required</span>}
                    </div>
                    <div className="w-full relative">
                        <input type={hidePassword ? 'password' : 'text'} placeholder='Enter your password' className='my-input' {...register("password", { required: true })} />
                        {/* errors will return when field validation fails  */}
                        {errors.password && <span className='text-red-500'>password field is required</span>}
                        <div className=' absolute right-0 -mt-8 cursor-pointer' onClick={() => setHidePassword(!hidePassword)}>
                            {hidePassword ? <FaEyeSlash ></FaEyeSlash> : <FaEye ></FaEye>}
                        </div>

                    </div>

                    <br></br>
                    <input className='btn btn-success btn-block' type="submit" value="Sign In" />
                </form>
                <p className='text-center my-2'>don't have an account? <Link to='/register' className='text-blue-500'>Sign Up</Link></p>
               <hr className='mt-12' />
                <h1 className='text-center font-semibold my-3'>Continue With Social</h1>
                <div className='text-center '>
                    <button onClick={handleSignInWithGoogle} className='btn btn-circle btn-outline btn-error'>G</button>
                </div>
            </div>
        </div>
    );
};

export default Login;