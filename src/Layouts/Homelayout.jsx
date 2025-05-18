import { AiFillClockCircle, AiFillCloseCircle } from 'react-icons/ai'
import { FiMenu } from 'react-icons/fi'
import { Link } from 'react-router-dom';

import Footer from '../component/Footer'


export default function HomeLayout({ children }){


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
                    <ul className="menu p-4 w-48 sm:w-80 bg-base-200 text-base-content relative">
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
                    </ul>
                </div>
            </div>
            { children }


            <Footer />
        </div>
    );
}