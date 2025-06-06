
export default function LectureList({data , id , callback , active , role , onDelete}) {
    const isActive = active === data.lecture.secure_url;

    return (
        <div className={`border-black border px-2 w-full grid grid-flow-col items-center  justify-between gap-2 cursor-pointer ${isActive && "text-green-500"}`} id={id}  >
            <div className="flex flex-col" onClick={callback}>
                <p className="text-2xl">{data.title}</p>
                <p>{data.description} </p>
            </div>
            {
                role === "admin" && 
                <div>
                    <button className="btn btn-primary" onClick={()=>onDelete(data?._id)}>Delete Lecture</button>
                </div>
            }
        </div>
    )
}