import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import app from "../../firebase.config";
import { AiFillGoogleCircle, AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Register/toast.css'

const Login = () => {

    const [showPassword, setShowPassword] = useState(false);

    const errorToast = (error) => {

        toast.error(error, {
            className: 'custom-toast',
            autoClose: 4000,
        })
    }
    const successToast = (success) => {

        toast.success(success, {
            className: 'custom-toast',
            autoClose: 4000,
        })
    }

    const { signIn ,isDarkMode} = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const handleSignInFormSubmit = e => {
        e.preventDefault();
        const form = new FormData(e.currentTarget)
        const email = form.get("email");
        const password = form.get("pass");

        signIn(email, password)
            .then(result => {
                console.log(result.user)
                successToast(`  You have successfully logged in `);
                setUser(result.user)
                setTimeout(function () {
                    navigate(location?.state ? location.state : "/")
                }, 2000);


            })
            .catch(error => {
                console.log(error.message)
                if (error.message === "Firebase: Error (auth/invalid-login-credentials).") {

                    errorToast("Invalid User Credentials")
                }
            })

    }

    const auth = getAuth(app);
    const { setUser } = useContext(AuthContext);

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, new GoogleAuthProvider())
            .then((result) => {
                const user = result.user;
                console.log('Google Sign-In Successful:', user);
                setUser(user);
                successToast(`  You have successfully logged in `)
                setTimeout(function () {
                    navigate(location?.state ? location.state : "/")
                }, 2000);
            })
            .catch((error) => {
                console.error('Google Sign-In Error:', error.message);


            });
    };


    return (
        <div className={`${isDarkMode ? "bg-black":"bg-blue-100"}`}>
            <div className="max-w-xl mx-auto py-20 px-5">
                <ToastContainer className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 " />
                <div className="relative flex  flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg shadow-gray-200">
                    <div className="relative mx-4 -mt-6 mb-4 grid h-28 place-items-center overflow-hidden rounded-xl bg-blue-900 bg-clip-border text-white shadow-lg shadow-pink-500/40">
                        <h3 className="block font-sans text-3xl font-semibold leading-snug tracking-normal text-white antialiased">
                            Sign In
                        </h3>
                    </div>
                    <form onSubmit={handleSignInFormSubmit} className="h-80">
                        <div className="flex flex-col gap-4 p-6">
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
                            <div className="-ml-2.5">
                                <div className="inline-flex items-center">
                                    <label
                                        className="relative flex cursor-pointer items-center rounded-full p-3"
                                        htmlFor="checkbox"
                                        data-ripple-dark="true"
                                    >
                                        <input
                                            type="checkbox"
                                            className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-pink-500 checked:bg-pink-500 checked:before:bg-pink-500 hover:before:opacity-10"
                                            id="checkbox"
                                        />
                                        <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-3.5 w-3.5"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                stroke="currentColor"

                                            >
                                                <path

                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"

                                                ></path>
                                            </svg>
                                        </span>
                                    </label>
                                    <label
                                        className="mt-px cursor-pointer select-none font-light text-gray-700"
                                        htmlFor="checkbox"
                                    >
                                        Remember Me
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 pt-0">
                            <input type="submit" value="Sign In" className="block w-full select-none rounded-lg bg-blue-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            />


                            <p onClick={""} className="mt-3 cursor-pointer">Forgot Password ?</p>
                            <p className="mt- flex justify-center font-sans text-sm font-light leading-normal text-inherit antialiased">
                                Do not have an account?
                                <Link to="/register"


                                    className="ml-1 block font-sans text-sm font-bold leading-normal text-[#752727] antialiased"
                                >
                                    Sign up
                                </Link>
                            </p>
                        </div>

                    </form>
                    <div className="flex justify-center mb-10 mt-3">
                        <div onClick={handleGoogleSignIn} className="bg-blue-900 text-white cursor-pointer mt-5 flex justify-center items-center gap-2 w-56 py-2 border border-black rounded-t-lg">
                            <AiFillGoogleCircle></AiFillGoogleCircle>
                            <h1>Sign In with Google</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;