import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import '../style/FAQ.css'
const faqData = [
    {
        id: 1,
        question: 'How do I create an account on the job portal?',
        answer: 'To create an account, click on the "Sign Up" button on the homepage. Fill in your details, including your name, email, and password. Once submitted, your account will be created, and you can start using our services.',
    },
    {
        id: 2,
        question: 'How can I post a job listing on the portal?',
        answer: 'Employers can post job listings by logging into their accounts and clicking on "Post a Job." Fill in the job details, such as job title, description, category, and requirements. After submitting the listing, it will be visible to job seekers.',
    },
    {
        id: 3,
        question: 'Can I search for jobs without an account?',
        answer: 'Yes, you can search for job listings without creating an account. Use the search bar on the homepage to find jobs by keywords, category, or location. However, creating an account allows you to save favorite jobs and receive job alerts.',
    },
    {
        id: 4,
        question: 'What is the application process for job seekers?',
        answer: 'To apply for a job, job seekers need to create an account or log in if they already have one. Then, click on the desired job listing and follow the application instructions provided by the employer, which may include submitting a resume or cover letter.',
    },
    {
        id: 5,
        question: 'How can I contact support for assistance?',
        answer: 'If you need assistance or have questions, you can contact our support team through the "Contact Us" page. We are here to help with any issues or inquiries you may have regarding our job portal services.',
    },
];


const FAQ = () => {
    const [click, setClick] = useState(null);

    const toggle = (index) => {
        if (click === index) {
            setClick(null);
        } else {
            setClick(index);
        }
    };

    return (
        <div className='space-y-4 sticky top-[600px]'>
           

<h2 className="text-3xl text-[#1eb2a6] text-center"> FAQS</h2>
            <h3 className="text-5xl fone-medium text-center pb-4">Frequesntly Ask Question</h3>
      
            {faqData.map((faq, index) => (
                <div className="relative  mb-3" key={faq.id}>
                    <h6 className="mb-0 item">
                        <button
                            className="border-slate-100 text-slate-700 rounded-t-1 group relative flex w-full cursor-pointer items-center border-b border-solid p-4 text-left font-semibold text-dark-500 transition-all ease-in"
                            data-collapse-target={`animated-collapse-${faq.id}`}
                            onClick={() => toggle(index)}
                        >
                            <span>{faq.question}</span>
                            <FontAwesomeIcon
                                icon={faChevronDown}
                                className={`absolute right-0 pt-1 text-base transition-transform ${
                                    click === index ? 'rotate-180' : ''
                                }`}
                            />
                        </button>
                    </h6>
                    <div
                        data-collapse={`animated-collapse-${faq.id}`}
                        className={`h-0 overflow-hidden transition-all duration-300 ease-in-out ${
                            click === index ? 'h-auto' : ''
                        }`}
                    >
                        <div className="p-4 text-sm leading-normal text-blue-gray-500/80">
                            {faq.answer}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FAQ
