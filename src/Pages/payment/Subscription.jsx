import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/Homelayout";
import { getProfile } from "../../redux/slices/authSlice";
import { buySubscription, clearState, getRezorpayKey, verifyPayment } from "../../redux/slices/rezorpaySlice";

export default function SubscriptionCheckout(){

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {rezorpay_key , subscription_id} = useSelector(state => state.payment)
    const { data } = useSelector(state => state.auth)


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
                    "name":data?.userName,
                    "email":data?.email,
                    "contact":"1234567890"
                },
                "handler": async function(response) {
                    
                     const res = await dispatch(verifyPayment({
                        payment_id: response.razorpay_payment_id,
                        subscription_id: response.razorpay_subscription_id,
                        signature: response.razorpay_signature,
                    }))

                    if (res?.payload?.success) {
                        await dispatch(getProfile(data?._id))
                        await dispatch(clearState())
                            navigate('/course/payment/success')
                    }else{
                            navigate('/course/payment/fail')
                    }   
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
                const promise = Promise.all([
                    dispatch(getRezorpayKey()),
                    dispatch(buySubscription())
                ])

            toast.promise(promise,{
                loading:"wait for loading some data"
            })
                 
            }
        
            useEffect(()=>{
                if (data.isLogin) {
                    load()
                    toast.promise(load , {
                        loading:"wait for loading data"
                    })   
                }else{
                    toast.error("user not login")
                    navigate('/login')
                }
            },[])
        
            return(
                <HomeLayout>
                    <button onClick={handleSubmit}>
                        buy
                    </button>
                </HomeLayout>
            )
    }

