import { useNavigate } from "react-router-dom";

const ErrorPage = () => {

    const navigate = useNavigate();

    const goBack = () => {

        navigate("/");
    }
    return (
        <div>
            <h1 className="text-3xl font-bold text-center mt-14">Ooopsss!!! Page Not Found</h1>

            {
                <div className="flex justify-center mt-5">

                    <button onClick={goBack} className="btn bg-[#752727] text-white hover:bg-[#752727] mb-10">Go Back</button>

                </div>
            }
            <div className="flex justify-center h-80">
                <img src="https://i.ibb.co/PQ2nntf/error.gif" alt="" />
            </div>

        </div>
    );
};

export default ErrorPage;