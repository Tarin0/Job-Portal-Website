import { useContext, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import toast from "react-hot-toast";
import Swal from "sweetalert2";


const PostedJobs = () => {
    const jobs = useLoaderData();

    const { user } = useContext(AuthContext);
    const { email } = user;
    const myPostedJobs = jobs?.filter(job => job.email === email);
    const [postedJobs,setPostedJobs] = useState(myPostedJobs);
  
    // const handleDelete = id => {

    //     fetch(`https://job-portal-server-lemon.vercel.app/addJob/${id}`, {
    //         method: 'DELETE'
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data);
    //             if (data.deletedCount > 0) {
    //                 toast.success("deleted successfully");

    //                 const remainingJobs = postedJobs.filter(job => job._id !== id);
    //                 // console.log("after delete",remainingJobs);
    //                 setPostedJobs(remainingJobs);
                    
    //             }
    //         })
    // }


    const handleDelete = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this job!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                // User confirmed the deletion
                fetch(`https://job-portal-server-lemon.vercel.app/addJob/${id}`, {
                    method: 'DELETE',
                    credentials: 'include'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            toast.success('Job deleted successfully');
    
                            const remainingJobs = postedJobs.filter(job => job._id !== id);
                            setPostedJobs(remainingJobs);
                        }
                    });
            }
        });
    };
    
    return (
        <div>
            <p className="text-2xl md:text-4xl text-center font-semibold text-blue-gray-500 md:p-5">My Posted Jobs</p>

            <div className="grid m-2 md:pl-16 md:m-16 md:grid-cols-2 gap-10">
                {postedJobs.map((job, index) => {
                    const { _id, category, photo, title, description, maxPrice, minPrice, deadline } = job; // Destructure the job object here

                    return (
                        <div key={index} className="card w-10/12 glass">
                            <figure>
                                <img src={photo} alt={category} className="h-64 w-full" />
                            </figure>
                            <div className="p-4 ">
                                <h2 className="text-xl text-center pb-2">{title}</h2>
                                <h2 className="text-sm text-gray-500 pb-2">{description}
                                </h2>
                                
                                <h2 className="text-sm text-gray-500 pb-2">Category: {category}
                                </h2>
                                <div className='flex gap-20 pb-2'>
                                    <h2 className="text-sm text-gray-600">Price Range: {minPrice} - {maxPrice}</h2>
                                    <h2 className="text-sm text-gray-600">Deadline: {deadline}</h2>
                                </div>

                                <div className="card-actions justify-around">
                                    <Link to={`/updateJob/${_id}`}>
                                        <button className="btn bg-gray-200">Update</button>
                                    </Link>
                                        <button onClick={() => handleDelete(_id)} className="btn bg-gray-200">Delete</button>
                                    
                                </div>
                               
                            </div>
                            </div>
                        
                    );
                })}
            </div>

        </div>
    );
};

export default PostedJobs