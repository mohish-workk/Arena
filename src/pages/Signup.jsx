import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus, ArrowRight, Mail, Lock, User } from 'lucide-react';
import DOMPurify from 'dompurify';

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const { register } = useAuth(); // Changed from login to register
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Sanitize
        const sanitizedName = DOMPurify.sanitize(formData.name);
        const sanitizedEmail = DOMPurify.sanitize(formData.email);
        
        // Validation
        if (sanitizedName.trim().length < 2) {
            alert("Please enter a valid name");
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(sanitizedEmail)) {
            alert("Invalid email format.");
            return;
        }
        if (formData.password.length < 6) {
            alert("Password must be at least 6 characters.");
            return;
        }

        const res = await register({ name: sanitizedName, email: sanitizedEmail, password: formData.password });
        if (res.success) {
            navigate('/dashboard');
        } else {
            alert(res.error || 'Server error occurred');
        }
    };

    return (
        <div className="min-h-screen bg-cream flex items-center justify-center px-8 py-24">
            <div className="w-full max-w-md bg-white border border-secondary/5 p-12 shadow-2xl relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 -ml-16 -mb-16 rounded-full"></div>

                <div className="relative z-10">
                    <header className="mb-10 text-center">
                        <Link to="/" className="text-2xl font-bold tracking-tighter text-primary inline-block mb-8">
                            ARENA<span className="text-secondary opacity-50">ONE</span>
                        </Link>
                        <h1 className="text-3xl font-bold text-secondary tracking-tight">Join the Loop</h1>
                        <p className="text-secondary/40 text-xs uppercase tracking-widest font-bold mt-2">Create your student account</p>
                    </header>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-bold tracking-widest text-secondary/40 flex items-center gap-2">
                                <User size={12} /> Full Name
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Mohish Padave"
                                className="w-full bg-cream border border-secondary/5 p-4 text-sm outline-none focus:border-primary transition-colors"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-bold tracking-widest text-secondary/40 flex items-center gap-2">
                                <Mail size={12} /> University Email
                            </label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="name@ves.ac.in"
                                className="w-full bg-cream border border-secondary/5 p-4 text-sm outline-none focus:border-primary transition-colors"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-bold tracking-widest text-secondary/40 flex items-center gap-2">
                                <Lock size={12} /> Password
                            </label>
                            <input
                                type="password"
                                required
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                placeholder="••••••••"
                                className="w-full bg-cream border border-secondary/5 p-4 text-sm outline-none focus:border-primary transition-colors"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-primary text-cream py-5 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-primary/90 transition-all shadow-xl flex items-center justify-center gap-3 mt-8"
                        >
                            Get Started <UserPlus size={16} />
                        </button>
                    </form>

                    <footer className="mt-12 pt-8 border-t border-secondary/5 text-center">
                        <p className="text-xs text-secondary/40 font-medium">
                            Already a member? <Link to="/login" className="text-primary font-bold hover:underline">Sign in</Link>
                        </p>
                        <p className="text-[9px] text-secondary/30 mt-6 leading-relaxed">
                            By joining, you agree to the Arena One <span className="underline">Terms</span> and <span className="underline">Trust Protocol</span>.
                        </p>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default Signup;
