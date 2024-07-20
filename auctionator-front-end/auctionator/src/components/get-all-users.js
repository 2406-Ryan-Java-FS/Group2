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

    return(<>

        <div className="container mt-5">
            <div className="card">
                <div className="card-header text-center fw-bold fs-3">
                    Users
                </div>
                <div className="card-body">
                    <table  className="table table-striped table-sm">
                        <thead className="table-dark">
                            <tr scope="row" className="text-center">
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Username</th>
                                <th>Password</th>
                                <th>Balance</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                         <tbody scope="row" className="text-center">
                            {userTableRows}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>)
}