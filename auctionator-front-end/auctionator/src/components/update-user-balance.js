import { useRef } from "react";

export default function UpdateUserBalance() {
    const idInput = useRef();
    const newBalanceInput = useRef();

    async function updateBalance() {
        if (idInput.current.value === "" || newBalanceInput.current.value === "") {
            alert("Field left blank.")
        } else if (idInput.current.value%1 !== 0 || idInput.current.value <= 0) {
            alert("ID must be a positive whole number.");
        } else if (newBalanceInput.current.value < 0) {
            alert("Balance cannot be negative.");
        } else {
            const url = `http://localhost:8080/users/${idInput.current.value}/balance`;
            const options = {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: newBalanceInput.current.value
            }
            try {
                const httpResponse = await fetch(url, options);
                const body = await httpResponse.json();
    
                console.log(body);
                if (body) {
                    alert("Balance Successfully Updated")
                } else {
                    alert("Balance Failed to be updated.")
                }
            } catch (error) {
                alert("User could not be found.")
            }
        }
    }

    return (<>
        <div className="container mt-5">                  
            <div className="card">
                <div className="card-header text-center fw-bold fs-3">
                    Update User Balance
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="d-flex justify-content-between align-items-center col-12">
                            <button className="btn btn-primary col-3" onClick={updateBalance}>Update Balance</button>
                            <div className="ml-auto d-flex col-3">
                                <input
                                    type="number"
                                    id="itemNameInput"
                                    placeholder="Input the user's ID"
                                    className="form-control"
                                    ref={idInput}
                                />
                            </div>
                            <div className="ml-auto d-flex col-3">
                                <input
                                    type="number"
                                    id="newBalanceInput"
                                    placeholder="Input the new balance amount"
                                    className="form-control"
                                    ref={newBalanceInput}/>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </>)
}