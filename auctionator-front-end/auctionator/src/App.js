import './App.css';
import AuctionTable from './components/auction-table';
import CreateAuction from './components/create-auction';
import UpdateAuctionAdmin from './components/update-auction-admin';
import UpdateAuctionClient from './components/update-auction-client';

const user = {role: "Client"};

function AuctionUpdate(props) {
  const isAdmin = props.isAdmin;
  return (
    <>
      { isAdmin ? <UpdateAuctionAdmin/> : <UpdateAuctionClient/> }
    </>
  );
}

function AuctionCreate(props) {
  const isAdmin = props.isAdmin;
  return (
    <>
      { isAdmin===true && <CreateAuction/>}
    </>
  );
}

/* <AuctionTable/>
<AuctionUpdate isAdmin={user['role']==="Admin"}/>
<AuctionCreate isAdmin={user['role']==="Admin"}/> */
export default function App() {
  return (<>
  
  </>)
}