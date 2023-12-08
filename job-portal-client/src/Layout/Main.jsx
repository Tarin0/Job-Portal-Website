
import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { Toaster } from 'react-hot-toast';
import Footer from '../Components/Footer';

const Main = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Toaster></Toaster>
            <Footer></Footer>
        </div>
    );
};

export default Main;