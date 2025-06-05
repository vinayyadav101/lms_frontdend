
export default function LectureList({data , id , callback , active}) {
    const isActive = active === data.lecture.secure_url;

    return (
        <div className={`border-black border px-2 w-full cursor-pointer ${isActive ? "text-green-500": "text-black"}`} id={id}  onClick={callback}>
            <p className="text-2xl">{data.title}</p>
            <p>{data.description}</p>
        </div>
    )
}