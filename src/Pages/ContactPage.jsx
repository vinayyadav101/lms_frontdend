import { useState } from "react";
import toast from "react-hot-toast";

import { instance } from "../Helpers/axiosinstance";
import HomeLayout from "../Layouts/Homelayout";

export default function Contact(){
    const [contactData , setContactData] = useState({
        email:"",
        message:""
    })

    function handelUserInput(e){
        const {name ,value} = e.target
        
        setContactData(state => ({...state , [name] : value}))  
    }
    

    async function handelSubmit(event){
        event.preventDefault()
        
        const { email , message } = contactData
        
        if (!email || !message) {
                return toast.error("all fildes are required!")  
        }
        if (!email) {
            return toast.error("enter valid email.")
        }
        if (!message) {   
            return toast.error("fill message filde.")
        } 
        try {
            
            const response = instance.post('/api/v1/contact/' , contactData)

            toast.promise(response , {
                loading:"youre message under process.",
                success:"message deliverd scucessfully.",
                error: response?.data?.message
            })
            
            if ((await response).data) {
                setContactData({
                    email:"",
                    message:""
                })
            }
        } catch (error) {
            toast.error(error?.message)
        }
        
    }
    
    return(
        <HomeLayout>
            <div className="flex justify-center items-center mb-20 min-h-[70vh]">
                <div className="p-5 border-2 shadow-xl/30 lg:w-1/4 text-center">
                    <div className="text-2xl font-bold pb-3">
                        <h1>Contact</h1>
                    </div>
                        <form onSubmit={handelSubmit} className="w-full flex flex-col gap-3" >
                            <div className="flex flex-col gap-5">
                                <input type="email" id="email" name="email" className="border-2 border-base-300 outline-none w-full rounded-md px-1 py-2" onChange={handelUserInput} placeholder="Enter email.." value={contactData.email} />
                                <textarea id="password" name="message"  className="border-2 border-base-300 outline-none w-full rounded-md px-1 py-2" onChange={handelUserInput} placeholder="Enter message.." value={contactData.message}/>
                            </div>
                            <div className="bttton">
                                <button type="submit" className="btn btn-primary w-full hover:bg-blue-900">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
        </HomeLayout>   
    )
}