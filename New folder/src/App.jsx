import { BrowserRouter, useLocation } from "react-router-dom";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import NavBar from "./layouts/NavBar";

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
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
