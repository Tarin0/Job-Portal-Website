import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../Providers/AuthProvider";
import SocialLogin from "./SocialLogin";


const Register = () => {

    const { createUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    // console.log(location.state);
    const handleSignUp = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{6,}$/;

        if (!passwordRegex.test(password)) {
            toast.error('Password length at least six characters , one Capital letter & one special character:');
            return;
        }
        else {

            createUser(email, password)
                .then(result => {
                    // console.log(result.user);
                    toast.success('User registered  successfully');
                    const user = { email, name, photo };
                    fetch('https://job-portal-server-lemon.vercel.app/user', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(user)
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                            if (data.insertedId) {
                                toast.success('User added in DB');
                                navigate('/');
                            }
                        })
                })
                .catch(error => {
                    toast.error(error.message)
                })

        }
    }

    return (
        <div className="sticky mb-[800px]">
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content w-full flex-col lg:flex-row-reverse">
                    <div className="card flex-shrink-0 w-full max-w-lg px-10 shadow-2xl bg-base-100">
                        <form onSubmit={handleSignUp} className="card-body w-full">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name="name" placeholder="Name" className=" input input-bordered text-black" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text" name="photo" placeholder="URL" className="input input-bordered text-black" required />
                            </div>
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
                                        Sign Up
                                    </button>
                                    <p className="mt-6 flex justify-center text-teal-300 font-sans text-sm font-light leading-normal text-inherit antialiased">
                                        Already have an account?
                                        <Link to='/login'
                                            className="ml-1 block font-sans text-sm font-bold leading-normal text-teal-700 antialiased"
                                        >
                                            Sign in
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

export default Register;