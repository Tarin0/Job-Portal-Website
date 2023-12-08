import { Link } from 'react-router-dom';

const TabCard = ({ jobs }) => {
    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? text.slice(0, maxLength) + '.......' : text;
    };
    return (
        <div className="grid m-2 md:pl-16 md:m-16 md:grid-cols-2 gap-10">
            {jobs.map((job, index) => {
                const { _id,category, photo, title, description, maxPrice, minPrice, deadline } = job; // Destructure the job object here

                return (
                    <div key={index} className="card w-10/12 glass">
                        <figure>
                            <img src={photo} alt={category} className="h-64 w-full" />
                        </figure>
                        <div className="p-4 ">
                            <h2 className="text-xl text-center pb-2">{title}</h2>
                            <h2 className="text-sm text-gray-500 pb-2">{truncateText(description, 140)}
                                {description.length > 150 && (
                                    <span className='text-gray-900'> 
                                        <Link to={`/jobs/${_id}`}> Read more</Link>
                                    </span>
                                )}
                            </h2>
                            <div className='flex gap-20 pb-2'>
                                <h2 className="text-sm text-gray-600">Price Range: {minPrice} - {maxPrice}</h2>
                                <h2 className="text-sm text-gray-600">Deadline: {deadline}</h2>
                            </div>

                            <div className="card-actions justify-center">
                                <Link to={`/jobs/${_id}`}>
                                    <button className="btn bg-gray-200">Bid Now!</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default TabCard;
