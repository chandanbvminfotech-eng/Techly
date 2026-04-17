import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div style={{
    minHeight:"100vh", display:"flex", flexDirection:"column",
    alignItems:"center", justifyContent:"center", background:"#08080E",
    textAlign:"center", padding:"40px",
  }}>
    <div style={{ fontSize:"120px", fontFamily:"Georgia,serif", color:"rgba(212,175,55,0.15)", lineHeight:"1", marginBottom:"8px" }}>404</div>
    <h1 style={{ margin:"0 0 12px", fontSize:"32px", fontWeight:"400", color:"#F5F0E8", fontFamily:"Georgia,serif", fontStyle:"italic" }}>Page Not Found</h1>
    <p style={{ margin:"0 0 36px", fontSize:"16px", color:"rgba(245,240,232,0.45)", fontFamily:"'DM Sans',system-ui,sans-serif" }}>The page you're looking for doesn't exist.</p>
    <Link to="/" style={{
      textDecoration:"none", padding:"13px 32px", borderRadius:"12px",
      background:"linear-gradient(135deg,#D4AF37,#B8941E)", color:"#08080E",
      fontSize:"15px", fontWeight:"700", fontFamily:"'DM Sans',system-ui,sans-serif",
    }}>Return Home</Link>
  </div>
);

export default NotFound;
