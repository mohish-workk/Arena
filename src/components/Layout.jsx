import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ChatbotIcon from './ChatbotIcon';
import CustomToast from './CustomToast';

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <ChatbotIcon />
            <CustomToast />
            <Footer />
        </div>
    );
};

export default Layout;
