import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";

const SocialLogin = () => {
    const { googleLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location)
    const handleGoogleLogin = () => {
        // console.log("google login");
        googleLogin()
            .then(res => {
                // console.log(res)
                navigate(location?.state ? location?.state : '/');
            })
            .catch(err => {console.log(err)})
           
    }

    return (
        <div className="sticky">
            <div className="divider text-teal-500">continue with</div>
            <div className="">
                <button onClick={handleGoogleLogin} className="btn bg-teal-300 flex mx-auto mb-5">Google</button>
            </div>
        </div>
    );
};

export default SocialLogin;