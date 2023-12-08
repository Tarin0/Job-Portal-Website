Live Link: https://inquisitive-tulumba-ee0976.netlify.app




Here are 8 key features of my job portal website based on the provided requirements:

1. **User-Friendly Navigation**: The website includes a navigation bar that remains consistent across all pages (except the 404-page). The navigation bar features the website logo and name, along with links to key sections: Home, Add Job, My Posted Jobs, My Bids, Bid Requests, User Profile, and Register/Login.

2. **User Authentication**: The website incorporates a robust user authentication system. It offers a Registration page where users can create an account with their name, email, password, and photo. The Login page provides options for email/password login and Google Sign-in.

3. **Home Page**: The Home Page features a banner or carousel showcasing relevant images and a tab-based system for browsing job categories, such as web development, digital marketing, and graphic design. Users can view job cards with details like job title, deadline, price range, and a short description. A "Bid Now" button allows users to express their interest in job listings.

4. **Job Details Page**: When users click the "Bid Now" button on a job listing, they are directed to the job details page. Here, they can view detailed information about the job, including the name, deadline, price range, and a description. Users can place bids by specifying their bidding amount and deadline. The bid form also displays their email and the buyer's email. The "Bid on the project" button stores bid data in a MongoDB database and redirects users to the My Bids page.

5. **Add Jobs Page**: The Add Jobs page enables job posters to submit job listings. The form includes fields for the job poster's email (read-only), job title, deadline, description, job category (selected from a dropdown), minimum price, and maximum price. After submitting the form, a toast notification confirms the addition, and the user is redirected to the My Posted Jobs page.

6. **My Posted Jobs**: Users who have logged in can access the My Posted Jobs page. This page displays all the job listings they have added from the Add Jobs page. Each job card has options to update or delete the listing. The update option allows users to modify job details, and the delete option requires a confirmation before removal.

7. **My Bids**: The My Bids page presents users with a tabular view of their submitted bids. Each row includes job title, email, deadline, status, and a "Complete" button (if applicable). The status starts as "Pending" and can change to "In Progress" if the job owner accepts the bid. The "Complete" button marks the status as "Complete" upon clicking.

8. **Bid Requests**: Job owners can access the Bid Requests page to review bids made on their posted jobs. The page displays bid information, including job title, bidder's email, deadline, price, and status. Job owners can choose to accept or reject bids. If a bid is rejected, its status changes to "Cancelled." If accepted, the status becomes "In Progress," and both accept and reject buttons are hidden. Instead, a dynamic progress bar can be used to represent the job's current status.

These features provide a comprehensive and user-friendly job portal experience, catering to both job posters and job seekers while ensuring security and ease of use. Additionally, the website includes a custom 404-page with an interesting image/gif and a "Back to Home" button for a pleasant user experience. Lastly, the use of environment variables for sensitive data and the implementation of private routes enhance security and privacy.
