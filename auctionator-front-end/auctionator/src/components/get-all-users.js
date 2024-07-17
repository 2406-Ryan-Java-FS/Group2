import { useState, useEffect } from "react";
import styles from "../styles/user.module.css";

export default function GetAllUsers() {
    const [users, setUsers] = useState([]);
    const userTableRows = users.map(u =>
        <tr key={u.id}>
            <td>{u.firstName}</td>
            <td>{u.lastName}</td>
            <td>{u.username}</td>
            <td>{u.password}</td>
            <td>{u.balance}</td>
            <td>{u.role}</td>
        </tr>
    );

    async function getAllUsers() {
        console.log("Getting Users...");

        const url="http://localhost:8080/users";
        const httpResponse = await fetch(url);
        console.log(httpResponse);
        const userList = await httpResponse.json();

        setUsers(userList);
    }

    useEffect(() => {
        getAllUsers();
    }, []);

    const tableStyle = {
        border: "1px solid black"
    }

    return(<>
        <br/>
        <table style={tableStyle} className={styles.userTable}>
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
                {userTableRows}
            </tbody>
        </table>
    </>)
}