import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddJobs = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const { email } = user;
    const handleAddJob = e => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const deadline = form.deadline.value;
        const category = form.category.value;
        const maxPrice = form.maxPrice.value;
        const minPrice = form.minPrice.value;
        const photo = form.photo.value;
        const description = form.description.value;

        const newJob = { email, title,photo,description, category, deadline, maxPrice, minPrice };
        console.log(newJob);
        fetch('https://job-portal-server-lemon.vercel.app/addJob', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newJob),
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    toast.success("Job added successfully");
                    form.reset();
                    navigate("/posted-jobs");
                }
            })


    }
    return (
        <div>
            <h2 className="text-center text-3xl md:text-5xl pb-8">Add Job</h2>
            <form onSubmit={handleAddJob}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 lg:ml-40">
                    <div className="form-control ">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <label className="input-group">
                            <input
                                type="email"
                                name="email"
                                value={email}
                                readOnly // Make the field read-only
                                className="input input-bordered w-full md:w-3/4"
                            />
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Job Title</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="title" placeholder="Job Title" className="input input-bordered w-full md:w-3/4" required/>
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Deadline</span>
                        </label>
                        <label className="input-group">
                            <input type="date" name="deadline" placeholder="Deadline" className="input input-bordered w-full md:w-3/4" required/>
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Category</span>
                        </label>
                        <label className="input-group">
                            <select name="category" className="input input-bordered w-full md:w-3/4">
                                <option value="">Select Category</option>
                                <option value="Web Development">Web Development</option>
                                <option value="Digital Marketing">Digital Marketing</option>
                                <option value="Graphics Design">Graphics Design</option>

                            </select>
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Maximum Price</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="maxPrice" placeholder="Maximum Price" className="input input-bordered w-full md:w-3/4" required/>
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Minimum Price</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="minPrice" placeholder="Minimum Price" className="input input-bordered w-full md:w-3/4" required/>
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo Url</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="photo" placeholder="Photo URL" className="input input-bordered w-full md:w-3/4" required/>
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <label className="input-group">
                            
                        <textarea name="description" placeholder="Description" className="textarea textarea-bordered textarea-md w-full md:w-3/4" required></textarea>
                            {/* <input type="text" name="description" placeholder="Description" className="input input-bordered w-full md:w-3/4" /> */}
                        </label>
                    </div>


                </div>
                <input type="submit" value="Add Job" className="btn w-3/4 md:ml-40 mt-4 bg-gradient-to-r from-teal-200 to-teal-400" />
            </form>
        </div>
    );
};

export default AddJobs;