import { useNavigate } from "react-router-dom"

export default  function CourseListCard({_id , title , description , category , thumbnails , createdBy ,numberOfLectures}){
    
    const navigate = useNavigate()

    function handelClick() {
        navigate(
            "/course/details",
            {state : {
                _id,
                title,
                description,
                category,
                thumbnails,
                createdBy,
                numberOfLectures
            }}
        )
    }

    return(
        <div onClick={handelClick} className="bg-blue-500 flex p-4 gap-4 rounded-lg shadow-lg cursor-pointer">
            <div className="flex flex-shrink-0 items-center ">
                <img src={thumbnails?.secure_url} alt="course_image" className="rounded-md w-24 h-24" />
            </div>
            <div className="text-white">
                <h1><span className="font-semibold">Title:</span> {title}</h1>
                <h3><span className="font-semibold">Created By:</span> {createdBy}</h3>
                <p><span className="font-semibold">Category:</span> {category}</p>
                <p><span className="font-semibold">Description:</span> {description}</p>
                <p><span className="font-semibold">Number of Lectures:</span> {numberOfLectures}</p>
            </div>
        </div>
    )
}