import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import LectureList from '../../component/lectureList'
import HomeLayout from '../../Layouts/Homelayout'
import { deleteLecture, getLectureAll } from '../../redux/slices/lectureSlice'


export default function LecturesPage(){

    const { search } = useLocation()
    const { id , name}  = Object.fromEntries(new URLSearchParams(search))
    const { lectures } = useSelector(state => state.lecture)
    const {role} = useSelector(state => state.auth) 
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [currentLecture , setCurrentLecture] = useState("")

    async function ondelete(lectureId) {

       const response =  await dispatch(deleteLecture({"courseId":id , lectureId}))
       
       if(response.payload.success) await dispatch(getLectureAll(id))
       
        
    }
    useEffect(()=>{
        id ? dispatch(getLectureAll(id)) : navigate('/courses')
    },[])
    useEffect(()=>{
        if (lectures.length === 0) {
            return setCurrentLecture("")
        }
            setCurrentLecture(lectures[0]?.lecture?.secure_url || "")
    },[lectures])

    return(
        <HomeLayout>
            {
                currentLecture ? 
                <div className='mx-16 flex  items-center flex-col h-[80vh] gap-10'>
                <h1 className='tracking-widest text-5xl'>Course :{name}</h1>
                    <div className='flex gap-3 mt-2 items-start'>
                    <video src={currentLecture} typeof='video/mp4' controls  width="500" height="400" >

                    </video>
                <div className='w-full inline-block flex flex-col h-[400px] overflow-y-scroll scrollbar-none gap-3 '>
                    {
                        role === "admin" && 
                            <button className="flex justify-start btn btn btn-primary w-fit">Upload Lecture</button>
                    }
                    {
                        lectures.map((el,index) => <LectureList 
                        key={index}
                        id={index} 
                        data={el} 
                        role={role}
                        callback={()=>{setCurrentLecture(el?.lecture?.secure_url)}} 
                        active={currentLecture}
                        onDelete={ondelete}
                        />)
                    }
                </div>
                </div>
            </div> :
                navigate('/courses')
            }
        </HomeLayout>
    )
}