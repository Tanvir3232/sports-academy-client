import { useForm } from "react-hook-form";
import FormTitle from "../../../../components/FormTitle";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useUserSecure from "../../../../hooks/useUserSecure";

const UpdateClass = () => {
  const { id } = useParams();

  const { register, handleSubmit } = useForm();

  const [userSecure] = useUserSecure();
  const { data: classData = [], isLoading, isError } = useQuery(['classData', id], async () => {
    const res = await userSecure.get(`/classes/${id}`);
    return res.data;
  });

  const onSubmit = (data) => {
   
    console.log('data', data);
    const { price, seats, className } = data;
    const updateClass = { seats: parseFloat(seats), name: className, price: parseFloat(price) }
    console.log(updateClass)
    userSecure.patch(`/classes/${id}`, updateClass)
        .then(resData => {

            if (resData.data.modifiedCount > 0) {

                Swal.fire({
                    position: 'top-middle',
                    icon: 'success',
                    title: 'Class updated successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
  };

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  if (isError) {
    return <div>Error occurred while fetching class data.</div>
  }

  return (
    <div>
      <FormTitle title="Update a Class"></FormTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="md:w-3/4 mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-control col-span-2">
            <label className="label">
              <span className="label-text">Class Name:</span>
            </label>
            <input
              type="text"
              defaultValue={classData.name}
              {...register("className")}
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control col-span-2">
            <label className="label">
              <span className="label-text">Available Seats:</span>
            </label>
            <input
              type="number"
              defaultValue={classData.seats}
              {...register("seats")}
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control col-span-2">
            <label className="label">
              <span className="label-text">Price:</span>
            </label>
            <input
              type="number"
              defaultValue={classData.price}
              {...register("price")}
              className="input input-bordered w-full"
            />
          </div>
          <input className="btn btn-primary w-40" type="submit" value="Update Class" />
        </div>
      </form>
    </div>
  );
};

export default UpdateClass;
