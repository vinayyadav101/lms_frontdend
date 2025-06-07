import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { BsFileEarmarkImage } from "react-icons/bs"
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import HomeLayout from "../../Layouts/Homelayout";
import { createCourseWithLecture } from '../../redux/slices/lectureSlice';

export default function CreateCoursePage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const uploadFileData = useRef(null)
    const [courseCompState , setCourseCompState] = useState({
        isHidden:false,
        lectureIndex:0,
        toggle:false,
        previewImage:""
    })
    const [courseData , setCourseData] = useState({
        title:"",
        description:"",
        thumbnails:"",
        category:"",
        createdBy:"",
        lectures:[]
    })


    
                

    function handleUserInput(e){
        const { name , value , id} = e.target
            if(id){
                setCourseData((state)=>({...state , lectures:state.lectures.map((el,i) => (i.toString() === id) ? {...el , [name]:value} : el) }))    
            }else{
                setCourseData((state)=>({...state , [name]:value}))    
            }
    }
    function handleImageUpload(e) {
        const src = e.target.files[0]
        
        if (src) {
            setCourseData((state)=>({...state , thumbnails:src}))
            setCourseCompState((state)=>({...state , previewImage:URL.createObjectURL(src)}))
        }
    }
    
    function handleFilesUpload(e) {
        const srcs = Array.from(e.target.files)
            if (srcs) {
                setCourseData((state)=>({
                    ...state,
                    lectures: srcs.map(el => ({lecture:el}))
                }))
            }
        }

        function addLectureDetails() {
            if (!courseData.title) return toast.error("enter Course Name") 
            if (!courseData.description) return toast.error("enter Course description")
            if (!courseData.createdBy) return toast.error("enter Course creater")
            if (!courseData.category) return toast.error("enter Course category")
            if (courseData.lectures.length === 0) return toast.error("first upload lecture files")
            
                setCourseCompState((state)=>({...state , isHidden:!state.isHidden}))

        }
        
        async function handleLectureDetails() {
            if (!courseData.lectures[courseCompState.lectureIndex]?.title) return toast.error(`enter lecture ${courseCompState.lectureIndex + 1} Name`) 
            if (!courseData.lectures[courseCompState.lectureIndex]?.description) return toast.error(`enter lecture ${courseCompState.lectureIndex + 1} description`)

            if ((courseData.lectures.length - 1) === courseCompState.lectureIndex) {

                const formData = new FormData()

                formData.append("title" , courseData.title)
                formData.append("description" , courseData.description)
                formData.append("thumbnails" , courseData.thumbnails)
                formData.append("category" , courseData.category)
                formData.append("createdBy" , courseData.createdBy)
                courseData.lectures.forEach((el , i)=>{
                    formData.append(`lectures[${i}][lecture]` , el.lecture)
                    formData.append(`lectures[${i}][title]` , el.title)
                    formData.append(`lectures[${i}][description]` , el.description)
                })
                
                const response = await dispatch(createCourseWithLecture(formData))

                if (response?.payload?.success) {

                    uploadFileData.current.value = ""
                    setCourseCompState({
                        isHidden:false,
                        lectureIndex:0,
                        toggle:false,
                        previewImage:""
                    })
                    setCourseData({
                        title:"",
                        description:"",
                        thumbnails:"",
                        category:"",
                        createdBy:"",
                        lectures:[]
                    })

                    navigate('/')
                }
                

            }else{
                setCourseCompState((state)=>({...state , toggle:!state.toggle}))
            }

        }

useEffect(()=>{
    const index = courseData?.lectures.findIndex((el)=> !(el.title))
            if (index !== -1) {
                setCourseCompState((state)=>({...state , lectureIndex:index}))
            }
            return
},[courseCompState.isHidden , courseCompState.toggle])
    return(
        <HomeLayout>
            <div className='mx-14 p-3 flex justify-center items-center md:h-[80vh] mb-5'>
                <div className={`w-full flex justify-center items-center gap-10 flex-wrap ${courseCompState.isHidden && "cursor-not-allowed blur-md"}`}>
                    <div className={`w-fit  p-5 flex justify-center items-center ${courseCompState.isHidden && "pointer-events-none"}`}>
                    <input type="file" id="thumbnails" name='thumbnails' onChange={handleImageUpload} hidden/>
                    <label htmlFor="thumbnails">
                        {
                            courseCompState.previewImage ?
                            <img src={courseCompState.previewImage} alt="" className='h-[200px] w-[300px]'/> :
                            <BsFileEarmarkImage className='h-[200px] w-[300px] ' />
                        }
                    </label>
                </div>
                <div className={`${courseCompState.isHidden && "pointer-events-none"} grid md:grid-cols-2 gap-2`}>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Course Name *</legend>
                            <input type="text" className="input" name='title' value={courseData.title || ""} placeholder="Type here" onChange={handleUserInput}/>
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">category *</legend>
                            <input type="text" className="input" name='category' value={courseData.category || ""} placeholder="Type here" onChange={handleUserInput}/>
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Creater Name *</legend>
                            <input type="text" className="input" name='createdBy' value={courseData.createdBy || ""} placeholder="Type here" onChange={handleUserInput}/>
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">upload lectures</legend>
                            <input type="file" className="file-input"  multiple ref={uploadFileData} onChange={handleFilesUpload}/>
                            <label className="label">max upload one time only three videos.(optional)</label>
                        </fieldset>
                        <fieldset className="fieldset md:col-span-2">
                            <legend className="fieldset-legend">Description *</legend>
                            <textarea className="textarea h-24 w-auto" placeholder="max 200 words" name='description' value={courseData.description || ""} onChange={handleUserInput}></textarea>
                        </fieldset>
                        <button type='submit' className='btn btn-primary w-full md:col-span-2' onClick={addLectureDetails}>Next</button> 
                </div>
                </div>
                {
                    courseCompState.isHidden && 
                    <div className='z-10 absolute p-4 border border-black'>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Lecture {courseCompState.lectureIndex + 1} Name *</legend>
                            <input type="text" className="input" name='title' id={courseCompState.lectureIndex} value={courseData?.lectures[courseCompState.lectureIndex]?.title || ""} placeholder="Type here" onChange={handleUserInput}/>
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Description *</legend>
                            <textarea className="textarea h-24" placeholder="max 200 words" name='description' value={courseData?.lectures[courseCompState.lectureIndex]?.description || ""} id={courseCompState.lectureIndex} onChange={handleUserInput}></textarea>
                        </fieldset>
                        <button type='submit' className='btn btn-primary w-full' name={courseCompState.lectureIndex} onClick={handleLectureDetails}>{
                            (courseData.lectures.length - 1) === courseCompState.lectureIndex ? "Submit" : "Next"
                        }</button> 
                    </div>
                }
            </div>
        </HomeLayout>
    )
}