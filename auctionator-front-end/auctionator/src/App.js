import './App.css';
import { Routes, Route } from 'react-router-dom';
import StartPage from './components/start-page';
import UserLogin from './components/user-login';
import UserSignup from './components/user-signup';
import UserPage from './components/user-page';
// import UserLogout from './components/user-logout';
import UpdateUserBalance from './components/update-user-balance';
import UpdateUserInfo from './components/update-info';
import GetAllUsers from './components/get-all-users';
import GetUserById from './components/get-user-by-id';
// import DeleteUserById from './components/delete-user';
import UserProfile from './components/profile';
import { ClientItemProvider } from './components/item-components/client-item-components/client-item-context';
import ClientItemView from './components/item-components/client-item-components/client-item-view';
import { AdminItemProvider } from './components/item-components/admin-item-components/admin-item-context';
import AdminItemView from './components/item-components/admin-item-components/admin-item-view';
import { UserContext } from './UserContext';
import AuctionTable from './components/auction-table';
import CreateAuction from './components/create-auction';
import UpdateAuctionAdmin from './components/update-auction-admin';
import UpdateAuctionClient from './components/update-auction-client';
import { useContext } from 'react';
import AuctionCommentList from './components/auction-comment-list';
// import UserCommentList from './components/user-comment-list';
import NavBar from './components/navbar';
import AuctionInfoComponent from './components/single-auction';


function App() {
  const { user } = useContext(UserContext);

  return (<>

    <NavBar />

    <Routes>

        <Route path='' element={<StartPage />} />
        <Route path='signup' element={<UserSignup />} />
        <Route path='login' element={<UserLogin />} />
        <Route path='userlist' element={<>
          <GetAllUsers />
          <UpdateUserBalance />
          </>} />
        <Route path='profile' element={<UserProfile />} />
        <Route path='auction-table' element={<AuctionTable/>} />
        <Route path='create-auction' element={user['role']==="Admin" && <CreateAuction/>} />
        <Route path='client-item-view' element={
          <ClientItemProvider>
            <ClientItemView />
          </ClientItemProvider>
        } />
        <Route path='admin-item-view' element={
          <AdminItemProvider>
            <AdminItemView />
          </AdminItemProvider>
        } />

        <Route path='auction/:auctionId' element={<AuctionInfoComponent />} />
    </Routes>
    </>
  );
}

export default App;
