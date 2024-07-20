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

        <div className="container mt-5">                  
            <div className="card">
                <div className="card-header text-center fw-bold fs-3">
                    List Auction
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="d-flex justify-content-between align-items-center col-12">
                            <button className="btn btn-primary col-3" onClick={listAuction}>List Auction</button>
                            <div className="ml-auto d-flex col-2">
                                <input type="number" id="item" ref={itemInput} min="1" placeholder="Item ID for Auction" className="form-control"/>
                            </div>
                            <div className="ml-auto d-flex col-2">
                                <input type="number" id="sb" ref={bidInput} min="1" placeholder="Starting Bid" className="form-control"/>
                            </div>
                            <div className="ml-auto d-flex col-2">
                                <input type="number" id="time" ref={timeInput} min="1" placeholder="Duration (In Minutes)" className="form-control"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}