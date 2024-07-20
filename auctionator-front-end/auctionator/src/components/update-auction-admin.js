import { UserContext } from '../UserContext';
import { useRef, useContext } from 'react';
import {AuctionContext} from './AuctionContext'

export default function UpdateAuctionAdmin(){
    
    const { user } = useContext(UserContext);
    const { auctionId} = useContext(AuctionContext);
    const bidInput = useRef();
    const statusInput = useRef();
    const timeInput = useRef();

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

    async function updateStatus(){
        if (statusInput.current.value === "") {
            alert("Field left blank.")
        } else {
            const url = `http://localhost:8080/auctions/${auctionId}/status`;
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
            const url = `http://localhost:8080/auctions/${auctionId}/time`;
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

        <div className="container mt-5">                  
            <div className="card">
                <div className="card-header text-center fw-bold fs-3">
                    Update Auction Status
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="d-flex justify-content-between align-items-center col-12">
                            <button className="btn btn-primary col-3" onClick={updateStatus}>Update Status</button>
                            <div className="ml-auto d-flex col-4">
                            <input type="number" id="bid" ref={statusInput} min="0" placeholder='Enter New Status' className='form-control'/> 
                            </div>
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="container mt-5">                  
            <div className="card">
                <div className="card-header text-center fw-bold fs-3">
                    Update Time Remaining
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="d-flex justify-content-between align-items-center col-12">
                            <button className="btn btn-primary col-3" onClick={updateTime}>Update Time Remaining</button>
                            <div className="ml-auto d-flex col-4">
                                <input type="number" id="time" ref={timeInput} min="0" placeholder='Enter Time Remaining' className='form-control'/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        {/* <div className="container mt-5">
            <div className="card">
                <div className="card-header text-center fw-bold fs-3">
                    Update Auction Info
                </div>
                <div className="card-body">
                    <table  className="table table-striped table-sm">
                        <tbody>
                            <tr scope="row" className='text-center'>
                                <td>
                                    <input type="number" id="bid" ref={bidInput} min="0" placeholder='Enter Bid Amount' className='input'/> 
                                </td>
                                <td>
                                    <button onClick={placeBid} className='btn btn-outline-primary'>Place Bid</button>
                                </td>
                            </tr>
                            <tr scope="row" className='text-center'>
                                <td>
                                    <input type="text" id="status" ref={statusInput} placeholder='Update Status'/>
                                </td>
                                <td>
                                    <button onClick={updateStatus} className='btn btn-outline-primary'>Update Status</button>
                                </td>
                            </tr>
                            <tr scope="row" className='text-center'>
                                <td>
                                    <input type="number" id="time" ref={timeInput} min="0" placeholder='Update Time'/>
                                </td>
                                <td>
                                    <button onClick={updateTime} className='btn btn-outline-primary'>Update Time</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div> */}
    </>)
}