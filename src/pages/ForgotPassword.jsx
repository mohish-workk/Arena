import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="min-h-screen bg-cream flex items-center justify-center px-8 py-24">
            <div className="w-full max-w-md bg-white border border-secondary/5 p-12 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 -ml-16 -mt-16 rounded-full"></div>

                <div className="relative z-10">
                    <header className="mb-10 text-center">
                        <Link to="/" className="text-2xl font-bold tracking-tighter text-primary inline-block mb-8">
                            ARENA<span className="text-secondary opacity-50">ONE</span>
                        </Link>

                        {!submitted ? (
                            <>
                                <h1 className="text-3xl font-bold text-secondary tracking-tight">Recovery</h1>
                                <p className="text-secondary/40 text-xs uppercase tracking-widest font-bold mt-2">Enter your campus email</p>
                            </>
                        ) : (
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
                                    <CheckCircle2 size={32} />
                                </div>
                                <h1 className="text-3xl font-bold text-secondary tracking-tight">Email Sent</h1>
                                <p className="text-secondary/40 text-[10px] uppercase tracking-widest font-bold mt-2">Check your university inbox</p>
                            </div>
                        )}
                    </header>

                    {!submitted ? (
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

                            <button
                                type="submit"
                                className="w-full bg-primary text-cream py-5 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-primary/90 transition-all shadow-xl mt-8"
                            >
                                Send Recovery Link
                            </button>
                        </form>
                    ) : (
                        <div className="text-center space-y-6">
                            <p className="text-sm text-secondary/60 leading-relaxed font-medium">
                                We've sent a password reset link to <span className="text-secondary font-bold">{email}</span>. Please click the link to reset your password.
                            </p>
                            <button
                                onClick={() => setSubmitted(false)}
                                className="text-[10px] uppercase font-bold tracking-[0.2em] text-primary hover:opacity-70 transition-opacity"
                            >
                                Didn't receive it? Resend
                            </button>
                        </div>
                    )}

                    <footer className="mt-12 pt-8 border-t border-secondary/5 text-center">
                        <Link to="/login" className="text-[10px] uppercase font-bold tracking-[0.2em] text-secondary/40 hover:text-secondary transition-colors inline-flex items-center gap-2">
                            <ArrowLeft size={14} /> Back to Sign In
                        </Link>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
