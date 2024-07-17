import { useRef } from "react";

export default function GetUserById() {
    const userIdInput = useRef();

    async function getUser() {
        if (userIdInput.current.value === "") {
            alert("Please enter a valid ID.");
        } else {
            const url = `http://localhost:8080/users/${userIdInput.current.value}`;
            try {
                const httpResponse = await fetch(url);
                const body = await httpResponse.json();
                alert("First Name: " + body['firstName'] + 
                    "\nLast Name: " + body['lastName'] +
                    "\nUserame: " + body['username'] +
                    "\nPassword: " + body['password'] +
                    "\nBalance: " + body['balance'] +
                    "\nRole: " + body['role']
                );
            } catch (error) {
                alert("User with that ID not found.");
            }
        }
    }

    return(<>
        <label htmlFor="id">Enter ID: </label>
        <input type='number' id="id" ref={userIdInput} /><br/>
        <button onClick={getUser}>Find User</button>
        
    </>)
}