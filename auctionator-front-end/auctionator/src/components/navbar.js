import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import UserLogout from './user-logout';

export default function NavBar() {

    const {user} = useContext(UserContext);

    return (<>
        {(user['id'] !== 0) &&
        <ul className='nav nav-pills'>
            
            <li className='nav-item'>
                {(user['role'] === 'Admin') ? <Link to='/admin-item-view' className='nav-link'>All Items</Link> : <Link to='/client-item-view' className='nav-link'>My Items</Link>}
            </li>

            <li className="nav-item">
                <Link to="/auction-table" className='nav-link'>Auctions</Link>
            </li>

            <li className='nav-item'>
                {(user['role'] === 'Admin') && <Link to="/create-auction" className='nav-link'>List Auction</Link>}
            </li>

            <li className='nav-item'>
                {(user['role'] === 'Admin') && <Link to="/userlist" className='nav-link'>Users</Link>}
            </li>
        
            <li className="nav-item nav-right">
                <Link to="/profile" className='nav-link'>Profile</Link>
            </li>

            <li className='nav-item'>
                <UserLogout />
            </li>
        </ul> }
    </>
    );
}