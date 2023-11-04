/* eslint-disable react/prop-types */
const Booking = ({booking}) => {
    return (
        <div className="max-w-6xl mx-auto my-20">
            <div className="grid grid-cols-3 gap-10">
                <h1>{booking.title}</h1>
                <h1>{booking.email}</h1>
                <h1>{booking.price}</h1>
            </div>
        </div>
    );
};

export default Booking;