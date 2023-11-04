import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import cart from "../assets/cart.png";
import search from "../assets/search.png";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
const Navbar = () => {

    const {user,logOut} = useContext(AuthContext);
    
    const links = <>
        
            <div className="flex gap-5 text-lg font-bold items-center">
                <NavLink to="/"><li>Home</li></NavLink>
                <NavLink to="/about"><li>About</li></NavLink>
                <NavLink to="/bookings"><li>bookings</li></NavLink>
                <NavLink to="/blog"><li>Blog</li></NavLink>
                <NavLink to="/contact"><li>Contact</li></NavLink>
                
                
               {
                 user ? <button onClick={logOut} className="btn">LogOut</button>:<div className="flex gap-5 items-center"><NavLink to="/login"><li>Login</li></NavLink> <NavLink to="/register"><li>Register</li></NavLink></div> 
               }
                
            </div>
        

    </>
    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {links}
                        </ul>
                    </div>
                    <img src={logo}/>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end flex gap-5">
                <img src={cart}/>
                <img src={search}/>
                <button className="btn btn-outline btn-error">Appointment</button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;