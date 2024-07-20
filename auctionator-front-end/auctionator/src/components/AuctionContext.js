import { createContext, useState } from "react";


export const AuctionContext = createContext();

export default function AuctionProvider({children}){

    const [auctions, setAuctions] = useState([]);

    const [auction, setAuction] = useState({
        auctionId: 1
    });

    const [auctionId, setAuctionId] = useState(1);
    
    function updateAuctionId(newId){
        setAuctionId(newId)
    }

    const data ={
        auctions: auctions,
        setAuctions: setAuctions,
        auction: auction,
        setAuction: setAuction,
        auctionId: auctionId,
        updateAuctionId: updateAuctionId
    };

    return (
        <AuctionContext.Provider value = {data}>
            {children}
        </AuctionContext.Provider>
    )
}