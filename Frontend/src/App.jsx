import { BrowserRouter, useLocation } from "react-router-dom";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import NavBar from "./layouts/NavBar";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getMe } from "./features/auth/authSlice";

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
  useEffect(() => {
    dispatch(getMe());
  }, []);
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
