import { useContext } from "react";
import { UserContext } from '../UserContext';

export default function UserLogout() {
    const { logInUser } = useContext(UserContext);
    
    function logOut() {
        logInUser(null);
        alert("User Successfully Logged Out");
    }

    return (<>
        <button onClick={logOut}>Log Out</button>
    </>)
}