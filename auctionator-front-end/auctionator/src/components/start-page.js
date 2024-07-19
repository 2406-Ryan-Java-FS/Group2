import { Link } from "react-router-dom";

export default function StartPage() {
    return (<>
        <h1>Welcome to Auctionator!</h1>
        <Link to="/signup">
            <button>Sign Up</button>
        </Link>
        <Link to="/login">
            <button>Log In</button>
        </Link>
    </>);
}