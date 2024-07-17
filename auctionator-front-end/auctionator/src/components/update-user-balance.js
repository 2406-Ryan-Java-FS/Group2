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
        <label htmlFor="uid">User ID: </label>
        <input type="number" id="uid" ref={idInput} min="0" /><br/>
        <label htmlFor="newbal">New balance: </label>
        <input type="number" id="newBal" ref={newBalanceInput} min="0" /><br/>
        <button onClick={updateBalance}>Update Balance</button>
    </>)
}