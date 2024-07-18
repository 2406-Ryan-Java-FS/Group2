import { useRef, useState } from "react";
import styles from "../styles/user.module.css";

export default function GetUserById() {
    let [foundUser, setFoundUser] = useState({
        firstName: null,
        lastName: null,
        username: null,
        password: null,
        balance: null,
        role: null
    });
    const userIdInput = useRef();

    async function getUser() {
        if (userIdInput.current.value === "") {
            alert("Please enter a valid ID.");
        } else {
            const url = `http://localhost:8080/users/${userIdInput.current.value}`;
            try {
                const httpResponse = await fetch(url);
                const body = await httpResponse.json();
                console.log(body);
                setFoundUser(body);
                // alert("First Name: " + body['firstName'] + 
                //     "\nLast Name: " + body['lastName'] +
                //     "\nUserame: " + body['username'] +
                //     "\nPassword: " + body['password'] +
                //     "\nBalance: " + body['balance'] +
                //     "\nRole: " + body['role']
                // );
            } catch (error) {
                alert("User with that ID not found.");
            }
        }
    }

    return(<>
        <label htmlFor="id">Enter ID: </label>
        <input type='number' id="id" ref={userIdInput} /><br/>
        <button onClick={getUser}>Find User</button><br/>
        <table style={{border: '1px solid black'}} className={styles.userTable}>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Balance</th>
                    <th>Role</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{foundUser['firstName']}</td>
                    <td>{foundUser['lastName']}</td>
                    <td>{foundUser['username']}</td>
                    <td>{foundUser['password']}</td>
                    <td>{foundUser['balance']}</td>
                    <td>{foundUser['role']}</td>
                 </tr>
            </tbody>
        </table>
        
    </>)
}