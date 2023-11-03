import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-loading-skeleton/dist/skeleton.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import User from "./Users/User";
import SingleUser from './Users/SingleUser';
import Conv from './Conversation/Conv'
import Home from './Home';
import SingleConv from './Conversation/SingleConv';
import Login from './Login';
import Auth from './Context/Auth/Auth';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
      <React.StrictMode>
        <Auth>
          <BrowserRouter>
            <Routes>
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/" element={<Home />} />
              <Route exact path="/users" element={<User />} />
              <Route exact path="/user/:id" element={<SingleUser />} />
              <Route exact path="/conversations" element={<Conv />} />
              <Route exact path="/chat/:id" element={<SingleConv />} />
            </Routes>
          </BrowserRouter>
        </Auth>
      </React.StrictMode>
  </>
);


