import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import LectureList from '../../component/lectureList'
import HomeLayout from '../../Layouts/Homelayout'
import { getLectureAll } from '../../redux/slices/lectureSlice'


export default function LecturesPage(){

    const { search } = useLocation()
    const { id , name}  = Object.fromEntries(new URLSearchParams(search))
    const { lectures } = useSelector(state => state.lecture)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [currentLecture , setCurrentLecture] = useState("")


    
    useEffect(()=>{
        id ? dispatch(getLectureAll(id)) : navigate('/courses')
    },[])
    useEffect(()=>{
        setCurrentLecture(lectures[0]?.lecture?.secure_url)
    },[lectures])

    return(
        <HomeLayout>
            <div className='mx-16 flex  items-center flex-col h-[80vh] gap-3'>
                <h1 className='tracking-widest text-5xl'>Course :{name}</h1>
                <div className='flex flex-col gap-3 mt-2'>
                    <video src={currentLecture} typeof='video/mp4' controls  width="400" height="280" >

                    </video>
                <div className='w-full inline-block flex flex-col gap-3 overflow-y-scroll'>
                    {
                        lectures.map((el,index) => <LectureList 
                        key={index}
                        id={index} 
                        data={el} 
                        callback={()=>{setCurrentLecture(el?.lecture?.secure_url)}} 
                        active={currentLecture}/>)
                    }
                </div>
                </div>
            </div>
        </HomeLayout>
    )
}