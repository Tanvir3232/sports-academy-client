import Swal from 'sweetalert2';
import registerBanner from '../../assets/images/register.png'
import { useForm } from "react-hook-form";

import useAuth from '../../hooks/useAuth';
const Register = () => {
    const { register,reset, handleSubmit, formState: { errors } } = useForm();
    const {signUp,saveProfile} = useAuth();
    const onSubmit = data =>{
         console.log(data);
         if(data.password !== data.cpassword){
            Swal.fire({
                position: 'top-middle',
                icon: 'error',
                title: 'password and confirm password didnot match',
                showConfirmButton: false,
                timer: 1500
              })
         }
         else{
             signUp(data.email,data.password)
             .then(res=>{
                  saveProfile(data.name,data.photo)
                  .then(()=>{})
                  .catch(error=>{
                    Swal.fire({
                        position: 'top-middle',
                        icon: 'error',
                        title: `${error.message}`,
                        showConfirmButton: false,
                        timer: 1500
                      })
                  })
                  const loggedUser = res.user;
                  console.log(loggedUser);
                  Swal.fire({
                    position: 'top-middle',
                    icon: 'success',
                    title: 'your sign up successfully done',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  reset();
                  
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
    };

    return (
        <div className="flex items-center gap-6 md:w-1/2 mx-auto">
            <figure className='md:w-1/2'>
                <img src={registerBanner} className='w-full' alt="" />
            </figure>
            <div className='w-1/2 border-2 p-2 bg-slate-700 rounded-xl text-white'>
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
                    
                    <div className="w-full ">
                        <input type='password' placeholder='password' className=' my-input' {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])/
                                })}  />
                        {/* errors will return when field validation fails  */}
                        {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                        {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                        {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase and one special character.</p>}
                    </div>
                    <div className="w-full ">
                        <input type='password' placeholder='confirm password' className=' my-input' {...register("cpassword", {
                                    required: true,
                                    minLength: 6,
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])/
                                })}  />
                        {/* errors will return when field validation fails  */}
                        {errors.cpassword?.type === 'required' && <p className="text-red-600">confirm Password is required</p>}
                        {errors.cpassword?.type === 'minLength' && <p className="text-red-600">confirm Password must be 6 characters</p>}
                        {errors.cpassword?.type === 'pattern' && <p className="text-red-600">confirm Password must have one Uppercase and one special character.</p>}
                    </div>

                    <br></br>
                    <input className='btn btn-primary btn-block' type="submit" value="Sign Up" />
                </form>
            </div>
        </div>
    );
};

export default Register;