import { useContext, useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import toast from "react-hot-toast";

const MyBids = () => {
    const bids = useLoaderData();
    const { user } = useContext(AuthContext);
    const { email } = user;

    // Filter the bids based on the user's email
    const myBids = bids.filter(bid => bid.email === email);

    // State to track the bids and update when status changes
    const [bidList, setBidList] = useState(myBids);

    // Function to handle marking a bid as complete
    const handleComplete = (bidId) => {
        const updatedBids = bidList.map(bid => {
            if (bid._id === bidId && bid.status === "in progress") {
                bid.status = "complete";
            }
            return bid;
        });

        setBidList(updatedBids);

        // Send a PUT request to update the bid status
        fetch(`https://job-portal-server-lemon.vercel.app/bids/${bidId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: "completed" }),
           
        })
        .then(response => response.json())
        .then(data => {
            if (data.modifiedCount > 0) {
                toast.success('Bid status updated to "complete"');
            } else {
                toast.error('Failed to update bid status');
                // Handle the failure scenario as needed
            }
        })
        .catch(error => {
            toast.error('An error occurred');
            console.log(error);
            // Handle the error scenario as needed
        });
    };

    return (
        <div>
            <p className="text-2xl md:text-4xl text-center font-semibold text-blue-gray-500 md:p-5">My Selected Bids</p>

            <div className="m-0 w-24 md:w-11/12 mx-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Job Title</th>
                            <th>Owner Email</th>
                            <th>Price</th>
                            <th>Deadline</th>
                            <th>Status</th>
                            <th>Button</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        bidList.map(bid => (
                            <tr key={bid._id}>
                                <td>
                                    <div className="md:flex items-center md:space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={bid.photo} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{bid.title}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{bid.ownerEmail}</td>
                                <td>{bid.price}</td>
                                <td>{bid.deadline}</td>
                                <td className="text-blue-500">{bid.status}</td>
                                <td>
                                    {bid.status === "in progress" && (
                                        <button className="btn btn-sm btn-accent md:btn-md" onClick={() => handleComplete(bid._id)}>
                                            Complete
                                        </button>
                                    )}
                                    {bid.status === "rejected" && (
                                        <button className="btn  btn-sm md:btn-md" disabled>
                                        Complete
                                    </button>
                                    )}
                                    {bid.status === "pending" && (
                                        <button className="btn  btn-sm md:btn-md" disabled>
                                        Complete
                                    </button>
                                    )}
                                    
                                                       
                                </td>
                            </tr>
                        )
                        )
                        }
                                    
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyBids;
