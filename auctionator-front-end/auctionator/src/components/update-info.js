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
        <div className="container mt-5">
            <div className="card">
                <div className="card-header text-center fw-bold fs-3">
                    Update User Info
                </div>
                <div className="card-body">
                    <table  className="table table-striped table-sm">
                        <tbody>
                            <tr scope="row" className='text-center'>
                                <td>
                                    <input type="text" id="fnNew" ref={newFirstNameInput} placeholder="First Name"/>
                                </td>
                                <td>
                                    <input type="text" id="lnNew" ref={newLastNameInput} placeholder="Last Name"/>
                                </td>
                                <td>
                                    <input type="text" id="unNew" ref={newUsernameInput2} placeholder="Username"/>
                                </td>
                                <td>
                                    <input type="password" id="pwNew" ref={newPasswordInput2} placeholder="Password"/>
                                </td>
                                <td>
                                    <button onClick={updateInfo} className="btn btn-outline-primary">Update</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    </>)
}