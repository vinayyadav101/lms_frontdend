import HomeLayout from "../../Layouts/Homelayout";

export default function EditProfile() {
    return(
        <HomeLayout>
            <div className="mx-16 flex justify-center items-center h-[80vh]">
                <form className="flex flex-col m-2 py-8 px-5 justify-center items-center gap-7 border-red border-4">
                    <h1 className="text-4xl">User Profile</h1>
                        <img src={ data?.avatar?.securelUrl } alt="" className="w-20 rounded-full"/>
                    <div className="flex flex-col gap-5">
                          <input type="text" id="userName" name="userName" className="border-2 border-base-300 outline-none w-full rounded-md px-1 py-2" onChange={handelUserInput} placeholder="Enter full name.." />                            <input type="email" id="email" name="email" className="border-2 border-base-300 outline-none w-full rounded-md px-1 py-2" onChange={handelUserInput} placeholder="Enter email.." />
                          <input type="password" id="password" name="password"  className="border-2 border-base-300 outline-none w-full rounded-md px-1 py-2" onChange={handelUserInput} placeholder="Enter password.." />
                 
                    </div>
                </form>
            </div>
        </HomeLayout>
    )
}