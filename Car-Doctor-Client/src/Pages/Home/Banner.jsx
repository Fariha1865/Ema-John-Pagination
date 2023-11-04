import img1 from "../../assets/images/banner/1.jpg"
import img2 from "../../assets/images/banner/2.jpg"
import img3 from "../../assets/images/banner/3.jpg"
import img4 from "../../assets/images/banner/4.jpg"
import img5 from "../../assets/images/banner/5.jpg"
import img6 from "../../assets/images/banner/6.jpg"

const Banner = () => {
    return (
        <div>
            <div className="carousel w-full h-[600px]">
                <div id="slide1" className="carousel-item relative w-full">
                    <img src={img1} className="w-full" />
                    <div className="pl-10 absolute flex flex-col items-start bg-gradient-to-r from-gray-900 to-transparent w-full h-full justify-center">
                        <h1 className="text-white text-4xl font-bold">Affordable Price<br /> For Car Servicing</h1>
                        <p className="text-gray-100 mt-5">There are many variations of passages of  available, but<br /> the majority have suffered alteration in some form</p>
                        <div className="flex gap-5 mt-5">
                            <button className="btn btn-error">Discover More</button>
                            <button className="btn btn-outline btn-error">Latest Project</button>
                        </div>
                    </div>
                    <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-0 gap-10">
                        <a href="#slide4" className="btn btn-circle">❮</a>
                        <a href="#slide2" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide2" className="carousel-item relative w-full">
                    <img src={img2} className="w-full" />
                    <div className="pl-10 absolute flex flex-col items-start bg-gradient-to-r from-gray-900 to-transparent w-full h-full justify-center">
                        <h1 className="text-white text-4xl font-bold">Affordable Price<br /> For Car Servicing</h1>
                        <p className="text-gray-100 mt-5">There are many variations of passages of  available, but<br /> the majority have suffered alteration in some form</p>
                        <div className="flex gap-5 mt-5">
                            <button className="btn btn-error">Discover More</button>
                            <button className="btn btn-outline btn-error">Latest Project</button>
                        </div>
                    </div>
                    <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-0 gap-10">
                        <a href="#slide1" className="btn btn-circle">❮</a>
                        <a href="#slide3" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide3" className="carousel-item relative w-full">
                    <img src={img3} className="w-full" />
                    <div className="pl-10 absolute flex flex-col items-start bg-gradient-to-r from-gray-900 to-transparent w-full h-full justify-center">
                        <h1 className="text-white text-4xl font-bold">Affordable Price<br /> For Car Servicing</h1>
                        <p className="text-gray-100 mt-5">There are many variations of passages of  available, but<br /> the majority have suffered alteration in some form</p>
                        <div className="flex gap-5 mt-5">
                            <button className="btn btn-error">Discover More</button>
                            <button className="btn btn-outline btn-error">Latest Project</button>
                        </div>
                    </div>
                    <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-0 gap-10">
                        <a href="#slide2" className="btn btn-circle">❮</a>
                        <a href="#slide4" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide4" className="carousel-item relative w-full">

                    <img src={img4} className="w-full" />
                    <div className="pl-10 absolute flex flex-col items-start bg-gradient-to-r from-gray-900 to-transparent w-full h-full justify-center">
                        <h1 className="text-white text-4xl font-bold">Affordable Price<br /> For Car Servicing</h1>
                        <p className="text-gray-100 mt-5">There are many variations of passages of  available, but<br /> the majority have suffered alteration in some form</p>
                        <div className="flex gap-5 mt-5">
                            <button className="btn btn-error">Discover More</button>
                            <button className="btn btn-outline btn-error">Latest Project</button>
                        </div>
                    </div>
                    <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-0 gap-10">
                        <a href="#slide3" className="btn btn-circle">❮</a>
                        <a href="#slide5" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide5" className="carousel-item relative w-full">
                    <img src={img5} className="w-full" />
                    <div className="pl-10 absolute flex flex-col items-start bg-gradient-to-r from-gray-900 to-transparent w-full h-full justify-center">
                        <h1 className="text-white text-4xl font-bold">Affordable Price<br /> For Car Servicing</h1>
                        <p className="text-gray-100 mt-5">There are many variations of passages of  available, but<br /> the majority have suffered alteration in some form</p>
                        <div className="flex gap-5 mt-5">
                            <button className="btn btn-error">Discover More</button>
                            <button className="btn btn-outline btn-error">Latest Project</button>
                        </div>
                    </div>
                    <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-0 gap-10">
                        <a href="#slide4" className="btn btn-circle">❮</a>
                        <a href="#slide6" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide6" className="carousel-item relative w-full">
                    <img src={img6} className="w-full" />
                    <div className="pl-10 absolute flex flex-col items-start bg-gradient-to-r from-gray-900 to-transparent w-full h-full justify-center">
                        <h1 className="text-white text-4xl font-bold">Affordable Price<br /> For Car Servicing</h1>
                        <p className="text-gray-100 mt-5">There are many variations of passages of  available, but<br /> the majority have suffered alteration in some form</p>
                        <div className="flex gap-5 mt-5">
                            <button className="btn btn-error">Discover More</button>
                            <button className="btn btn-outline btn-error">Latest Project</button>
                        </div>
                    </div>
                    <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-0 gap-10">
                        <a href="#slide5" className="btn btn-circle">❮</a>
                        <a href="#slide1" className="btn btn-circle">❯</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;