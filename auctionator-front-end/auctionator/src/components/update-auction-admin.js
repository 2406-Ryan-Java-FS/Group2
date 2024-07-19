import { UserContext } from '../UserContext';
import { useRef, useContext } from 'react';

export default function UpdateAuctionAdmin(){
    
    const { user } = useContext(UserContext);
    const idInput = useRef();
    const bidInput = useRef();
    const statusInput = useRef();
    const timeInput = useRef();

    async function placeBid(){
        if (bidInput.current.value === "") {
            alert("Field left blank.")
        } else if (bidInput.current.value <= 0) {
            alert("Bid cannot be negative.");
        } else {
            const url = `http://localhost:8080/auctions/${idInput.current.value}/bid`;
            const data = {
                bid: bidInput.current.value,
                bidder_id: user['id']
            } 
            const options = {
                method: "PATCH",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            }
            try {
                const httpResponse = await fetch(url, options);
                const body = await httpResponse.json();
    
                console.log(body);
                alert(`You placed your bid for ${bidInput.current.value} dollars.`)
                
            } catch (error) {
                alert("You must bid a higher amount than the current bid.")
            }
        }
    }

    async function updateStatus(){
        if (statusInput.current.value === "") {
            alert("Field left blank.")
        } else {
            const url = `http://localhost:8080/auctions/${idInput.current.value}/status`;
            const data = {
                status: statusInput.current.value
            } 
            const options = {
                method: "PATCH",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            }
            try {
                const httpResponse = await fetch(url, options);
                const body = await httpResponse.json();
    
                console.log(body);
                alert(`You have updated the auction to the ${statusInput.current.value} status.`)
                
            } catch (error) {
                alert("That is not a valid status.")
            }
        }
    }

    async function updateTime(){
        if (timeInput.current.value === "") {
            alert("Field left blank.")
        } else if (timeInput.current.value <= 0) {
            alert("Time cannot be negative.");
        } else {
            const url = `http://localhost:8080/auctions/${idInput.current.value}/time`;
            const data = {
                time: timeInput.current.value
            } 
            const options = {
                method: "PATCH",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            }
            try {
                const httpResponse = await fetch(url, options);
                const body = await httpResponse.json();
    
                console.log(body);
                alert(`Time remaining has been set to ${timeInput.current.value} minutes.`)
                
            } catch (error) {
                alert("There was an error updating the time.")
            }
        }
    }

    return (<>
        <label htmlFor="aid">Auction ID: </label>
        <input type="number" id="aid" ref={idInput} min="0" /><br/>

        <label htmlFor="bid">Bid Amount in Dollars: </label>
        <input type="number" id="bid" ref={bidInput} min="0" /><br/>
        <button onClick={placeBid}>Place Bid</button>

        <label htmlFor="status">New Auction Status: </label>
        <input type="text" id="status" ref={statusInput}/><br/>
        <button onClick={updateStatus}>Update Status</button>

        <label htmlFor="time">New Remaining Time: </label>
        <input type="number" id="time" ref={timeInput} min="0" /><br/>
        <button onClick={updateTime}>Update Time</button>
    </>)
}