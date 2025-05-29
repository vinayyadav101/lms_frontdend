import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import CourseListCard from "../../component/CourseListCard";
import { instance } from "../../Helpers/axiosinstance";
import HomeLayout from "../../Layouts/Homelayout";
export default function CoursesPage(){

    const  [coursesList , setCoursesList] = useState([])

    async function coursesDataGet(){
        try {
            const response =  instance.get('/api/v1/course/')
            
                toast.promise(response,{
                    loading:"wait courses data downloading!",
                    success:"All courses data is downlaoded.",
                    error:response?.data?.message
                    
                })
                const courses = (await response).data

                if (courses) {
                    setCoursesList(courses?.data)  
                }

        } catch (error) {
            toast.error(error.message)    
        }
    }

        useEffect(()=>{
            coursesDataGet()
        },[])

    return(
        <HomeLayout>
            <div className="m-10 flex justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {
                        coursesList?.map((data) => <CourseListCard {...data} key={data._id}/>)
                    }
                </div>
            </div>
        </HomeLayout>
    )
}