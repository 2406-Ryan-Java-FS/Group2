import { useContext, useRef } from "react";
import { UserContext } from '../UserContext';

export default function UpdateUserInfo() {
    const { user, logInUser } = useContext(UserContext);

    const newFirstNameInput = useRef();
    const newLastNameInput = useRef();
    const newUsernameInput2 = useRef();
    const newPasswordInput2 = useRef();

    async function updateInfo() {
        let data = {
            firstName: user['firstName'],
            lastName: user['lastName'],
            username: user['username'],
            password: user['password'],
            balance: user['balance'],
            role: user['role']
        };
        if (newFirstNameInput.current.value !== "") {
            data['firstName'] = newFirstNameInput.current.value;
        }
        if (newLastNameInput.current.value !== "") {
            data['lastName'] = newLastNameInput.current.value;
        }
        if (newUsernameInput2.current.value !== "") {
            data['username'] = newUsernameInput2.current.value;
        }
        if (newPasswordInput2.current.value !== "") {
            data['password'] = newPasswordInput2.current.value;
        }
        console.log(data);
        console.log(user);

        const id = user['id'];
        const url =  `http://localhost:8080/users/${id}`;
        const options = {
            method: "PUT",
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
                alert("Information Successfully Updated");
                logInUser(body);
            } else {
                alert("Information Failed to be updated.");
            }
        } catch (error) {
            alert("Username already exists.");
        }
    }

    return(<>
        <label htmlFor="fnNew">First Name: </label>
        <input type="text" id="fnNew" ref={newFirstNameInput} /><br />
        <label htmlFor="lnNew">Last Name: </label>
        <input type="text" id="lnNew" ref={newLastNameInput} /><br />
        <label htmlFor="unNew">Username: </label>
        <input type="text" id="unNew" ref={newUsernameInput2} /><br />
        <label htmlFor="pwNew">Password: </label>
        <input type="password" id="pwNew" ref={newPasswordInput2} /><br />
        <button onClick={updateInfo}>Update</button>
    </>)
}