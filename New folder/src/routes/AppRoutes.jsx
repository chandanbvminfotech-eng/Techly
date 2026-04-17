import React from 'react'
import { Route, Routes } from 'react-router-dom';
import HomePage from '../features/home/pages/HomePage';
import NotFound from '../features/home/pages/NotFound'
import LoginPage from '../features/auth/pages/LoginPage';
import RegisterPage from '../features/auth/pages/RegisterPage';
import ProductPage from '../features/products/pages/ProductPage';



const AppRoutes = () => {
    return (
        <>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route path="/products" element={<ProductPage/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </>
    );
}

export default AppRoutes
