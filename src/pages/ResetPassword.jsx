import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Lock, ArrowRight } from 'lucide-react';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { token } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters.");
            return;
        }

        try {
            const res = await fetch(`/api/auth/resetpassword/${token}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            });
            const data = await res.json();
            
            if (!res.ok) throw new Error(data.error);
            
            alert('Password reset successful. Please log in.');
            navigate('/login');
        } catch (error) {
            alert(error.message || 'Error executing password reset');
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
                        <h1 className="text-3xl font-bold text-secondary tracking-tight">New Password</h1>
                        <p className="text-secondary/40 text-xs uppercase tracking-widest font-bold mt-2">Secure your account</p>
                    </header>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-bold tracking-widest text-secondary/40 flex items-center gap-2">
                                <Lock size={12} /> New Password
                            </label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-cream border border-secondary/5 p-4 text-sm outline-none focus:border-primary transition-colors"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-bold tracking-widest text-secondary/40 flex items-center gap-2">
                                <Lock size={12} /> Confirm New Password
                            </label>
                            <input
                                type="password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-cream border border-secondary/5 p-4 text-sm outline-none focus:border-primary transition-colors"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-primary text-cream py-5 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-primary/90 transition-all shadow-xl flex items-center justify-center gap-3 mt-8"
                        >
                            Reset Password <ArrowRight size={16} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
