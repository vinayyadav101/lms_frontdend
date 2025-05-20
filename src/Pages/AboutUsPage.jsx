import Carousel from '../component/carousel';
import  { carouselStr } from '../constants/aboutStr'
import aboutMainImage from '../images/aboutMainImage.png'
import HomeLayout from "../Layouts/Homelayout";

export default function AboutUs(){
    return(
        <HomeLayout>
            <div className="pb-20 lg:mx-16 mx-10 flex flex-wrap relative justify-center items-center pt-10">
                <div className="flex flex-col lg:w-1/2 w-fit">
                    <h1 className="text-yellow-300 text-5xl">
                        Affordable and quality education    
                    </h1>
                    <p className="pt-5">
                        Our goal is to provide the afoordable and quality education to the world.
                        We are providing the platform for the aspiring techares and students to 
                        share their skills,creativity and knowledge to each outher to empower 
                        and contribute in the growth and wellness of mankind.  
                    </p>
                </div>
                <div className="w-fit">
                    <img src={aboutMainImage} alt="" />
                </div>
                <div className="carousel lg:w-1/2 w-full">
                {                    
                    carouselStr.map((el)=> <Carousel 
                                                     key={el.slideNo}
                                                     {...el}
                                                     imageSize={24} 
                                                     totalSlide={carouselStr.length} 
                                                />)
                }
                </div>
            </div>
        </HomeLayout>
    )
}