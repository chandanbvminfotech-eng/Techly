import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginForm from "./features/auth/components/LoginForm";
import HomePage from "./features/home/pages/HomePage";
import AppRoutes from "./routes/AppRoutes";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./layouts/NavBar";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <AppRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
