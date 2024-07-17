import { useContext } from "react";
import { AppContext } from '../AppContext';

export default function UserLogout() {
    const { logInUser } = useContext(AppContext);
    
    function logOut() {
        logInUser(null);
        alert("User Successfully Logged Out");
    }

    return (<>
        <button onClick={logOut}>Log Out</button>
    </>)
}