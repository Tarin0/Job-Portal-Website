import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home";
import ErrorPage from "../Pages/ErrorPage";
import Login from "../Components/Login";
import Register from "../Components/Register";
import AddJobs from "../Components/AddJobs";
import MyBids from "../Components/MyBids";
import BidRequests from "../Components/BidRequests";
import PostedJobs from "../Components/PostedJobs";
import JobDetails from "../Components/JobDetails";
import UpdateJob from "../Components/UpdateJob";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
            path: '/',
            element: <Home></Home>,
            loader: () => fetch('https://job-portal-server-lemon.vercel.app/addJob',{credentials:'include'})
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
            path: '/add-jobs',
            element: (<PrivateRoute>
                <AddJobs></AddJobs>
            </PrivateRoute>)
        },
        {
            path: '/jobs/:id',
            element:(<PrivateRoute>
                <JobDetails></JobDetails>
            </PrivateRoute>),
            loader: ({ params }) => fetch(`https://job-portal-server-lemon.vercel.app/addJob/${params.id}`,{credentials:'include'})
        },
        {
            path: '/posted-jobs',
            element: (<PrivateRoute>
                <PostedJobs></PostedJobs>
            </PrivateRoute>),
            loader: () => fetch('https://job-portal-server-lemon.vercel.app/addJob',{credentials:'include'})
        },
        {
            path: '/my-bids',
            element: (<PrivateRoute>
                <MyBids></MyBids>
            </PrivateRoute>),
            loader: () => fetch('https://job-portal-server-lemon.vercel.app/bids')
        },
        {
            path: '/bid-req',
            element: (<PrivateRoute>
               <BidRequests></BidRequests>
            </PrivateRoute>) ,
            loader: () => fetch('https://job-portal-server-lemon.vercel.app/bids',{credentials:'include'})
        },
        {
            path: '/updateJob/:id',
            element: (<PrivateRoute>
                <UpdateJob></UpdateJob>
             </PrivateRoute>),
            loader: ({ params }) => fetch(`https://job-portal-server-lemon.vercel.app/addJob/${params.id}`)
        },
      ]
    },
  ]);

  export default router;