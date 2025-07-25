import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import HomeLayout from "../../Layouts/Homelayout"
import { getProfile } from "../../redux/slices/authSlice"
import { cancelSubscription } from "../../redux/slices/rezorpaySlice"
export default function Profilepage() {
    const { data }  = useSelector(state => state.auth)
    const navigator = useNavigate()
    const dispatch = useDispatch()

    async function handleCancelSubscribe() {
        if (!(data.subscription.id)) {
            return toast.error("somthing error in subscriptionID not fetch")
        }
         
        const response = await dispatch(cancelSubscription(data?.subscription?.id))

        if (response?.payload?.success) {
            await dispatch(getProfile(data?._id))
        }
    }
    
    return(
        <HomeLayout>
            <div className="mx-16 flex justify-center items-center h-[80vh]">
                <div className="flex flex-col m-2 py-8 px-5 justify-center items-center gap-7 border-red border-4">
                    <h1 className="text-4xl">User Profile</h1>
                        <img src={ data?.avatar?.securelUrl } alt="" className="w-20 rounded-full"/>
                    <div className="grid-cols-2 grid">
                        <p>Name</p>
                        <p>{ data.userName }</p>
                        <p>Email</p>
                        <p>{ data.email }</p>
                        <p>Subscription</p>
                        <p>{ data.subscription?.status || "Inactive"}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 w-fit">
                        <button className="bg-blue-500 py-3 px-5">
                            Change Password
                        </button>
                        <button className="bg-red-500 py-3 px-5" onClick={()=>navigator(`/user/editprofile/${data._id}`,{state:data})}>
                            Edit Profile
                        </button>
                        {
                            data?.subscription?.status === "Active" &&
                                <button className="bg-blue-500 py-3 px-5 col-span-2" onClick={handleCancelSubscribe}>
                                    Cancel Subscription
                                </button>
                        }
                    </div>
                </div>
            </div>
        </HomeLayout>
    )
}