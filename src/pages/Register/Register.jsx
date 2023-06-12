import Swal from 'sweetalert2';
import registerBanner from '../../assets/images/register.png'
import { useForm } from "react-hook-form";

import useAuth from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
const Register = () => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const { signUp, saveProfile } = useAuth();
    const [hidePassword, setHidePassword] = useState(true);
    const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
    const navigate = useNavigate();
    const onSubmit = data => {
        console.log(data);
        if (data.password !== data.cpassword) {
            Swal.fire({
                position: 'top-middle',
                icon: 'error',
                title: 'password and confirm password didnot match',
                showConfirmButton: false,
                timer: 1500
            })
        }
        else {
            signUp(data.email, data.password)
                .then(res => {
                    const loggedUser = res.user;
                    saveProfile(data.name, data.photo)
                        .then(() => {
                          const userInfo = {name:data.name,email:data.email,photo:data.photo};
                          fetch(`https://sports-academy-server-rouge.vercel.app/users`,{
                            method:"POST",
                            headers:{
                                'content-type':'application/json'
                            },
                            body: JSON.stringify(userInfo)
                          })
                          .then(res=>res.json())
                          .then(insertData=>{
                            console.log(insertData);
                            if(insertData.insertedId){
                               
                                console.log(loggedUser);
                                Swal.fire({
                                    position: 'top-middle',
                                    icon: 'success',
                                    title: 'your sign up successfully done',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                                reset();
                                navigate('/');
                            }
                          })

                         })
                        .catch(error => {
                            Swal.fire({
                                position: 'top-middle',
                                icon: 'error',
                                title: `${error.message}`,
                                showConfirmButton: false,
                                timer: 1500
                            })
                        })
                   

                })
                .catch(error => {
                    Swal.fire({
                        position: 'top-middle',
                        icon: 'error',
                        title: `${error.message}`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
        }
    };

    return (
        <div className="flex flex-col md:flex-row items-center gap-6 md:w-1/2 mx-auto">
            <figure className='md:w-1/2'>
                <img src={registerBanner} className='w-full' alt="" />
            </figure>
            <div className='md:w-1/2 border-2 p-2 bg-slate-700 rounded-xl text-white'>
                <h1 className='text-3xl font-semibold text-center mb-12'>Sign Up </h1>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className='w-full '>
                        <input type='text' placeholder='Enter your name' className=' my-input' {...register("name", { required: true })} />
                        {errors.name && <span>name field is required</span>}
                    </div>

                    <div className="w-full ">
                        <input type='email' placeholder='your email' className=' my-input' {...register("email", { required: true })} />
                        {/* errors will return when field validation fails  */}
                        {errors.email && <span className='text-red-500'>email field is required</span>}
                    </div>
                    <div className="w-full ">
                        <input type='url' placeholder='photo url' className=' my-input' {...register("photo", { required: true })} />
                        {/* errors will return when field validation fails  */}
                        {errors.photo && <span className='text-red-500'>photo url field is required</span>}
                    </div>

                    <div className="w-full relative ">
                        <input type={hidePassword ? 'password' : 'text'} placeholder='password' className=' my-input' {...register("password", {
                            required: true,
                            minLength: 6,
                            pattern: /(?=.*[A-Z])(?=.*[!@#$&*])/
                        })} />
                        {/* errors will return when field validation fails  */}
                        {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                        {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                        {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase and one special character.</p>}
                        <div className=' absolute right-0 -mt-8 cursor-pointer' onClick={() => setHidePassword(!hidePassword)}>
                            {hidePassword ? <FaEyeSlash ></FaEyeSlash> : <FaEye ></FaEye>}
                        </div>


                    </div>
                    <div className="w-full relative ">
                        <input type={hideConfirmPassword ? 'password' : 'text'} placeholder='confirm password' className=' my-input' {...register("cpassword", {
                            required: true,
                            minLength: 6,
                            pattern: /(?=.*[A-Z])(?=.*[!@#$&*])/
                        })} />
                        {/* errors will return when field validation fails  */}
                        {errors.cpassword?.type === 'required' && <p className="text-red-600">confirm Password is required</p>}
                        {errors.cpassword?.type === 'minLength' && <p className="text-red-600">confirm Password must be 6 characters</p>}
                        {errors.cpassword?.type === 'pattern' && <p className="text-red-600">confirm Password must have one Uppercase and one special character.</p>}
                         <div className=' absolute right-0 -mt-8 cursor-pointer' onClick={()=>setHideConfirmPassword(!hideConfirmPassword)}>
                            {
                                hideConfirmPassword?<FaEyeSlash></FaEyeSlash>:<FaEye></FaEye>
                            }
                         </div>
                    </div>

                    <br></br>
                    <input className='btn btn-primary btn-block' type="submit" value="Sign Up" />
                </form>
                <p className='mt-5 text-center'>Already have an account? <Link to='/login' className='text-green-500'>Sign In</Link></p>
            </div>
        </div>
    );
};

export default Register;