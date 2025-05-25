import notfound from '../images/ChatGPT Image May 25, 2025, 07_46_39 PM.png'
import HomeLayout from '../Layouts/Homelayout'
export default function NotFountPage() {
    return(
        <HomeLayout>
            <div className='h-[80vh] flex justify-center items-center'>
                <img src={notfound} alt="" className='h-96'/>
            </div>
        </HomeLayout>
    )
}