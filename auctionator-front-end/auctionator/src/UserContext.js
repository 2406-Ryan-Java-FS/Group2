import { createContext, useState } from 'react';

export const UserContext = createContext();

export default function UserProvider({ children }) {

    const [user, setUser] = useState({
        id: 0,
        role: "Client"
    });

    function logInUser(newUser) {
        setUser(newUser);
    }

    const data = {
        user: user,
        logInUser: logInUser
    }

    return (
        <UserContext.Provider value={data} >
            {children}
        </UserContext.Provider>
    );
}