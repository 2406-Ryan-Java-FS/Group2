import { UserContext } from '../UserContext';
import { useRef, useContext } from 'react';
import { AuctionContext } from './AuctionContext';

export default function UpdateAuctionClient(){
    
    const { user } = useContext(UserContext);
    const {auctionId} = useContext(AuctionContext)
    const bidInput = useRef();

    async function placeBid(){
        if (bidInput.current.value === "") {
            alert("Field left blank.")
        } else if (bidInput.current.value <= 0) {
            alert("Bid cannot be negative.");
        } else {
            const url = `http://localhost:8080/auctions/${auctionId}/bid`;
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

        <div className="container mt-5">                  
            <div className="card">
                <div className="card-header text-center fw-bold fs-3">
                    Place Bid
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="d-flex justify-content-between align-items-center col-12">
                            <button className="btn btn-primary col-3" onClick={placeBid}>Place Bid</button>
                            <div className="ml-auto d-flex col-4">
                            <input type="number" id="bid" ref={bidInput} min="0" placeholder='Enter Bid Amount' className='form-control'/> 
                            </div>
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}