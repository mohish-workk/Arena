import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, ArrowRight, Mail, Lock } from 'lucide-react';
import DOMPurify from 'dompurify';

const Login = () => {
    const [email, setEmail] = useState('admin@arena.com');
    const [password, setPassword] = useState('admin123');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Sanitize
        const sanitizedEmail = DOMPurify.sanitize(email);
        
        // Basic Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(sanitizedEmail)) {
            alert("Invalid email format.");
            return;
        }
        if (password.length < 6) {
            alert("Password conceptually must be at least 6 characters.");
            return;
        }

        const res = await login({ email: sanitizedEmail, password });
        if (res.success) {
            if (res.role === 'admin') {
                navigate('/erp-crm');
            } else {
                navigate('/dashboard');
            }
        } else {
            alert(res.error || 'Invalid credentials');
        }
    };

    return (
        <div className="min-h-screen bg-cream flex items-center justify-center px-8 py-24">
            <div className="w-full max-w-md bg-white border border-secondary/5 p-12 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 -mr-16 -mt-16 rounded-full"></div>

                <div className="relative z-10">
                    <header className="mb-10 text-center">
                        <Link to="/" className="text-2xl font-bold tracking-tighter text-primary inline-block mb-8">
                            ARENA<span className="text-secondary opacity-50">ONE</span>
                        </Link>
                        <h1 className="text-3xl font-bold text-secondary tracking-tight">Welcome Back</h1>
                        <p className="text-secondary/40 text-xs uppercase tracking-widest font-bold mt-2">Sign in to your campus account</p>
                    </header>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-bold tracking-widest text-secondary/40 flex items-center gap-2">
                                <Mail size={12} /> University Email
                            </label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@ves.ac.in"
                                className="w-full bg-cream border border-secondary/5 p-4 text-sm outline-none focus:border-primary transition-colors"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="text-[10px] uppercase font-bold tracking-widest text-secondary/40 flex items-center gap-2">
                                    <Lock size={12} /> Password
                                </label>
                                <Link to="/forgot-password" title="Forgot Password" className="text-[10px] uppercase font-bold tracking-widest text-primary hover:opacity-70 transition-opacity">Forgot?</Link>
                            </div>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-cream border border-secondary/5 p-4 text-sm outline-none focus:border-primary transition-colors"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-primary text-cream py-5 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-primary/90 transition-all shadow-xl flex items-center justify-center gap-3 mt-8"
                        >
                            Sign In <ArrowRight size={16} />
                        </button>
                    </form>

                    <footer className="mt-12 pt-8 border-t border-secondary/5 text-center">
                        <p className="text-xs text-secondary/40 font-medium">
                            Don't have an account? <Link to="/signup" className="text-primary font-bold hover:underline">Create one</Link>
                        </p>
                        <div className="flex items-center justify-center gap-2 mt-6 text-primary/40">
                            <ShieldCheck size={14} />
                            <span className="text-[9px] font-bold uppercase tracking-widest">Secure Campus Authentication</span>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default Login;
