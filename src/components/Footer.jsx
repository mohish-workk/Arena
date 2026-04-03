import { Link } from 'react-router-dom';

const Footer = () => {

    return (
        <footer className="bg-secondary text-cream px-8 py-12 mt-auto">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="col-span-1 md:col-span-1">
                    <h2 className="text-xl font-bold tracking-tighter mb-4">ARENA ONE</h2>
                    <p className="text-sm opacity-60 leading-relaxed">
                        The premium, omnichannel marketplace for college sports and adventure.
                        Quiet luxury for the modern student athlete.
                    </p>
                </div>

                <div>
                    <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider">Quick Links</h3>
                    <ul className="space-y-2 opacity-60 text-sm">
                        <li><Link to="/" className="hover:opacity-100 transition-opacity">Home</Link></li>
                        <li><Link to="/retail" className="hover:opacity-100 transition-opacity">Retail Shop</Link></li>
                        <li><Link to="/loop" className="hover:opacity-100 transition-opacity">Arena Loop</Link></li>
                        <li><Link to="/access" className="hover:opacity-100 transition-opacity">Access (Rentals)</Link></li>
                    </ul>

                </div>

                <div>
                    <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider">Support</h3>
                    <ul className="space-y-2 opacity-60 text-sm">
                        <li><Link to="#" className="hover:opacity-100 transition-opacity">Trust & Safety</Link></li>
                        <li><Link to="/shipping" className="hover:opacity-100 transition-opacity">Shipping Policy</Link></li>
                        <li><Link to="/returns" className="hover:opacity-100 transition-opacity">Returns</Link></li>
                        <li><Link to="/contact" className="hover:opacity-100 transition-opacity">Contact Us</Link></li>
                    </ul>

                </div>

                <div>
                    <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider">Join Arena</h3>
                    <p className="text-xs opacity-60 mb-4 italic">Exclusive access for university emails.</p>
                    <div className="flex gap-2">
                        <input type="email" placeholder="edu email" className="bg-transparent border-b border-cream/20 py-1 text-sm outline-none w-full" />
                        <button className="text-sm uppercase tracking-widest font-bold">Join</button>
                    </div>
                </div>
            </div>

            <div className="border-t border-cream/5 mt-12 pt-8 text-center opacity-40 text-[10px] uppercase tracking-widest">
                &copy; 2026 Arena One. All Rights Reserved. Designed for Excellence.
            </div>
        </footer>
    );
};

export default Footer;
