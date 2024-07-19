import { useContext, useRef, useState } from "react";

export default function CreateAuction() {
    
    const itemInput = useRef();
    const bidInput = useRef();
    const timeInput = useRef();

    async function listAuction() {
        if (itemInput.current.value === "" || bidInput.current.value === "" || timeInput.current.value === "") {
            alert("One or more fields was left blank.");
        } else if(bidInput.current.value <= 0) {
            alert("Starting bid must be at least $1.");
            bidInput.current.value = 1;
        } else if(timeInput.current.value <= 0) {
            alert("Time limit must be at least 1 minute.");
            timeInput.current.value = 1;
        } else {
            const data = {
                item_id: itemInput.current.value,
                bid: bidInput.current.value,
                bidder_id: 1,
                status: "Active",
                time: timeInput.current.value
            }
            console.log(data);
            const url = "http://localhost:8080/auctions";

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
                    alert("Auction has been listed!");
                }
            } catch (error) {
                alert("There was an error starting the auction. Make sure the item ID is valid.");
            }
        }
    }

    return (<>
        <label htmlFor="item">Auction Item Id: </label>
        <input type="number" id="item" ref={itemInput} min="1"/><br />
        <label htmlFor="sb">Starting Bid: </label>
        <input type="number" id="sb" ref={bidInput} min="1"/><br />
        <label htmlFor="time">Time Limit: </label>
        <input type="number" id="time" ref={timeInput} min="1"/><br />
        <button onClick={listAuction}>List Auction</button>
    </>)
}