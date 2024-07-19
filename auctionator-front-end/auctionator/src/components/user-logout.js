import { useContext } from "react";
import { UserContext } from '../UserContext';

export default function UserLogout() {
    const { logInUser } = useContext(UserContext);
    
    function logOut() {
        logInUser({role: "Client"});
        alert("User Successfully Logged Out");
        window.location.href = '/';
    }

    return (<>
        <button onClick={logOut}>Log Out</button>
    </>)
}