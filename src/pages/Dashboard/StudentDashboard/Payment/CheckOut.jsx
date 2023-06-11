import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useUserSecure from "../../../../hooks/useUserSecure";
import useAuth from "../../../../hooks/useAuth";
import Swal from "sweetalert2";

const CheckOut = ({ classData }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const [userSecure] = useUserSecure();
    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [proccessing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const price = classData.price;
    useEffect(() => {
        if (price > 0) {
            userSecure.post('/create-payment-intent', { price })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [price, userSecure])
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card', card
        })
        if (error) {
            console.log('error', error)
            setCardError(error);
        } else {
            setCardError('');
            console.log('payment method', paymentMethod);
        }
        setProcessing(true);
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayName || 'unkown',
                    email: user?.email || 'unkown'
                }
            }
        }
        );
        setProcessing(false);
        if (confirmError) {
            setCardError(confirmError);
            console.log(confirmError);
        }
        console.log('Payment Intend: ', paymentIntent);
        if (paymentIntent.status == 'succeeded') {
            setTransactionId(paymentIntent.id);
            const payment = {
                email: user?.email,
                transactionId: paymentIntent.id,
                price,
                date: new Date(),
                selectedClassId: classData._id,
                classId: classData.classId,
                className: classData.className
            }
            userSecure.post('/payments', payment)
                .then(res => {
                    console.log(res.data);
                    if (res.data) {
                        Swal.fire({
                            position: 'top-middle',
                            icon: 'success',
                            title: 'You successfully enrolled the course',
                            showConfirmButton: false,
                            timer: 5000
                          })
                    }
                })
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="w-2/3 mx-8">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="btn btn-primary mt-4" type="submit" disabled={!stripe || !clientSecret || proccessing}>
                    Pay
                </button>
            </form>
            {cardError && <span className="text-red-500">{cardError}</span>}
            {transactionId && <span className="text-green-500">Transaction sucessfull with <strong>transaction id:</strong> {transactionId}</span>}
        </>
    );

}
export default CheckOut;