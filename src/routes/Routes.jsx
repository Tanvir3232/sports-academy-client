import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Home from "../pages/Home/Home/Home";
import Dashboard from "../layouts/Dashboard";
import AllUser from "../pages/Dashboard/AdminDashboard/AllUser/AllUser";
import AddClass from "../pages/Dashboard/InstructorDashboard/AddClass/AddClass";

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
      // instructor routes
      {
        path:'addclass',
        element:<AddClass></AddClass>
      }
    ]
  }
]);
export default router;