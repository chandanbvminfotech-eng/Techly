import { useLocation } from "react-router-dom";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import NavBar from "./layouts/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMe, logout } from "./features/auth/authSlice";
import LoadingScreen from "./components/LoadingScreen";
import { getCartData } from "./features/cart/cartSlice";
import api from "./api/axios";

const Layout = () => {
  const location = useLocation();
  const hideNav = ["/signin", "/signup"].includes(location.pathname);
  return (
    <>
      {!hideNav && <NavBar />}
      <AppRoutes />
    </>
  );
};

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe()).then((result) => {
      if (getMe.fulfilled.match(result)) {
        dispatch(getCartData());
      } else {
        api
          .post("/auth/refresh-token")
          .then(() => dispatch(getMe()))
          .catch(() => dispatch(logout())); 
      }
    });
  }, []);

  return <Layout />;
}

export default App;
