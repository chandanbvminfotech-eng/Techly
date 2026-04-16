import React from 'react'
import { Route, Routes } from 'react-router-dom';
import HomePage from '../features/home/pages/HomePage';
import RegisterForm from '../features/auth/components/RegisterForm'; 
import NotFound from '../features/home/pages/NotFound'
import LoginPage from '../features/auth/pages/LoginPage';


const AppRoutes = () => {
    return (
        <>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterForm />} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </>
    );
}

export default AppRoutes
