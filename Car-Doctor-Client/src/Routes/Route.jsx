import {
  createBrowserRouter,
} from "react-router-dom";
import Root from "../Pages/Root/Root";
import Home from "../Pages/Home/Home";
import Services from "../Pages/Home/Services/Services";
import ServiceDetails from "../Pages/ServiceDetails/ServiceDetails";
import Checkout from "../Pages/CheckOut/Checkout";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Bookings from "../Pages/Bookings/Bookings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,

    children: [
        {
            path: "/",
            errorElement: <ErrorPage></ErrorPage>,
            element: <Home/>
        },
        {
            path: "/services",
            element: <Services/>
        },
        {
            path: "/service/:id",
            element: <ServiceDetails/>
        },
        {
            path: "/book/:id",
            element: <Checkout/>
        },
        {
            path: "/login",
            element: <Login/>
        },
        {
            path: "/register",
            element: <Register/>
        },
        {
            path: "/bookings",
            element: <Bookings/>
        }
    ]
  },
]);


export default router;