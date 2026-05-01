import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../features/home/pages/HomePage";
import NotFound from "../features/home/pages/NotFound";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import ProductPage from "../features/products/pages/ProductPage";
import SingleProductPage from "../features/products/pages/SingleProductPage";
import ProtectedRoute from "../routes/ProtectedRoute";
import CartPage from "../features/cart/pages/CartPage";
import ProfilePage from "../features/profile/pages/ProfilePage";
import RoleRoute from "./RoleRoute";
import SellerPage from "../features/seller/pages/SellerPage";
import CheckoutPage from "../features/orders/pages/CheckoutPage";
import OrdersPage from "../features/orders/pages/OrdersPage";
import OrderDetailPage from "../features/orders/pages/OrderDetailPage";
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
          <Route path="/cart" element={<CartPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/orders/:id" element={<OrderDetailPage />} />

          <Route element={<RoleRoute roles={["seller"]} />}>
            <Route path="/seller" element={<SellerPage />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
