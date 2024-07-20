import { useContext, useEffect, useState, useRef } from "react";
import { UserContext } from '../UserContext';
import { Link } from "react-router-dom";
import { AuctionContext } from "./AuctionContext";

export default function AuctionTable(){
    //track the current logged-in user to check permissions
    const { user } = useContext(UserContext);
    const { updateAuctionId, setAuction } = useContext(AuctionContext);

    //map the Auctions table to an array object to load into the fragment
    const [auctions, setAuctions] = useState([]);
    //const currentBid = (bidInput.current.value) ? bidInput.current.value : 1;
    const auctionTableRows = auctions.map((a, i) =>
        <tr key={a.auctionId}>
           <td>{a.auctionId}</td>
            <td><Link to={`/auction/${a.auctionId}`} onClick={() => {
                setAuction(a);
                }}>
                    {a.itemName}
                </Link>
            </td>
            <td>{a.bid}</td>
            <td>{a.firstname + " " + a.lastname}</td>
            <td>{a.status}</td>
            <td>{a.time}</td>
        </tr>
    );

    async function getAllAuctions() {

        let url = "http://localhost:8080/auctions/client";
        if(user['role'] == "Admin") {
            url = "http://localhost:8080/auctions/admin";
        }
        const httpResponse = await fetch(url);
        console.log(httpResponse)
        const auctionList = await httpResponse.json();

        setAuctions(auctionList);
    }

    useEffect(() => {
        getAllAuctions();
    }, []);

    // const tableStyle = {
    //     backgroundColor: "lightgrey",
    //     border: "1px solid black"
    // }

    return (<>
        <div className="container mt-5">
            <div className="card">
                <div className="card-header text-center fw-bold fs-3">
                    {(user['role'] === 'Admin') ? "User Auctions" : "Your Auctions"}
                </div>
                <div className="card-body">
                    <table  className="table table-striped table-sm">
                        <thead className="table-dark">
                            <tr scope="row" className="text-center">
                                <th>Auction Id:</th>
                                <th>Item</th>
                                <th>Current Bid</th>
                                <th>Latest Bidder</th>
                                <th>Status</th>
                                <th>Minutes Left</th>
                            </tr>
                        </thead>
                         <tbody scope="row" className="text-center">
                            {auctionTableRows}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>);
}

                
           