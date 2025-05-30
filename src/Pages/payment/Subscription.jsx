import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/Homelayout";
import { buySubscription, getRezorpayKey, verifyPayment } from "../../redux/slices/rezorpaySlice";

export default function SubscriptionCheckout(){

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {rezorpay_key , subscription_id} = useSelector(state => state.payment)


        function handleSubmit(e) {
            e.preventDefault()


            if (!rezorpay_key || !subscription_id) {
                return toast.error("somthing error")
            }

            const options = {
                "key": rezorpay_key, 
                "image": "https://example.com/your_logo",
                "Subscription_id": subscription_id,
                "theme": {
                    "color": "#3399cc"
                },
                handler: async function(response) {
                    
                     const res = await dispatch(verifyPayment({
                        payment_id: response.razorpay_payment_id,
                        subscription_id: response.razorpay_subscription_id,
                        signature: response.razorpay_signature,
                    }))
console.log(res);

                    // if (!res) {
                    //     navigate('/payment/fail')
                    // }else{
                    //     navigate('payment/success')
                    // }    
                }

                }

                const rzp = new window.Razorpay(options);
                rzp.open()
            }

            async function load(){
                 dispatch(getRezorpayKey())
                 console.log(await dispatch(buySubscription()));
                 
            }
        
            useEffect(()=>{
                load()
            },[])
        
            return(
                <HomeLayout>
                    <button onClick={handleSubmit}>
                        buy
                    </button>
                </HomeLayout>
            )
    }

