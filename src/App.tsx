import React from 'react';
import {LoginPage} from './Components/Login';
import { SignUpPage } from './Components/SignUp';
import Feed from './Components/Feed';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css';
import { AuthProvider } from './Context/AuthProvider';
import Header from './Components/Header';

function App() {

  return (
    <Router>
      <AuthProvider>
      <Header />
    <Routes>
      
      <Route path="/signin" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/home" element={<Feed />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
    </AuthProvider>
  </Router>
   
    );  
}

export default App;
