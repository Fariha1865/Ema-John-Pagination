import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const Service = ({ service }) => {

    const { _id,img, title, price } = service;
    const navigate = useNavigate();

    const handleDetails = ()=>{
           
        navigate(`/service/${_id}`)
          
    }
    return (
        <div> 
            <div className="card bg-base-100 shadow-xl cursor-pointer" onClick={handleDetails}>
                <img src={img} alt="Shoes" className="h-52" />
                <div className="card-body">
                    <h2 className="card-title font-bold">{title}</h2>
                    <p className="text-xl font-semibold text-[#FF3811]">${price}</p>
                </div>

            </div>
        </div>
    );
};

export default Service;