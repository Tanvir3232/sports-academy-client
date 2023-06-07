import { Link } from 'react-router-dom';
import loginBanner from '../../assets/images/login.png'
import { useForm } from "react-hook-form";
const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    return (
        <div className="flex items-center gap-6 md:w-1/2 mx-auto">
            <figure className='md:w-1/2'>
                <img src={loginBanner} className='w-full' alt="" />
            </figure>
            <div className='w-1/2 border-2 p-2 bg-slate-700 rounded-xl text-white'>
                <h1 className='text-3xl font-semibold text-center mb-12'>Please  Sign In </h1>
                <form onSubmit={handleSubmit(onSubmit)}>


                    <div className="w-full ">
                        <input type='email' placeholder='Enter your email' className='my-input' {...register("email", { required: true })} />
                        {/* errors will return when field validation fails  */}
                        {errors.email && <span className='text-red-500'>email field is required</span>}
                    </div>
                    <div className="w-full ">
                        <input type='password' placeholder='Enter your password' className='my-input' {...register("password", { required: true })} />
                        {/* errors will return when field validation fails  */}
                        {errors.password && <span className='text-red-500'>password field is required</span>}
                    </div>

                    <br></br>
                    <input className='btn btn-success btn-block' type="submit" value="Sign In" />
                </form>
                <p className='text-center my-2'>don't have an account? <Link to='/register' className='text-blue-500'>Sign Up</Link></p>
               <hr className='mt-12' />
                <h1 className='text-center font-semibold my-3'>Continue With Social</h1>
                <div className='text-center '>
                    <button className='btn btn-circle btn-outline btn-error'>G</button>
                </div>
            </div>
        </div>
    );
};

export default Login;