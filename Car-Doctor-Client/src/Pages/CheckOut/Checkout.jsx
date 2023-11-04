import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Checkout = () => {

    const { id } = useParams()
    const [service, setService] = useState({})
    useEffect(() => {
        axios.get(`http://localhost:5000/service/${id}`)
            .then(data => {

                setService(data.data[0])
            })
    }, [id])

    const handleAddCoffee = e => {
        e.preventDefault();

        const form = e.target;

        const firstName = form.firstName.value;
        const lastName = form.lastName.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const message = form.message.value;
        const title = service.title;
        const price = service.price;
        const order = { firstName,lastName,email,phone,message,title,price };

        console.log(order);

        axios.post('http://localhost:5000/order', order)
            // fetch('http://localhost:5000/coffee',{

            //     method: 'POST',
            //     headers: {
            //         'content-type': 'application/json'
            //     },
            //     body: JSON.stringify(newCoffee)
            // })
            //     .then(res => res.json())
            .then(data => {
                console.log(data.data)

                if (data.data.insertedId) {
                    alert('Booking successful !!')
                    form.reset();
                }
            })

    }
    return (
        <div className="bg-gray-200 h-screen">
            <h1 className="text-4xl text-center font-bold pt-5 text-amber-950">Add a new coffee</h1>

            <form onSubmit={handleAddCoffee}>
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-10">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">First Name</span>
                            </label>
                            <input type="text" name="firstName" placeholder="First Name" className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Last Name</span>
                            </label>
                            <input type="text" name="lastName" placeholder="Last Name" className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Phone</span>
                            </label>
                            <input type="text" name="phone" placeholder="Phone Number" className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="Email" className="input input-bordered w-full" />
                        </div>
                    </div>

                    <div className="form-control w-full px-10 mb-5">
                        <label className="label">
                            <span className="label-text">Your Message</span>
                        </label>
                        <textarea name="message" id="message" cols="30" rows="5" placeholder="Your Message" className="p-5"></textarea>
                    </div>



                </div>
                <div className="flex justify-center">
                    <input type="submit" value="Add Coffee" className="btn w-1/2  bg-amber-950 hover:bg-amber-900 text-white" />
                </div>
            </form>
        </div>
    );
};

export default Checkout;