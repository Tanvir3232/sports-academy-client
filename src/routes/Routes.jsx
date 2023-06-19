import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Home from "../pages/Home/Home/Home";
import Dashboard from "../layouts/Dashboard";
import AllUser from "../pages/Dashboard/AdminDashboard/AllUser/AllUser";
import AddClass from "../pages/Dashboard/InstructorDashboard/AddClass/AddClass";
import MyClasses from "../pages/Dashboard/InstructorDashboard/MyClasses/MyClasses";
import UpdateClass from "../pages/Dashboard/InstructorDashboard/UpdateClass/UpdateClass";
import AllClass from "../pages/Dashboard/AdminDashboard/AllClass/AllClass";
import Instructors from "../pages/Instructors/Instructors";
import Classes from "../pages/Classes/Classes";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Secret from "../pages/Secret";
import SelectedClasses from "../pages/Dashboard/StudentDashboard/SelectedClasses/SelectedClasses";
import Payment from "../pages/Dashboard/StudentDashboard/Payment/Payment";
import EnrolledClasses from "../pages/Dashboard/StudentDashboard/EnrolledClasses/EnrolledClasses";
import PaymentHistory from "../pages/Dashboard/StudentDashboard/PaymentHistory/PaymentHistory";
import InstructorRoute from "./InstructorRoute";
import AdminRoute from "./AdminRoute";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement:<ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path:'/instructors',
        element:<Instructors></Instructors>
      },
      {
        path:'/secret',
        element:<PrivateRoute><Secret></Secret></PrivateRoute>
      },
      {
        path:'/classes',
        element:<Classes></Classes>
      }
    ]
  },
  {
    path: '/dashboard',
    element: <Dashboard></Dashboard>,
    children: [
      {
        path:'',
        element: <DashboardHome></DashboardHome>
      },
      {
        path:'users',
        element:<AdminRoute><AllUser></AllUser></AdminRoute>
      },
      {
        path:'allclasses',
        element:<AdminRoute><AllClass></AllClass></AdminRoute>
      },
      // instructor routes
      {
        path:'addclass',
        element:<InstructorRoute><AddClass></AddClass></InstructorRoute>
      },
      {
        path:'updateclass/:id',
        element:<InstructorRoute><UpdateClass></UpdateClass></InstructorRoute>
      },
      {
        path:'myclasses',
        element:<InstructorRoute><MyClasses></MyClasses></InstructorRoute>
      },
      //Student routes
      {
         path:'selectedClasses',
         element:<PrivateRoute><SelectedClasses></SelectedClasses></PrivateRoute>
      },
      {
         path:'enrolledClasses',
         element:<PrivateRoute><EnrolledClasses></EnrolledClasses></PrivateRoute>
      },
      {
         path:'paymenthistory',
         element:<PrivateRoute><PaymentHistory></PaymentHistory></PrivateRoute>
      },
      {
         path:'payment/:id',
         element:<PrivateRoute><Payment></Payment></PrivateRoute>
      }
    ]
  }
]);
export default router;