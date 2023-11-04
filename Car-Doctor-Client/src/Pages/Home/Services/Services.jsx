/* eslint-disable react/no-unescaped-entities */
import axios from "axios";
import { useEffect, useState } from "react";
import Service from "./Service";

const Services = () => {

    const [services, setServices] = useState([]);
    useEffect(() => {

        axios.get("http://localhost:5000/services")
            .then(data => {
                setServices(data.data)
            })

    }, [])
    return (
        <div> 
            <h1 className="text-center text-xl font-bold text-[#FF3811]">Services</h1>
            <h1 className="text-center text-2xl font-bold mt-2">Our Service Area</h1>
            <p className="text-center text-gray-500 mt-2">the majority have suffered alteration in some form, by injected humour,<br/> or randomised words which don't look even slightly believable.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-10">
                {
                    services.map(service => <Service key={service._id} service={service}></Service>)
                }
            </div>
        </div>
    );
};

export default Services;