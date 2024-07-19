import { createContext, useState } from 'react';

export const UserContext = createContext();

export default function UserProvider({ children }) {

    const [user, setUser] = useState(null);

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