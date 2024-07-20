import { useContext } from "react";
import { UserContext } from "../UserContext";
import UpdateUserInfo from "./update-info";
import UserCommentList from "./user-comment-list";

export default function UserProfile() {
    const { user } = useContext(UserContext);
    console.log(user);
    
    return (<>

        <div className="container mt-5">
            <div className="card">
                <div className="card-header text-center fw-bold fs-3">
                    {user ? `${user.firstName} ${user.lastName}` : "User"} Information
                </div>
                <div className="card-body">
                    <table  className="table table-striped table-sm">
                        <thead className="table-dark">
                            <tr scope="row" className='text-center'>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Username</th>
                                <th>Password</th>
                                <th>Balance</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr scope="row" className='text-center'>
                                <td>{user['firstName']}</td>
                                <td>{user['lastName']}</td>
                                <td>{user['username']}</td>
                                <td>{user['password']}</td>
                                <td>{user['balance']}</td>
                                <td>{user['role']}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <UpdateUserInfo />
        <UserCommentList />
    </>)
}