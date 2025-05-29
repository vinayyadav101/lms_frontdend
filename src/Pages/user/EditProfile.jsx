import { useState } from "react";
import { useDispatch } from "react-redux";
import {  useNavigate, useParams } from "react-router-dom";

import HomeLayout from "../../Layouts/Homelayout";
import {  getProfile, updateProfile } from "../../redux/slices/authSlice";

export default function EditProfile() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {id} = useParams()
    
    const [editProfile , setEditProfile] = useState({
        userName:undefined,
        email:undefined,
    })

        function handleUserInput(e){
            const {name ,value} = e.target
        
            setEditProfile(state => ({...state , [name] : value}))  
        }


        async function handleSubmit(event){
            event.preventDefault()
            
            const res =  await dispatch(updateProfile({id , editProfile}))

            if (res.payload) {
                await dispatch(getProfile(id))
                
                    setEditProfile({
                        userName : undefined,
                        email : undefined
                    })

                    navigate(-1)
                
            }

        }


    return(
        <HomeLayout>
            <div className="mx-16 flex justify-center items-center h-[80vh]">
                <form onSubmit={handleSubmit} className="flex flex-col m-2 py-8 px-5 justify-center items-center gap-7 border-red border-4 relative">
                    <h1 className="text-4xl">Edit Profile</h1>
                    <div className="flex flex-col gap-5">
                          <input type="text" id="userName" name="userName" className="border-2 border-base-300 outline-none w-full rounded-md px-1 py-2" onChange={handleUserInput} placeholder="Enter full name.." value={editProfile?.userName || ""} />
                          <input type="email" id="email" name="email"  className="border-2 border-base-300 outline-none w-full rounded-md px-1 py-2" onChange={handleUserInput} placeholder="Enter Email.."  value={editProfile?.email || ""} />
                    </div>
                    <button type="submit" className="btn btn-primary w-full">
                        Submit
                    </button>
                </form>
            </div>
        </HomeLayout>
    )
}