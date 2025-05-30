import { useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"

import Homelayout from '../../Layouts/Homelayout'

export default function CourseDetailPage() {

    const {data} = useSelector(state => state.auth)
    const navigate = useNavigate()
    console.log(data);
    
    const {
                title,
                description,
                category,
                thumbnails,
                createdBy,
                numberOfLectures
    } = useLocation().state

    return(
        <Homelayout>
            <div className="flex justify-center items-center mx-16 h-[80vh]">
            <div className="m-4 px-4 py-10 flex gap-10">
                <div className="flex flex-col">
                    <img src={thumbnails.secure_url} alt="" className="w-24" />
                    <h1>{title}</h1>
                    <p><span>Number Of Lectures</span>{numberOfLectures}</p>
                </div>
                <div className="flex flex-col gap-3">
                    <p><span>Category</span>{category}</p>
                    <p><span>Description</span>{description}</p>
                    <p><span>Instructor</span>{createdBy}</p>
                    {
                        !data.subscription &&
                                        <button className="btn btn-primary" onClick={()=>navigate('/course/payment/subscribe')}>
                                            buy Subscription
                                        </button>
                    }
                </div>
            </div>
            </div>
        </Homelayout>
    )
}