import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../Layouts/Homelayout";
import { login } from "../redux/slices/authSlice";

export default function Login(){
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    
    const [loginData , setLoginData] = useState({
        email:"",
        password:""
    })

    function handleUserInput(e){
        const {name ,value} = e.target
        
        setLoginData(state => ({...state , [name] : value}))  
    }
    

    async function handleSubmit(event){
        event.preventDefault()
        
        const { email , password } = loginData
        
        if (!email || !password) {
                return toast.error("all fildes are required!")  
        }
        if (!email) {
            return toast.error("enter valid email.")
        }
        if (!password.length > 5 | !(password.length <= 8) ) {
            
            return toast.error("password length is grater then 5 and less then equal 8 .")
        }

        const res =  await dispatch(login(loginData))

        if (res.payload) {
            navigate('/')

            setLoginData({
                email:"",
                password:""
            })
        }
        
    }
    
    return(
        <HomeLayout>
            <div className="flex justify-center items-center mb-20 min-h-[70vh]">
                <div className="p-5 border-2 shadow-xl/30 lg:w-1/4 text-center">
                    <div className="text-2xl font-bold pb-3">
                        <h1>Login</h1>
                    </div>
                        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3" >
                            <div className="flex flex-col gap-5">
                                <input type="email" id="email" name="email" className="border-2 border-base-300 outline-none w-full rounded-md px-1 py-2" onChange={handleUserInput} placeholder="Enter email.." />
                                <input type="password" id="password" name="password"  className="border-2 border-base-300 outline-none w-full rounded-md px-1 py-2" onChange={handleUserInput} placeholder="Enter password.." />
                            </div>
                            <div className="bttton">
                                <button type="submit" className="btn btn-primary w-full hover:bg-blue-900">Submit</button>
                            </div>
                            <div>
                                I Don't have a account <Link to="/signup" className="text-blue-600">signup</Link>
                            </div>
                        </form>
                    </div>
                </div>
        </HomeLayout>   
    )
}