import {  AiFillCloseCircle } from 'react-icons/ai'
import { FiMenu } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import Footer from '../component/Footer'
import { logout } from '../redux/slices/authSlice';


export default function HomeLayout({ children }){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isLogin = useSelector(state => state?.auth?.isLogin)


    async function handelLogout(){
        const res = await dispatch(logout())
        if (res.payload) {
            navigate('/')
        }
    }
    
    return (
        <div className="min-h-[90vh]">
            <div className="drawer left-0 z-10">
                <input className="drawer-toggle" id="my-drawer" type="checkbox" />
                <div className="drawer-content">
                    <label htmlFor="my-drawer" className="cursor-pointer relative">
                        <FiMenu 
                            size={"32px"}
                            className="font-bold text-black m-4"
                        />
                    </label>
                </div>
                <div className="drawer-side w-fit">
                    <label htmlFor="my-drawer" className="drawer-overlay" aria-label='close sidebar'>
                    </label>
                    <ul className="menu p-4 w-48 sm:w-80 bg-base-200 text-base-content relative h-screen">
                        <li className="w-fit absolute right-2 z-50">
                            <label htmlFor="my-drawer" className="cursor-pointer">
                                 <AiFillCloseCircle size={24} />
                            </label>

                        </li>
                        <li>
                            <Link to="/">Home</Link>
                        </li>

                        <li>
                            <Link to="/courses">All Courses</Link>
                        </li>

                        <li>
                            <Link to="/contact">Contact Us</Link>
                        </li>

                        <li>
                            <Link to="/about">About Us</Link>
                        </li>
                        {
                            isLogin && 
                                <div className='flex mt-auto gap-2 justify-center items-center pb-2 bottom-0 '>
                                    <div className='w-full'>
                                        <button className='w-[100%] btn btn-secondary btn-soft  '>
                                            <Link to="/user/profile">
                                                profile
                                            </Link>
                                        </button>
                                    </div>
                                    <div className='w-full'>
                                        <button onClick={handelLogout} className='w-[100%] btn btn-primary btn-soft'>
                                            LogOut
                                        </button>
                                    </div>
                                </div>
                        }
                        {
                            !isLogin && 
                                <div className='flex mt-auto gap-2 justify-center items-center pb-2 bottom-0 '>
                                    <div className='w-full'>
                                        <button className='w-[100%] btn btn-secondary btn-soft  '>
                                            <Link to="/login">
                                                Login
                                            </Link>
                                        </button>
                                    </div>
                                    <div className='w-full'>
                                        <button className='w-[100%] btn btn-primary btn-soft'>
                                            <Link to="/signup">
                                                signup
                                            </Link>
                                        </button>
                                    </div>
                                </div>
                        }

                    </ul>
                </div>
            </div>
            { children }

            <Footer />

        </div>
    );
}