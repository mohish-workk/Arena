// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    // Mock login function
    const login = (userData, admin = false) => {
        setIsLoggedIn(true);
        setIsAdmin(admin);
        setUser({
            name: admin ? 'Admin User' : 'Mohish Padave',
            email: admin ? 'admin@arenaone.com' : 'mohish.padave@ves.ac.in',
            ...userData
        });
        localStorage.setItem('arena_auth', 'true');
        if (admin) localStorage.setItem('arena_admin', 'true');
    };

    const logout = () => {
        setIsLoggedIn(false);
        setIsAdmin(false);
        setUser(null);
        localStorage.removeItem('arena_auth');
        localStorage.removeItem('arena_admin');
    };

    // Check for existing session
    useEffect(() => {
        const session = localStorage.getItem('arena_auth');
        const adminSession = localStorage.getItem('arena_admin');
        if (session) {
            setIsLoggedIn(true);
            setIsAdmin(!!adminSession);
            setUser({
                name: adminSession ? 'Admin User' : 'Mohish Padave',
                email: adminSession ? 'admin@arenaone.com' : 'mohish.padave@ves.ac.in'
            });
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, isAdmin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};