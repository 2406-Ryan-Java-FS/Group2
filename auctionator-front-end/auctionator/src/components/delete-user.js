import { useContext, useRef } from 'react';
import { UserContext } from '../UserContext';

export default function DeleteUserById() {
    const userIdInput2 = useRef();
    const { user } = useContext(UserContext);

    async function deleteUser() {
        if (userIdInput2.current.value === "") {
            alert("Please enter a valid ID.");
        } else if (userIdInput2.current.value == user['id']) {
            alert("Cannot delete the current signed-in user.")
        } else {
            const url = `http://localhost:8080/users/${userIdInput2.current.value}`;
            const options = {
                method: "DELETE"
            }
            const httpResponse = await fetch(url, options);
            if (httpResponse.status == 204) {
                alert("User Successfully Deleted");
            } else {
                alert("User with that ID not found.");
            }
        }
    }

    return(<>
        <label htmlFor="deleteId">Enter ID: </label>
        <input type='number' id="deleteId" ref={userIdInput2} /><br/>
        <button onClick={deleteUser}>Delete User</button>
    </>)
}