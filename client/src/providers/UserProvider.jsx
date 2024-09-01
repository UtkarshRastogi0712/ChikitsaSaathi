// UserContext.js
import React, { createContext, useState } from 'react';

// Create the context
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    return (
        <UserContext.Provider value={{ user, setUser, error, setError }}>
            {children}
        </UserContext.Provider>
    );
};
