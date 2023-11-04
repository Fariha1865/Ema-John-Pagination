import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './toast.css'
import { GoogleAuthProvider, getAuth, signInWithPopup, updateProfile } from "firebase/auth";
import app from "../../firebase.config";
import { AiFillGoogleCircle , AiFillEye, AiFillEyeInvisible} from "react-icons/ai"

const successToast = (success) => {



    toast.success(success, {
        className: 'custom-toast',
        autoClose: 4000,
    })
}


const errorToast = (error) => {

    toast.error(error, {
        className: 'custom-toast',
        autoClose: 4000,
    })
}

const Register = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [acceptedState, setAcceptedState] = useState(false);
    const [showPassword, setShowPassword] = useState(false);


    const { createUser } = useContext(AuthContext)
    const auth = getAuth(app);
    const { setUser,isDarkMode } = useContext(AuthContext);

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, new GoogleAuthProvider())
            .then((result) => {
                const user = result.user;
                console.log('Google Sign-In Successful:', user);
                setUser(user);
                successToast(`  You have successfully registered `)
                setTimeout(function () {
                    window.location.reload();
                }, 2000);
            })
            .catch((error) => {
                console.error('Google Sign-In Error:', error.message);

            });
    };

    const handleSignUpFormSubmit = e => {
        e.preventDefault();
        const form = new FormData(e.currentTarget)
        const email = form.get("email");
        const password = form.get("pass");
        const name = form.get("name");
        const photo = form.get("photo");

        setAcceptedState(e.target.terms.checked);

        setErrorMessage('');
        setSuccessMessage('');

        if (password.length < 6) {

            setErrorMessage("Password cannot be less that 6 characters");
            errorToast("Password cannot be less that 6 characters")
            return;


        }



        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\-]).{8,}$/.test(password)) {
            errorToast("password must have: At-least one small letter, At-least one capital letter and At-least one digit")
            setErrorMessage(`password must have: At-least one small letter, At-least one capital letter and At-least one special character`);
            return;
        }
        if (!acceptedState) {
            errorToast("Please accept terms and conditions")
            setErrorMessage("Please accept terms and conditions");
            return;
        }


        e.target.email.value = "";
        e.target.pass.value = "";
        e.target.name.value = "";
        e.target.photo.value = "";

        createUser(email, password)
            .then(Result => {
                console.log(Result.user)
                setSuccessMessage("You have successfully registered");
                setUser(Result.user);


                updateProfile(Result.user, {
                    displayName: name,
                    photoURL: photo

                })


                successToast(`  You have successfully registered `)
                
                setTimeout(function () {
                    window.location.reload();
                }, 2000);

            })

            .catch(error => {
                console.log(error.message)

                errorToast(error.message)

            })


    }
    return (
        <div className={`${isDarkMode ? "bg-black":"bg-blue-100"}`}>
            <ToastContainer className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 " />
            <div className="max-w-xl mx-auto py-20 px-5">
                <div className="relative flex  flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg shadow-gray-200">
                    <div className="relative mx-4 -mt-6 mb-4 grid h-28 place-items-center overflow-hidden rounded-xl bg-blue-900 bg-clip-border text-white shadow-lg shadow-pink-500/40">
                        <h3 className="block font-sans text-3xl font-semibold leading-snug tracking-normal text-white antialiased">
                            Sign Up
                        </h3>
                    </div>
                    <form onSubmit={handleSignUpFormSubmit}>
                        <div className="flex flex-col gap-4 p-6">
                            <div className="relative h-11 w-full min-w-[200px]">
                                <input type="text" name="name"
                                    className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"

                                />
                                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                    Username
                                </label>
                            </div>
                            <div className="relative h-11 w-full min-w-[200px]">
                                <input type="text" name="photo"
                                    className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"

                                />
                                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                    Photo URL
                                </label>
                            </div>
                            <div className="relative h-11 w-full min-w-[200px]">
                                <input type="email" name="email"
                                    className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"

                                />
                                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                    Email
                                </label>
                            </div>
                            <div className="relative h-11 w-full min-w-[200px]">
                                <input type={showPassword ? "text" : "password"} name="pass"
                                    className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"

                                />
                                <span onClick={() => setShowPassword(!showPassword)} className="absolute top-4 right-5">
                                    {
                                        showPassword ? <AiFillEyeInvisible></AiFillEyeInvisible> : <AiFillEye></AiFillEye>

                                    }

                                </span>
                                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                    Password
                                </label>
                            </div>

                            <div className="ml-7">
                                <input onClick={() => setAcceptedState(!acceptedState)} type="checkbox" name="terms" id="terms" className="mr-4" />
                                <label>Accept terms and Conditions</label>
                            </div>

                        </div>

                        {
                            errorMessage && <p className="ml-20 mb-5 text-red-800 font-bold">{errorMessage}</p>
                        }
                        {
                            successMessage && <p className="ml-20 mb-5 text-green-800 font-bold">{successMessage}</p>
                        }
                        <div className="p-6 pt-0">
                            <input type="submit" value="Sign Up" className="block w-full select-none rounded-lg bg-blue-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            />


                            <p className="mt-6 flex justify-center font-sans text-sm font-light leading-normal text-inherit antialiased">
                                Already have an account?
                                <Link to="/login"


                                    className="ml-1 block font-sans text-sm font-bold leading-normal text-[#752727] antialiased"
                                >
                                    Sign In
                                </Link>
                            </p>
                        </div>




                    </form>
                    <div className="flex justify-center mb-10">
                        <div onClick={handleGoogleSignIn} className="bg-blue-900 text-white cursor-pointer mt-5 flex justify-center items-center gap-2 w-56 py-2 border border-black rounded-t-lg">
                            <AiFillGoogleCircle></AiFillGoogleCircle>
                            <h1>Sign Up with Google</h1>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default Register;