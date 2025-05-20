export default function Carousel({image , details ,slideNo,imageSize="full" , totalSlide}){
    
    return(   
            <div id={`slide${slideNo}`} className="carousel-item relative w-full">
                <div className='w-full flex flex-col items-center mx-20 gap-5 p-5 px-10 justify-center'>
                    <div className='border-black border-2 rounded-full'>
                        <img
                            src={image}
                            className={`w-${imageSize} rounded-full`} />
                    </div>
                    {
                        details &&
                            <div className='flex gap-3 flex-col text-center'>
                                <h1 className='text-2xl'>{details.title}</h1>
                                <p>
                                    {details.description}
                                </p>
                            </div>
                    }
                </div>
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                    <a href={`#slide${slideNo === 1 ? totalSlide : slideNo - 1}`} className="btn btn-circle">❮</a>
                    <a href={`#slide${slideNo === totalSlide ? 1 : slideNo + 1}`} className="btn btn-circle">❯</a>
                </div>
            </div>
    )
}