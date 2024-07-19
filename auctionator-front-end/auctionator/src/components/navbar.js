import { Link } from 'react-router-dom';

export default function NavBar() {
    return (<>
        {/* <nav className = "navbar nav-pill">
                
            <Link to="">Home</Link>
        
            <Link to="/comments">Comments</Link>
        
            <Link to="/comments/auctions">Auction Comments</Link>
        
            
        className='nav-link active'
        </nav> */}

        <ul className='nav nav-pills'>
            <li className="nav-item">
                <Link to="" className='nav-link'>Home</Link>
            </li>
            <li className="nav-item">
                <Link to="/comments/auctions" className='nav-link'>Auction Comments</Link>
            </li>
            <li className="nav-item">
                <Link to="/comments/users" className='nav-link'>User Comments</Link>
            </li>
        </ul>
    </>
       
    );
}