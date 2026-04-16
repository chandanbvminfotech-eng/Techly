import React from 'react'
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div style={{ height: "10px", backgroundColor: "beige" }}>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/signin">Login</Link>
        <Link to="/signup">Register</Link>
      </nav>
    </div>
  );
}

export default NavBar
