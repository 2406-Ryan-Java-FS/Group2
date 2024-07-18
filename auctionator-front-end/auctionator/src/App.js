import './App.css';
import { Routes, Route } from 'react-router-dom';
import StartPage from './components/start-page';
import UserLogin from './components/user-login';
import UserSignup from './components/user-signup';
import ClientPage from './components/client-page';
import AdminPage from './components/admin-page';
import UserLogout from './components/user-logout';
import UpdateUserBalance from './components/update-user-balance';
import UpdateUserInfo from './components/update-info';
import GetAllUsers from './components/get-all-users';
import GetUserById from './components/get-user-by-id';
import DeleteUserById from './components/delete-user';

function App() {
  return (<>
    {/* <UserLogin /><br />
    <UserLogout /><br />
    <UserSignup /><br />
    <UpdateUserBalance /><br />
    <UpdateUserInfo />
    <GetAllUsers /><br/>
    <GetUserById /><br/>
    <DeleteUserById /> */}
    <Routes>
      <Route path='' element = {<StartPage />} />
      <Route path='signup' element = {<UserSignup />} />
      <Route path='login' element = {<UserLogin />} />
      <Route path='client' element = {<ClientPage />}/>
      <Route path='admin' element = {<AdminPage />}/>
      <Route path='userlist' element = {<GetAllUsers />}/>
      <Route path='finduser' element = {<GetUserById />}/>
      <Route path='setbalance' element = {<UpdateUserBalance />}/>
      <Route path='setinfo' element = {<UpdateUserInfo />}/>
    </Routes>
  </>);
}

export default App;
