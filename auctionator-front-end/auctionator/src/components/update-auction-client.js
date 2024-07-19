import { UserContext } from '../UserContext';
import { useRef } from 'react';

export default function UpdateAuctionClient(){
    
    const user = {
        id: "1",
        role: "Client"
    };
    const idInput = useRef();
    const bidInput = useRef();

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

    return (<>
        <label htmlFor="aid">Auction ID: </label>
        <input type="number" id="aid" ref={idInput} min="0" /><br/>

        <label htmlFor="bid">Bid Amount in Dollars: </label>
        <input type="number" id="bid" ref={bidInput} min="0" /><br/>
        <button onClick={placeBid}>Place Bid</button>
    </>)
}