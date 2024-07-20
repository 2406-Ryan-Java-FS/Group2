import { useContext, useEffect, useCallback } from "react";
import { AuctionContext } from "./AuctionContext.js";
import AuctionCommentList from "./auction-comment-list.js";
import UpdateAuctionAdmin from "./update-auction-admin.js";
import UpdateAuctionClient from "./update-auction-client.js";
import { UserContext } from "../UserContext.js";
import CreateComment from "./create-comment.js";


export default function AuctionInfoComponent(){

    const {auction, setAuction} = useContext(AuctionContext);
    const {user} = useContext(UserContext);

    const aId = auction['auctionId'];

    const getAuction = useCallback(async () => {
        const url = `http://localhost:8080/auctions/${auction['auctionId']}`;
        const httpResponse = await fetch(url);
        const body = await httpResponse.json();
        setAuction(body);
    }, [ setAuction, auction]);


    useEffect(() => {
        if (auction['auctionId']) {
            getAuction();
        }
    }, [aId, setAuction, getAuction, auction]);

    return(<>
        <div className="container mt-5">
            <div className="card">
                <div className="card-header text-center fw-bold fs-3">
                    Information for Auction #{auction['id']}
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
                            <td>{auction['id']}</td>
                            <td>{auction['item_id']}</td>
                            <td>{auction['bid']}</td>
                            <td>{auction['bidder_id']}</td>
                            <td>{auction['status']}</td>
                            <td>{auction['a_time']}</td>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        {(user['role'] === 'Admin') ? <UpdateAuctionAdmin/> : <UpdateAuctionClient/>}
        <AuctionCommentList />
    </>)
}