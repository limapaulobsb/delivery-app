import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import axios from 'axios';

import {
  Checkout,
  Login,
  NotFound,
  Orders,
  Products,
  Profile,
  Register,
  Sellers,
} from './pages';

import { CustomMessage } from './components';
import './styles/App.css';

axios.defaults.baseURL = 'http://localhost:3001/';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Navigate to='/login' />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/login' element={<Login />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/register' element={<Register />} />
        <Route path='/sellers/:id/products' element={<Products />} />
        <Route path='/sellers' element={<Sellers />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <CustomMessage />
    </BrowserRouter>
  );
}

export default App;
