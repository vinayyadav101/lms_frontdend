import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/Homelayout";
import { UploadLecture } from "../../redux/slices/lectureSlice";

export default function AddLecturePage() {

    const { search } = useLocation()
    const { id }  = Object.fromEntries(new URLSearchParams(search))
    const uploadFileData = useRef(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [lectureData , setLectureData] = useState({
        previewImage:"",
        title:"",
        description:"",
        lecture:"",

    })

     function handleUserInput(e){
        const { name , value } = e.target
                setLectureData((state)=>({...state , [name]:value}))    
    }
    function handleFileUpload(e) {
        const src = e.target.files[0]
        
        if (src) {
            setLectureData((state)=>({...state , lecture:src , previewImage:URL.createObjectURL(src)}))
        }
    }
    async function uploadLecture() {
        if(!lectureData.title) return toast.error("enter lecture name")
        if(!lectureData.description) return toast.error("enter lecture description")
        if(!lectureData.lecture) return toast.error("upload lecture file")

            const formdata = new FormData()

            formdata.append("title" , lectureData.title)
            formdata.append("description" , lectureData.description)
            formdata.append("lecture" , lectureData.lecture)

            const response = await dispatch(UploadLecture({id , "data":formdata}))

            if (response?.payload?.success) {
                navigate(-1)
            }
    }

    useEffect(()=>{
        !id &&  navigate('/courses')
    },[])
    return(
        <HomeLayout>
            <div className='mx-14 p-3 flex justify-center items-center md:h-[80vh] mb-5'>
                <div className={`w-full flex justify-center items-center gap-10 flex-wrap `}>
                                <div className={` grid md:grid-cols-2 gap-2`}>
                                        <fieldset className="fieldset">
                                            <legend className="fieldset-legend">Lecture Name *</legend>
                                            <input type="text" className="input" name='title' value={lectureData.title || ""} placeholder="Type here" onChange={handleUserInput}/>
                                        </fieldset>
                                        <fieldset className="fieldset">
                                            <legend className="fieldset-legend">upload lectures *</legend>
                                            <input type="file" className="file-input"  ref={uploadFileData} onChange={handleFileUpload}/>
                                            <label className="label">max upload one time only three videos.(optional)</label>
                                        </fieldset>
                                        <fieldset className="fieldset md:col-span-2">
                                            <legend className="fieldset-legend">Description *</legend>
                                            <textarea className="textarea h-24 w-auto" placeholder="max 200 words" name='description' value={lectureData.description || ""} onChange={handleUserInput}></textarea>
                                        </fieldset>
                                        <button type='submit' className='btn btn-primary w-full md:col-span-2' onClick={uploadLecture}>Submit</button> 
                                </div>
                                </div>
            </div>
        </HomeLayout>
    )
}