import notfound from '../images/notfound.png'
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