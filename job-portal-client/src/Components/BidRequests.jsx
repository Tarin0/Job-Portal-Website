import { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import toast from "react-hot-toast";


const BidRequests = () => {
    const bids = useLoaderData();
    const { user } = useContext(AuthContext);
    const { email } = user;
    // const bidRequests = bids.filter(bid => bid.ownerEmail === email);


    
    // Filter the initial bids with a different variable name
    const initialBidRequests = bids.filter(bid => bid.ownerEmail === email);

    // Use state to track the bid data
    const [bidRequests, setBidRequests] = useState(initialBidRequests);

   

    const handleBidAction = (bidId, action) => {
        const updatedBids = bidRequests.map(bid => {
            if (bid._id === bidId) {
                bid.status = action;

                // Send a PUT request to update bid status
                fetch(`https://job-portal-server-lemon.vercel.app/bids/${bid._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ status: action }),
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.modifiedCount>0) {
                            toast.success('Bid status updated');
                        } else {
                            toast.error('Failed to update bid status');
                            bid.status = 'pending'; // Revert status on failure
                        }
                    })
                    .catch(error => {
                        toast.error('An error occurred');
                        console.log(error);
                        bid.status = 'pending'; // Revert status on network error
                    });
            }
            return bid;
        });
        setBidRequests(updatedBids);

        
    };
    useEffect(() => {
        setBidRequests(initialBidRequests);
    }, [initialBidRequests]);
    return (
        <div>
            <p className="text-2xl md:text-4xl text-center font-semibold text-blue-gray-500 md:p-5">Requested Bids</p>

            <div className="m-0 w-11/12 mx-auto">
                <table className="table">
                    {/* head */}
                    <thead className="w-full bg-teal-50">
                        <tr>
                            <th className="">Job Title</th>
                            <th>Email(who bid the job)</th>
                            <th>Price </th>
                            <th>Deadline </th>
                            <th>Status </th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            bidRequests.map(bid => <tr key={bid._id}>
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
                                <td>
                                    {bid.email}

                                </td>
                                <td>{bid.price}</td>
                                <td>
                                    {bid.deadline}
                                </td>

                                <td className={bid.status === "in progress" ? "text-blue-500" : bid.status === "rejected" ? "text-red-500" : ""}
                                >
                                    {bid.status}
                                </td>
                                <td>
                                    {bid.status === "pending" && (
                                        <button
                                            className="btn btn-sm"
                                            onClick={() => handleBidAction(bid._id, "in progress")}
                                        >
                                            Accept
                                        </button>
                                    )}
                                </td>
                                <td>
                                    {bid.status === "pending" && (
                                        <button
                                            className="btn btn-sm"
                                            onClick={() => handleBidAction(bid._id, "rejected")}
                                        >
                                            Reject
                                        </button>
                                    )}
                                </td>

                            </tr>)
                        }

                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default BidRequests;