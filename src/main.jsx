import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Toaster } from "react-hot-toast";

import App from './App'
import Machine from './pages/machineName';

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
        <Route path="/:machineName" element={<Machine />} />
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </FirebaseAuthProvider>
)
