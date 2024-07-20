import { useContext, useRef, useState } from "react";
import { UserContext } from '../UserContext';
import { useNavigate } from "react-router-dom";

export default function UserSignup() {
    
    const firstNameInput = useRef();
    const lastNameInput = useRef();
    const newUsernameInput = useRef();
    const newPasswordInput = useRef();
    const balanceInput = useRef();
    
    const [roleInput, setRoleInput] = useState("Client");
    const updateRole = (value) => setRoleInput(value);
    const nav = useNavigate();

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
                    if (body.role === "Client") 
                    {
                        nav("/client-item-view");
                    } 
                    else 
                    {
                        nav("/admin-item-view");
                    }
                } else {
                    alert("User Failed to be added.");
                }
            } catch (error) {
                alert("User with that username already exists.");
            }
        }
    }

    return (<>

        <div className="container mt-5">                  
            <div className="card">
                <div className="card-header text-center fw-bold fs-3">
                    Sign Up
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="d-flex justify-content-center align-items-center col-12">
                            <div className="d-flex justify-content-center col-3">
                                <input type="text" id="ln" ref={firstNameInput} className="form-control" placeholder="First Name"/>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="d-flex justify-content-center align-items-center col-12">
                            <div className="d-flex justify-content-center col-3">
                                <input type="text" id="ln" ref={lastNameInput} className="form-control" placeholder="Last Name"/>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="d-flex justify-content-center align-items-center col-12">
                            <div className="d-flex justify-content-center col-3">
                                <input type="text" id="un2" ref={newUsernameInput} className="form-control" placeholder="Username"/>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="d-flex justify-content-center align-items-center col-12">
                            <div className="d-flex justify-content-center col-3">
                                <input type="password" id="pw2" ref={newPasswordInput} className="form-control" placeholder="Password"/>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="d-flex justify-content-center align-items-center col-12">
                            <div className="d-flex justify-content-center col-3">
                                <input type="number" id="bal" ref={balanceInput} min="0" defaultValue="0" className="form-control" placeholder="Balance"/>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="d-flex justify-content-center align-items-center col-12">
                            <div className="d-flex justify-content-center col-3">
                                <input type="radio" id="roleC" name="roleInput" value="Client" checked={roleInput === "Client"} onChange={() => updateRole("Client")} className="form-check"/>
                                <label htmlFor="roleC">Client</label>
                                <input type="radio" id="roleA" name="roleInput" value="Admin" checked={roleInput === "Admin"} onChange={() => updateRole("Admin")} className="form-check"/>
                                <label htmlFor="roleA">Admin</label><br />
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="d-flex justify-content-center align-items-center col-12">
                            <div className="d-flex justify-content-center col-3">
                                <button onClick={signUp} className="btn btn-primary">Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    </>)
}