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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
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
      }
    ]
  },
  {
    path: '/dashboard',
    element: <Dashboard></Dashboard>,
    children: [
      // admin route
      {
        path: 'adminhome',
        element: <div>Admin Home</div>
      },
      {
        path:'users',
        element:<AllUser></AllUser>
      },
      {
        path:'allclasses',
        element:<AllClass></AllClass>
      },
      // instructor routes
      {
        path:'addclass',
        element:<AddClass></AddClass>
      },
      {
        path:'updateclass/:id',
        element:<UpdateClass></UpdateClass>
      },
      {
        path:'myclasses',
        element:<MyClasses></MyClasses>
      }
    ]
  }
]);
export default router;