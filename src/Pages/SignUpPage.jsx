import { useState } from "react";
import toast from "react-hot-toast";
import {CgProfile} from 'react-icons/cg'
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../Layouts/Homelayout";
import { createAccount } from "../redux/slices/authSlice";

export default function SignUp(){
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [imageUrl , setImageUrl] = useState("")
    
    const [signupData , setSignupData] = useState({
        userName:"",
        email:"",
        password:"",
        avatar:""
    })

    function handleUserInput(e){
        const {name ,value} = e.target
        
        setSignupData(state => ({...state , [name] : value}))  
    }
    
    function hadelImageInput(e){
        const src = e.target.files[0]
        const url = URL.createObjectURL(src)

        if (src) {
            setSignupData(state => ({...state , avatar:src}))
            setImageUrl(url)
        }
    }

    async function handleSubmit(event){
        event.preventDefault()
        
        const {userName , email ,password , avatar} = signupData
        
        if (!userName || !email || !password || !avatar) {
                return toast.error("all fildes are required!")  
        }
        if (!userName > 5) {
            return toast.error("full name length must be more the 5 character.")
        }
        if (!email) {
            return toast.error("enter valid email.")
        }
        if (!password.length > 5 | !(password.length <= 8) ) {
            
            return toast.error("password length is grater then 5 and less then equal 8 .")
        }

        const formdata = new FormData
        formdata.append("userName" , userName)
        formdata.append("avatar",avatar)
        formdata.append("email",email)
        formdata.append("password",password)

        const res =  await dispatch(createAccount(formdata))

        if (res.payload) {
            navigate('/')

            setSignupData({
                userName:"",
                avatar:"",
                email:"",
                password:""
            })
            setImageUrl("")
        }
        
        
        
    }
    
    

    return(
        <HomeLayout>
            <div className="flex justify-center items-center mb-20 min-h-[70vh]">
                <div className="p-5 border-2 shadow-xl/30 lg:w-1/4 text-center">
                    <div className="text-2xl font-bold pb-3">
                        <h1>Registration</h1>
                    </div>
                        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3" >
                            <div className="pt-4 flex justify-center items-center">
                                <label htmlFor="imageUpload" className="flex justify-center items-center w-h-16 h-16 rounded-full cursor-pointer overflow-hidden">
                                    {
                                        imageUrl ?
                                            <img src={imageUrl} alt="uploadedimage" className="w-full h-full" /> :
                                            <CgProfile className="w-full h-full text-gray-500"/>
                                    }
                                </label>
                                <input type="file" id="imageUpload"  className="hidden" onChange={hadelImageInput}/>
                            </div>
                            <div className="flex flex-col gap-5">
                                <input type="text" id="userName" name="userName" className="border-2 border-base-300 outline-none w-full rounded-md px-1 py-2" onChange={handleUserInput} placeholder="Enter full name.." />
                                <input type="email" id="email" name="email" className="border-2 border-base-300 outline-none w-full rounded-md px-1 py-2" onChange={handleUserInput} placeholder="Enter email.." />
                                <input type="password" id="password" name="password"  className="border-2 border-base-300 outline-none w-full rounded-md px-1 py-2" onChange={handleUserInput} placeholder="Enter password.." />
                            </div>
                            <div className="bttton">
                                <button type="submit" className="btn btn-primary w-full hover:bg-blue-900">Submit</button>
                            </div>
                            <div>
                                Alrady i have account <Link to="/login" className="text-blue-600">login</Link>
                            </div>
                        </form>
                    </div>
                </div>
        </HomeLayout>   
    )
}