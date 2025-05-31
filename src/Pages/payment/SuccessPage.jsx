

import HomeLayout from "../../Layouts/Homelayout"

export default function SuccessPage(){
    return(
        <HomeLayout>
            <div className="mx-12 flex justify-center items-center h-[80vh]">
                <h1 className="text-green-600 text-5xl">Payment successfull.</h1>
            </div>
        </HomeLayout>
    )
}