import React, { createContext } from 'react';


export const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const token = localStorage.getItem('access_token');
    const user = localStorage.getItem('user');
    const userParse = JSON.parse(user);

    return (
        <UserContext.Provider value={{ token, userParse }}>
            {children}
        </UserContext.Provider>
    )

}

