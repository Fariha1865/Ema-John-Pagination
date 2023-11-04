/* eslint-disable react/no-unescaped-entities */
import about1 from "../../assets/images/about_us/person.jpg"
import about2 from "../../assets/images/about_us/parts.jpg"
const AboutUs = () => {
    return (
        <div>
            <div className="hero min-h-screen">
                <div className="hero-content flex-col lg:flex-row gap-28  relative">
                    <div className="w-full relative">
                    <img src={about1} className="rounded-lg shadow-2xl w-96" />
                    <img src={about2} className="absolute rounded-lg w-72 shadow-2xl lg:left-52 left-28 -bottom-10" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">We are qualified &<br/> of experience in this field</h1>
                        <p className="py-6 text-gray-500">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. </p>
                        <p className="pt-2 pb-5 text-gray-500">the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.  </p>
                        <button className="btn btn-primary">Get More Info</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;