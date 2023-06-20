import { useForm } from "react-hook-form";
import FormTitle from "../../../../components/FormTitle";
import useAuth from "../../../../hooks/useAuth";
import useUserSecure from "../../../../hooks/useUserSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const img_hosting_token = import.meta.env.VITE_Image_Upload_Token;
const AddClass = () => {
    const { register, handleSubmit,reset, formState: { errors } } = useForm();
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`
    const {user} = useAuth();
    const [userSecure] = useUserSecure();
    const onSubmit = data => {
        const formData = new FormData();
        formData.append('image', data.image[0])

        fetch(img_hosting_url, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(imgResponse => {
            if(imgResponse.success){
                const imgURL = imgResponse.data.display_url;
                const {name, price,seats,email, className} = data;
                const newClass = {instructorName:name,instructorEmail:email,seats:parseFloat(seats),name:className, price: parseFloat(price), image:imgURL}
                console.log(newClass)
                userSecure.post('/classes', newClass)
                .then(data => {
                    console.log('after posting new class', data.data)
                    if(data.data.insertedId){
                        reset();
                        Swal.fire({
                            position: 'top-middle',
                            icon: 'success',
                            title: 'Class added successfully',
                            showConfirmButton: false,
                            timer: 1500
                          })
                    }
                })
            }
        })
        
    };
    return (
        <div>
             <Helmet>
                <title>Dashboard | Add Class</title>
            </Helmet>
            <FormTitle title='Add  a Class'></FormTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='md:w-3/4 mx-auto grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className="form-control col-span-2 md:col-span-1">
                        <label className="label">
                            <span className="label-text">Class Name:</span>
                        </label>
                        <input type="text"  {...register("className", { required: true })} placeholder="Enter Class name" className="input input-bordered w-full " />
                        {errors.className && <span className="text-red-600 p-2">class name field is required</span>}
                    </div>
                    <div className="form-control col-span-2 md:col-span-1">
                        <label className="label">
                            <span className="label-text">Class Image:</span>

                        </label>
                        <input type="file" {...register("image", { required: true })} className="file-input file-input-bordered w-full " />
                        {errors.image && <span className="text-red-600 p-2"> class image field is required</span>}
                    </div>
                    <div className="form-control col-span-2 md:col-span-1">
                        <label className="label">
                            <span className="label-text">Instructor Name:</span>
                        </label>
                        <input type="text" defaultValue={user?.displayName} readOnly {...register("name", { required: true })}  className="input input-bordered w-full " />
                       
                    </div>
                    <div className="form-control col-span-2 md:col-span-1">
                        <label className="label">
                            <span className="label-text">Instructor Email:</span>
                        </label>
                        <input type="text" defaultValue={user?.email} readOnly  {...register("email", { required: true })}  className="input input-bordered w-full " />
                        
                    </div>
                    <div className="form-control col-span-2 md:col-span-1">
                        <label className="label">
                            <span className="label-text">Available Seats:</span>
                        </label>
                        <input type="number"  {...register("seats", { required: true })} placeholder="Enter Available Seats" className="input input-bordered w-full " />
                        {errors.seats && <span className="text-red-600 p-2">seats field is required</span>}
                    </div>
                    <div className="form-control col-span-2 md:col-span-1">
                        <label className="label">
                            <span className="label-text">Price:</span>
                        </label>
                        <input type="number"  {...register("price", { required: true })} placeholder="Enter class price" className="input input-bordered w-full " />
                        {errors.price && <span className="text-red-600 p-2">price field is required</span>}
                    </div>

                        <input className="btn btn-primary w-40" type="submit" value="Add Class" />
                    
                </div>




            </form>
        </div>
    );
};

export default AddClass;