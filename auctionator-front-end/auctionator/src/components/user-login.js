import { useContext, useRef } from "react";
import { UserContext } from '../UserContext';

export default function UserLogin() {
    const usernameInput = useRef();
    const passwordInput = useRef();
    const { logInUser } = useContext(UserContext);

    async function signIn() {
        if (usernameInput.current.value === "" || passwordInput.current.value === "") {
            alert("Username and/or password was not entered.");
        } else {
            const url = `http://localhost:8080/users/${usernameInput.current.value}/${passwordInput.current.value}`;
            try {
                const httpResponse = await fetch(url);
                const body = await httpResponse.json();
                
                console.log(body);
                if (body) {
                    logInUser(body);
                    alert("User Successfully Logged In");
                } else {
                    alert("User Failed to be logged in.");
                }
            } catch (error) {
                alert("Username and/or password is incorrect.");
            }
        }
    }
    
    return (<>
        <label htmlFor="un">Username: </label>
        <input type="text" id="un" ref={usernameInput} /><br />
        <label htmlFor="pw">Password: </label>
        <input type="password" id="pw" ref={passwordInput} /><br />
        <button onClick={signIn}>Log In</button>
    </>)
}