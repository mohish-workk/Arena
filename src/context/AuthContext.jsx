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
setUser({ name: 'Admin System', email: 'admin@arena.com', role: 'admin', arenaCredits: 0 });
            sessionStorage.setItem('arena_token', 'mock_admin_token_xyz_123');
            return { success: true, role: 'admin' };
        }

        if (userData.email === 'user@arena.com' && userData.password === 'user123') {
            setIsLoggedIn(true);
setUser({ name: 'User System', email: 'User@arena.com', role: 'user', arenaCredits: 20 });
            sessionStorage.setItem('arena_token', 'mock_user_token_xyz_123');
            return { success: true, role: 'user' };
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
        sessionStorage.removeItem('arena_user_state');
    };

    const getRedeemableValue = () => user?.arenaCredits || 0;

    const earnCredits = (amount) => {
        if (!user || user.role !== 'user') return 0;
        const earned = Math.floor(amount / 125) * 10;
        const newCredits = (user.arenaCredits || 0) + earned;
        const newUser = { ...user, arenaCredits: newCredits };
        setUser(newUser);
        sessionStorage.setItem('arena_user_state', JSON.stringify(newUser));
        return earned;
    };

    const redeemCredits = (rupees) => {
        if (!user || rupees > (user.arenaCredits || 0)) return false;
        const newCredits = (user.arenaCredits || 0) - rupees;
        const newUser = { ...user, arenaCredits: newCredits };
        setUser(newUser);
        sessionStorage.setItem('arena_user_state', JSON.stringify(newUser));
        return true;
    };

    // Check for existing session token
    useEffect(() => {
    // Restore from saved user state first (supports dummy logins)
    const userStateStr = sessionStorage.getItem('arena_user_state');
    if (userStateStr) {
      try {
        const savedUser = JSON.parse(userStateStr);
        if (savedUser && savedUser.role) {
          setIsLoggedIn(true);
          setUser(savedUser);
        }
      } catch (e) {
        console.error('Failed to restore user state:', e);
      }
    }

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
        <AuthContext.Provider value={{ isLoggedIn, user, isAdmin: user?.role === 'admin', arenaCredits: user?.arenaCredits || 0, getRedeemableValue, earnCredits, redeemCredits, login, register, logout }}>
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