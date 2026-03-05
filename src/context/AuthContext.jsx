import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    // Mock login function
    const login = (userData) => {
        setIsLoggedIn(true);
        setUser({
            name: 'Mohish Padave',
            email: 'mohish.padave@ves.ac.in',
            ...userData
        });
        localStorage.setItem('arena_auth', 'true');
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem('arena_auth');
    };

    // Check for existing session
    useEffect(() => {
        const session = localStorage.getItem('arena_auth');
        if (session) {
            setIsLoggedIn(true);
            setUser({
                name: 'Mohish Padave',
                email: 'mohish.padave@ves.ac.in'
            });
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
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
