import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../features/home/pages/HomePage";
import NotFound from "../features/home/pages/NotFound";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import ProductPage from "../features/products/pages/ProductPage";
import SingleProductPage from "../features/products/pages/SingleProductPage";
import ProtectedRoute from "../routes/ProtectedRoute"
import CartPage from "../features/cart/pages/CartPage";
const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/products/:id" element={<SingleProductPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/cart" element={<CartPage />}/>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
