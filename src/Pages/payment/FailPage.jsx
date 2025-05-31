import HomeLayout from "../../Layouts/Homelayout";

export default function FailPage() {
    return(
            <HomeLayout>
                <div className="mx-12 flex justify-center items-center h-[80vh]">
                    <h1 className="text-red-600 text-5xl">Payment Fail.</h1>
                </div>
            </HomeLayout>
        )
}