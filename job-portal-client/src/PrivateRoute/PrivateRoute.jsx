import { Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';

const PrivateRoute = ({children}) => {
const {user,loading} =useContext(AuthContext);
const  location= useLocation();

if(loading)
{
    return <span className="loading loading-spinner loading-lg"></span>
}
if(user?.email)
    {
        
    return children;
    } 
    
    return <Navigate state={location.pathname} to="/login" replace></Navigate>
};

export default PrivateRoute;