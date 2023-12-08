import { useContext } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import toast from "react-hot-toast";


const JobDetails = () => {

    const navigate = useNavigate();
    const job = useLoaderData();
    const { photo, title, description, maxPrice, minPrice, deadline } = job; // Destructure the job object here
    const { user } = useContext(AuthContext);
    const { email } = user;
    const handleBids = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const price = form.price.value;
        const deadline = form.deadline.value;
        const ownerEmail = form.ownerEmail.value;
        // console.log(email, ownerEmail, price, deadline,title,photo);
        const newBid = { email, ownerEmail, price, deadline,title,photo,maxPrice, minPrice,status: 'pending'};
        console.log(newBid);
        fetch('https://job-portal-server-lemon.vercel.app/bids', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newBid)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    toast.success("Your Bids added successfully");
                    form.reset();
                    navigate("/my-bids");
                }
            })


    }
    const isBidButtonDisabled = email === job.email;
    console.log('Is Bid Button Disabled:', isBidButtonDisabled);
    return (
        <div className="">
            <div className="my-10 relative flex mx-auto flex-col text-gray-700 bg-blue-gray-50 w-3/6 rounded-xl bg-clip-border">
                <div className="relative overflow-hidden text-gray-700 bg-blue-gray-50 md:h-96  bg-clip-border">
                    <img
                        src={photo}
                        className="object-cover w-full md:h-full"
                    />
                </div>
                <div className="p-2 md:p-6">
                    <div className="flex items-center justify-between mb-2">
                        <p className="block font-sans text-base antialiased font-semibold leading-relaxed text-blue-gray-900">
                            {title}
                        </p>
                        <p className="flex items-center gap-1.5 font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased">
                            {maxPrice} - {minPrice}
                        </p>

                    </div>
                    <p className="pb-2 block  font-sans text-base antialiased  leading-relaxed text-blue-gray-900">
                        Deadline : {deadline}
                    </p>
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
                        {description}
                    </p>
                </div>

            </div>
            <div className="card mx-auto flex-shrink-0 w-3/6  bg-base-100">
                <h2 className="text-4xl font-medium text-teal-500 text-center mt-10">Place Your Bid Form</h2>
                <form onSubmit={handleBids} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input value={email} readOnly type="email" name="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Price</span>
                        </label>
                        <input type="text" name="price" placeholder="Your Biding Amount" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Deadline</span>
                        </label>
                        <input type="date" name="deadline" placeholder="Deadline Date" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Job Owner Email</span>
                        </label>
                        <input value={job.email} readOnly type="email" name="ownerEmail" className="input input-bordered" required />
                    </div>

                    <div className="form-control mt-6">
                        <button  className={`btn bg-gradient-to-tr from-teal-600 to-teal-400 text-xl ${isBidButtonDisabled ? 'btn-disabled' : ''}`}>Bid On The Job</button>
                    </div>

                </form>
            </div>
        </div>

    );
};

export default JobDetails;