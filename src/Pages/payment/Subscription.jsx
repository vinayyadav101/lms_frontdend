import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/Homelayout";
import { buySubscription, getRezorpayKey, verifyPayment } from "../../redux/slices/rezorpaySlice";

export default function SubscriptionCheckout(){

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {rezorpay_key , subscription_id} = useSelector(state => state.payment)
    const {userName , email} = useSelector(state => state.auth.data)


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
                "prefill":{
                    "name":"vinay yadav",
                    "email":"vinay@gmail.com",
                    "contact":"1234567890"
                },
                "handler": async function(response) {
                    
                     const res = await dispatch(verifyPayment({
                        payment_id: response.razorpay_payment_id,
                        subscription_id: response.razorpay_subscription_id,
                        signature: response.razorpay_signature,
                    }))

                    res ? navigate('/payment/success') : navigate('/paymnet/fail')   
                },
                // "modal": async function name(response) {
                    // in this bloack of code to maintain if user not payment and close checkout page the run this code and cancel subscription id
                    // and remove data
                // }

                }

                const rzp = new window.Razorpay(options);
                rzp.open()
            }

            async function load(){
                dispatch(getRezorpayKey())
                dispatch(buySubscription())
                 
            }
        
            useEffect(()=>{
                load()
                toast.promise(load , {
                    loading:"wait for loading data"
                })
            },[])
        
            return(
                <HomeLayout>
                    <button onClick={handleSubmit}>
                        buy
                    </button>
                </HomeLayout>
            )
    }

