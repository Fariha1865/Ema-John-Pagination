import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ServiceDetails = () => {

    const { id } = useParams()
    const [service, setService] = useState({})
    useEffect(() => {
        axios.get(`http://localhost:5000/service/${id}`)
            .then(data => {

                setService(data.data[0])
            })
    }, [id])
    return (
        <div>
            <img src={service.img} className="mx-auto" />
            <div className="flex justify-center">
                <Link to={`/book/${service._id}`}><button className="btn text-white my-10 bg-[#FF3811]">CheckOut</button></Link>
            </div>
        </div>
    );
};

export default ServiceDetails;