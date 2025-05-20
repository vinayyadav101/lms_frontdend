import { useState } from "react";
import {CgProfile} from 'react-icons/cg'

import HomeLayout from "../Layouts/Homelayout";

export default function SingUp(){

    const [image , setimage] = useState("")
    return(
        <HomeLayout>
            <div className="w-full flex justify-center items-center mb-20">
                <div className="p-5 border-2 shadow-xl/30 w-1/3 text-center">
                    <div>
                        <h1 className="text-2xl font-bold">Registration</h1>
                    </div>
                    <div className="px-3 flex flex-col justify-center items-center relative gap-2">
                        <form action="" className="w-full" >
                            <div className="pt-4 flex justify-center items-center">
                                <label htmlFor="imageUpload" className="flex justify-center items-center w-20 h-20 rounded-full cursor-pointer overflow-hidden">
                                    {
                                        image ?
                                            <img src={image} alt="uploadedimage" /> :
                                            <CgProfile className="w-full h-full text-gray-500"/>
                                    }
                                </label>
                                <input type="file" id="imageUpload"  className="hidden" />
                            </div>
                            <div className="w-full">
                                <input type="text" id="fullName" className="border-black outline-lime-500"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </HomeLayout>   
    )
}