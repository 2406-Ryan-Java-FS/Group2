import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserProvider from './UserContext';
import { BrowserRouter } from 'react-router-dom';
import AuctionProvider from './components/AuctionContext';
import CommentProvider from './CommentContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <AuctionProvider>
        <CommentProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CommentProvider>
      </AuctionProvider>
    </UserProvider>
  </React.StrictMode>
);
