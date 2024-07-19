import { useContext } from "react";
import { UserContext } from "../UserContext";
import UpdateUserInfo from "./update-info";

export default function UserProfile() {
    const { user } = useContext(UserContext);
    console.log(user);
    
    return (<>
        <h1>User Profile</h1>
        <h3>First Name: {user['firstName']}</h3>
        <h3>Last Name: {user['lastName']}</h3>
        <h3>Userame: {user['username']}</h3>
        <h3>Password: {user['password']}</h3>
        <h3>Balance: {user['balance']}</h3>
        <h3>Role: {user['role']}</h3><br/>
        <h2>Update info:</h2>
        <UpdateUserInfo />
    </>)
}