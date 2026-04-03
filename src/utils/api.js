// Secure API Wrapper for Arena E-Commerce

const BASE_URL = import.meta.env.VITE_API_URL || 'https://api.arenaone.com'; // Enforce HTTPS by default

const getHeaders = () => {
    const headers = {
        'Content-Type': 'application/json',
    };

    // Retrieve token from sessionStorage (Secure Token Injection)
    const token = sessionStorage.getItem('arena_token');
    if (token) {
        headers['Authorization'] = `Bearer ${token}`; // Authorization header to prevent unauthorized access at API level
    }

    return headers;
};

/**
 * secureFetch is a wrapper around the native fetch API designed to enforce 
 * secure communication protocols like HTTPS and automatically inject auth tokens.
 */
export const secureFetch = async (endpoint, options = {}) => {
    // 1. Enforce HTTPS to prevent downgrade attacks (allow http only on localhost for dev)
    const url = new URL(endpoint, BASE_URL);
    if (url.protocol === 'http:' && url.hostname !== 'localhost' && url.hostname !== '127.0.0.1') {
        console.warn('Insecure HTTP protocol detected. Enforcing HTTPS.');
        url.protocol = 'https:';
    }

    // 2. Build secure configuration
    const config = {
        ...options,
        headers: {
            ...getHeaders(),
            ...options.headers,
        },
    };

    try {
        const response = await fetch(url, config);
        
        if (!response.ok) {
            // Handle HTTP errors securely (don't expose raw backend errors to the frontend)
            throw new Error(`API Request Failed with status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error("Secure API Error Encountered:", error.message);
        // Generic safe error message to prevent information leakage
        throw new Error('A secure communication error occurred. Please try again later.'); 
    }
};

export default { secureFetch };
