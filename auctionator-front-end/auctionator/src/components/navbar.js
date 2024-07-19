import { Link } from 'react-router-dom';

export default function NavBar() {
    return (<>
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