import { Link } from "react-router-dom";

export default function StartPage() {
    return (<>
        <div className="container mt-5">                  
            <div className="card">
                <div className="card-header text-center fw-bold fs-3">
                    Welcome to the Auctionator!
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="d-flex justify-content-center align-items-center col-12">
                            <div className="d-flex justify-content-center col-3">
                                <Link to="/login">
                                    <button className="btn btn-primary">Log In</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="d-flex justify-content-center align-items-center col-12">
                            <div className="d-flex justify-content-center col-3">
                                <Link to="/signup">
                                    <button className="btn btn-primary">Sign Up</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    </>);
}