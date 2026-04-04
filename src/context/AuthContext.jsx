/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    // Real authentication using backend
    const register = async (userData) => {
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
            const data = await res.json();
            
            if (!res.ok) throw new Error(data.error);
            
            setIsLoggedIn(true);
            setUser(data.user);
            sessionStorage.setItem('arena_token', data.token);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const login = async (userData) => {
        // QUICK BYPASS DUMMY CREDENTIALS
        if (userData.email === 'admin@arena.com' && userData.password === 'admin123') {
            setIsLoggedIn(true);
            setUser({ name: 'Admin System', email: 'admin@arena.com', role: 'admin' });
            sessionStorage.setItem('arena_token', 'mock_admin_token_xyz_123');
            return { success: true, role: 'admin' };
        }

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
            const data = await res.json();
            
            if (!res.ok) throw new Error(data.error);

            setIsLoggedIn(true);
            setUser(data.user);
            sessionStorage.setItem('arena_token', data.token);
            return { success: true, role: data.user.role };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const logout = () => {
        setIsLoggedIn(false);
        setIsAdmin(false);
        setUser(null);
        sessionStorage.removeItem('arena_token');
    };

    // Check for existing session token
    useEffect(() => {
        const token = sessionStorage.getItem('arena_token');
        if (token) {
            try {
                // Correctly extract and decode the JWT payload (2nd part)
                const base64Url = token.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const payload = JSON.parse(window.atob(base64));

                // JWT 'exp' is in seconds, Date.now() is in milliseconds
                if (payload.exp * 1000 > Date.now()) {
                    setIsLoggedIn(true);
                    setUser({
                        id: payload.id,
                        name: payload.name || 'User',
                        email: payload.email || 'user@ves.ac.in',
                        role: payload.role || 'user'
                    });
                } else {
                    // Token expired
                    sessionStorage.removeItem('arena_token');
                }
            } catch (e) {
                console.error("Session restoration failed:", e);
                sessionStorage.removeItem('arena_token');
            }
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, register, logout }}>
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