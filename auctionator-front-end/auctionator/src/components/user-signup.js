import { useContext, useRef, useState } from "react";
import { UserContext } from '../UserContext';

export default function UserSignup() {
    
    const firstNameInput = useRef();
    const lastNameInput = useRef();
    const newUsernameInput = useRef();
    const newPasswordInput = useRef();
    const balanceInput = useRef();
    
    const [roleInput, setRoleInput] = useState("Client");
    const updateRole = (value) => setRoleInput(value);

    const { logInUser } = useContext(UserContext);

    async function signUp() {
        if (firstNameInput.current.value === "" || lastNameInput.current.value === "" ||
            newUsernameInput.current.value === "" || newPasswordInput.current.value === "") {
            alert("One or more fields was left blank.");
        } else if(balanceInput.current.value < 0) {
            alert("Balance cannot be negative.");
            balanceInput.current.value = 0;
        } else {
            const data = {
                firstName: firstNameInput.current.value,
                lastName: lastNameInput.current.value,
                username: newUsernameInput.current.value,
                password: newPasswordInput.current.value,
                balance: balanceInput.current.value,
                role: roleInput
            }
            console.log(data);
            const url = "http://localhost:8080/users";

            const options = {
                method: "POST",
                headers: {
                   'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
            
            try {
                const httpResponse = await fetch(url, options);
                const body = await httpResponse.json();

                console.log(body);
                if (body) {
                    alert("Signup successful!");
                    logInUser(body);
                } else {
                    alert("User Failed to be added.");
                }
            } catch (error) {
                alert("User with that username already exists.");
            }
        }
    }

    return (<>
        <label htmlFor="fn">First Name: </label>
        <input type="text" id="fn" ref={firstNameInput} /><br />
        <label htmlFor="ln">Last Name: </label>
        <input type="text" id="ln" ref={lastNameInput} /><br />
        <label htmlFor="un2">Username: </label>
        <input type="text" id="un2" ref={newUsernameInput} /><br />
        <label htmlFor="pw2">Password: </label>
        <input type="password" id="pw2" ref={newPasswordInput} /><br />
        <label htmlFor="bal">Balance: </label>
        <input type="number" id="bal" ref={balanceInput} min="0" defaultValue="0" /><br />
        <input type="radio" id="roleC" name="roleInput" value="Client"
        checked={roleInput === "Client"} onChange={() => updateRole("Client")}/>
        <label htmlFor="roleC">Client</label>
        <input type="radio" id="roleA" name="roleInput" value="Admin"
        checked={roleInput === "Admin"} onChange={() => updateRole("Admin")}/>
        <label htmlFor="roleA">Admin</label><br />
        <button onClick={signUp}>Sign Up</button>
    </>)
}