import { useContext, useEffect } from "react";
import { UserContext } from '../UserContext';

export default function AuctionTable(){
    //track the current logged-in user to check permissions
    const { logInUser } = useContext(UserContext);

    //map the Auctions table to an array object to load into the fragment
    const [auctions, setAuctions] = useState([]);
    const auctionTableRows = auctions.map(a =>
        <tr key={a.id}>
            <td>{a.name}</td>
            <td>{a.age}</td>
            <td>{a.worth}</td>
        </tr>
    );


    async function getAllAuctions() {

        const url = "http://localhost:8080/auctions";
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
        <table style={tableStyle} className={styles.actorTable} >
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Current Bid</th>
                    <th>Worth</th>
                </tr>
            </thead>
            <tbody>
                {auctionTableRows}
            </tbody>
        </table>
    </>);
}