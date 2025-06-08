import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"

import Homelayout from '../../Layouts/Homelayout'
import { deleteFullCourse } from "../../redux/slices/lectureSlice"

export default function CourseDetailPage() {

    const {data , role} = useSelector(state => state.auth)
    const navigate = useNavigate()
    const dipatch = useDispatch()
    
    const {
                _id,
                title,
                description,
                category,
                thumbnails,
                createdBy,
                numberOfLectures
    } = useLocation().state

    async function deleteCourse() {
        const response = await dipatch(deleteFullCourse(_id))
        if (response?.payload?.success) {
            navigate('/courses')
        }
    }
    

    return(
        <Homelayout>
            <div className="flex justify-center items-center mx-16 h-[80vh] ">
            <div className="m-4 px-4 py-10 flex gap-10 relative justify-center md:flex-nowrap flex-wrap" >
                <div className="flex flex-col ">
                    <img src={thumbnails.secure_url} alt="" className="w-32 h-32" />
                    <h1>{title}</h1>
                    <p><span>Number Of Lectures: </span>{numberOfLectures}</p>
                </div>
                <div className="flex flex-col gap-3 w-1/2">
                    <p><span>Category: </span>{category}</p>
                    <p><span>Description: </span>{description}</p>
                    <p><span>Instructor: </span>{createdBy}</p>
                    {
                        
                        
                        (data?.subscription?.status === "Active") || role === "admin" ?
                                        <div className="flex gap-4">
                                            <button className="btn btn-primary" onClick={()=>navigate(`/course/lectures/?name=${title}&&id=${_id}`)}>
                                                watch Lectures
                                            </button>
                                        </div>
                                :
                                        <div>
                                            <button className="btn btn-primary" onClick={()=>navigate('/course/payment/subscribe')}>
                                                buy Subscription
                                            </button>
                                            {
                                                role === "admin" &&
                                                <button className="btn btn-primary" onClick={deleteCourse}>
                                                    Delete Course
                                                </button>
                                            }
                                        </div>
                        
                    }
                </div>
            </div>
            </div>
        </Homelayout>
    )
}