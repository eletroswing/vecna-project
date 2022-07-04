import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Toaster } from "react-hot-toast";

import App from './App'
import Machine from './pages/machineName';
import User from './pages/UserPage';
import Table from './pages/Table'
import Register from './pages/Register'

import ListMachines from './pages/ListMachines';

import Navbar from './components/navbar';
import { FirebaseAuthProvider } from './components/FirebaseProvider';

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <FirebaseAuthProvider>
    <BrowserRouter>
      <Toaster 
        position="bottom-right"
      />
      <Navbar />
      <Routes>
        <Route path="/:user/*" element={<User />} />
          <Route path="/:user/:machineName" element={<Machine />} />
            <Route path="/:user/:machineName/historico" element={<Table />} />
              <Route path="/:user/:machineName/historico/:register" element={<Register />} />
          

        <Route path="/" element={<ListMachines />} />
    
        {/* this is any route */}
        <Route path="/404" element={<App />} />
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </FirebaseAuthProvider>
)
