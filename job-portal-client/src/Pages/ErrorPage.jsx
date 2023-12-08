import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <img src="https://i.ibb.co/Fzk6q2L/giphy.gif" alt="Error" className="max-w-md mb-4" />
            <h1 className="text-5xl font-bold text-red-500">Error Found</h1>
            <p className="text-lg text-gray-500 mb-8">Something went wrong. Please try again.</p>
            <Link to="/" className="text-blue-500 text-xl hover:underline">
                Back to Home
            </Link>
        </div>
    );
};

export default ErrorPage;
