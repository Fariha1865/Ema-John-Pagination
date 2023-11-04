import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Booking from "./Booking";
import { AuthContext } from "../../Providers/AuthProvider";


const Bookings = () => {
    
    const [bookings, setBookings] = useState([]);
    const {user}= useContext(AuthContext);
    useEffect(() => {

        axios.get(`http://localhost:5000/bookings?email=${'user?.email'}`,{withCredentials:true})
            .then(data => {
                setBookings(data.data)
                console.log(data.data)
            })

    }, [user?.email])
    return (
        <div>
            <div>
                {
                    bookings.map(booking=><Booking key={booking._id} booking={booking}/>)
                }
            </div>
        </div>
    );
};

export default Bookings;