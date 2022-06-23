import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import axios from 'axios';

import { Login, NotFound } from './pages';
import { CustomMessage } from './components';
import './styles/App.css';

axios.defaults.baseURL = 'http://localhost:3001/';

function App() {
  return (
    <BrowserRouter>
      <CustomMessage />
      <Routes>
        <Route exact path='/' element={<Navigate to='/login' />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
