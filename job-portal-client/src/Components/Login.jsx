import { Link, useLocation, useNavigate } from 'react-router-dom';
import SocialLogin from './SocialLogin';
import toast from 'react-hot-toast';

// import useAuth from '../../hooks/useAuth';
const Login = () => {

    const { signIn } = useAuth();
    const location = useLocation();
    console.log(location);
    const navigate = useNavigate();
    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        if ((email, password)) {
            signIn(email, password)
                .then((result) => {
                    toast.success('User logged in successfully');
                    navigate(location?.state ? location?.state : '/');
                })
                .catch((err) => {
                    toast.error(err.message)
                });
        }
        else {
            toast.error("email or password can not be empty");
        }

    };


    return (
        <div className='sticky mb-[800px]'>
            <div className="hero  min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="card flex-shrink-0 w-full max-w-lg p-10 shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered text-black" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered text-black" required />

                            </div>
                            <div className="form-control mt-6">
                                <div className="p-6 pt-0">
                                    <button
                                        className="block w-full select-none rounded-lg bg-gradient-to-tr from-teal-600 to-teal-400 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-orange-500/20 transition-all hover:shadow-lg hover:shadow-orange-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                        type='submit'
                                        data-ripple-light="true"
                                    >
                                        Sign In
                                    </button>
                                    <p className="mt-6 flex justify-center font-sans text-sm font-light leading-normal text-teal-300 text-inherit antialiased">
                                        Do not have an account?
                                        <Link to='/register'
                                            state={{ from: location }}
                                            className="ml-1 block font-sans text-sm font-bold leading-normal text-teal-500 antialiased"
                                        >
                                            Sign up
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </form>
                        <SocialLogin></SocialLogin>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;