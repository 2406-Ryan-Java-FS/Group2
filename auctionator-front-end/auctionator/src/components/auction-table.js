import { useContext, useEffect, useState, useRef } from "react";
import { UserContext } from '../UserContext';

export default function AuctionTable(){
    //track the current logged-in user to check permissions
    const user = {role: "Admin"};
    //const { user } = useContext(UserContext);

    //map the Auctions table to an array object to load into the fragment
    const [auctions, setAuctions] = useState([]);
    //const currentBid = (bidInput.current.value) ? bidInput.current.value : 1;
    const auctionTableRows = auctions.map((a, i) =>
        <tr key={a.auctionId}>
            <td>{a.auctionId}</td>
            <td>{a.itemName}</td>
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

    const tableStyle = {
        backgroundColor: "lightgrey",
        border: "1px solid black"
    }

    return (<>
        <br />
        <table style={tableStyle} >
            <thead>
                <tr>
                    <th>Auction ID</th>
                    <th>Item</th>
                    <th>Current Bid</th>
                    <th>Latest Bidder</th>
                    <th>Status</th>
                    <th>Minutes Left</th>
                </tr>
            </thead>
            <tbody>
                {auctionTableRows}
            </tbody>
        </table>
    </>);
}