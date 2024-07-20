import { useContext, useRef } from "react";
import { UserContext } from '../UserContext';
import { useNavigate } from "react-router-dom";

export default function UserLogin() {
    const usernameInput = useRef();
    const passwordInput = useRef();
    const { logInUser } = useContext(UserContext);
    const nav = useNavigate();

    async function signIn() {
        if (usernameInput.current.value === "" || passwordInput.current.value === "") {
            alert("Username and/or password was not entered.");
        } else {
            const url = `http://localhost:8080/users/${usernameInput.current.value}/${passwordInput.current.value}`;
            try {
                const httpResponse = await fetch(url);
                const body = await httpResponse.json();
                
                console.log(body);
                if (body) {
                    logInUser(body);
                    alert("User Successfully Logged In");
                    if (body.role === "Client") 
                    {
                        nav("/client-item-view");
                    } 
                    else 
                    {
                    nav("/admin-item-view");
                    }
                } 
                else 
                {
                    alert("User Failed to be logged in.");
                }
            } catch (error) {
                alert("Username and/or password is incorrect.");
            }
        }
    }
    
    return (<>

        <div className="container mt-5">                  
            <div className="card">
                <div className="card-header text-center fw-bold fs-3">
                    Login
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="d-flex justify-content-center align-items-center col-12">
                            <div className="d-flex justify-content-center col-3">
                                <input type="text" id="un" ref={usernameInput} className="form-control" placeholder="Username"/><br />
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="d-flex justify-content-center align-items-center col-12">
                            <div className="d-flex justify-content-center col-3">
                                <input type="password" id="pw" ref={passwordInput} className="form-control" placeholder="Password"/><br />
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="d-flex justify-content-center align-items-center col-12">
                            <div className="d-flex justify-content-center col-3">
                                <button onClick={signIn} className="btn btn-primary">Log In</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    </>)
}