import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Breadcrumbs = ({ links, active }) => {
    return (
        <nav className="flex items-center gap-2 mb-8 overflow-hidden text-[10px] font-bold uppercase tracking-[0.2em]">
            <Link 
                to="/" 
                className="text-secondary/40 hover:text-primary transition-colors"
            >
                Home
            </Link>
            
            {links.map((link, idx) => (
                <div key={idx} className="flex items-center gap-2">
                    <ChevronRight size={10} className="text-secondary/20" />
                    <Link 
                        to={link.path} 
                        className="text-secondary/40 hover:text-primary transition-colors whitespace-nowrap"
                    >
                        {link.name}
                    </Link>
                </div>
            ))}
            
            <div className="flex items-center gap-2 overflow-hidden">
                <ChevronRight size={10} className="text-secondary/20" />
                <span className="text-primary truncate">{active}</span>
            </div>
        </nav>
    );
};

export default Breadcrumbs;
