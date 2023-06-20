import { loadStripe } from "@stripe/stripe-js";
import CheckOut from "./CheckOut";
import { Elements } from "@stripe/react-stripe-js";
import { useParams } from "react-router-dom";
import useUserSecure from "../../../../hooks/useUserSecure";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)
const Payment = () => {
    const {id} = useParams();
    console.log(id);
    const [userSecure] = useUserSecure();
   
    const { data: classData = [] } = useQuery(['classData', id], async () => {
        const res = await userSecure.get(`/selectedclasses/${id}`);
        return res.data;
      });
    
    return (
        <div>
            <Helmet>
                <title>Dashboard | Pay</title>
            </Helmet>
            <h1 className="text-3xl text-center mb-12 font-bold">Payment</h1>
            <Elements stripe={stripePromise}>
                <CheckOut classData={classData}></CheckOut>
            </Elements>
        </div>
    );
};

export default Payment;