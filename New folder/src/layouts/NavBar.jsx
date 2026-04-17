import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      transition: "all 0.4s ease",
      background: scrolled ? "rgba(8, 8, 14, 0.88)" : "transparent",
      backdropFilter: scrolled ? "blur(24px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(212,175,55,0.12)" : "1px solid transparent",
    }}>
      <div style={{
        maxWidth: "1280px", margin: "0 auto", padding: "0 32px",
        height: "72px", display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "34px", height: "34px", borderRadius: "9px",
            background: "linear-gradient(135deg, #D4AF37, #F5E090)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontSize: "17px", fontWeight: "900", color: "#08080E", fontFamily: "Georgia, serif" }}>L</span>
          </div>
          <span style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "22px", color: "#F5F0E8", letterSpacing: "-0.2px" }}>Luxe</span>
        </Link>

        <div style={{ display: "flex", gap: "4px" }} className="nd">
          {[{to:"/",l:"Home"},{to:"#categories",l:"Categories"},{to:"#trending",l:"Trending"}].map(({to,l})=>(
            <Link key={l} to={to} style={{
              textDecoration:"none", padding:"8px 16px", borderRadius:"8px", fontSize:"14px",
              fontFamily:"'DM Sans',system-ui,sans-serif", fontWeight:"500",
              color:"rgba(245,240,232,0.72)", transition:"all 0.2s",
            }}
            onMouseEnter={e=>{e.currentTarget.style.color="#F5F0E8";e.currentTarget.style.background="rgba(255,255,255,0.06)"}}
            onMouseLeave={e=>{e.currentTarget.style.color="rgba(245,240,232,0.72)";e.currentTarget.style.background="transparent"}}
            >{l}</Link>
          ))}
        </div>

        <div style={{ display:"flex", gap:"10px", alignItems:"center" }} className="nd">
          {user ? (
            <button onClick={()=>dispatch(logout())} style={{
              padding:"9px 22px", borderRadius:"10px", border:"1px solid rgba(212,175,55,0.4)",
              background:"transparent", color:"#D4AF37", fontSize:"14px",
              fontFamily:"'DM Sans',system-ui,sans-serif", fontWeight:"500", cursor:"pointer",
            }}>Sign Out</button>
          ) : (<>
            <Link to="/signin" style={{
              textDecoration:"none", padding:"9px 20px", borderRadius:"10px",
              border:"1px solid rgba(245,240,232,0.15)", color:"rgba(245,240,232,0.85)",
              fontSize:"14px", fontFamily:"'DM Sans',system-ui,sans-serif", fontWeight:"500",
            }}>Sign In</Link>
            <Link to="/signup" style={{
              textDecoration:"none", padding:"9px 22px", borderRadius:"10px",
              background:"linear-gradient(135deg,#D4AF37,#B8941E)", color:"#08080E",
              fontSize:"14px", fontFamily:"'DM Sans',system-ui,sans-serif", fontWeight:"600",
              boxShadow:"0 0 20px rgba(212,175,55,0.3)",
            }}>Get Started</Link>
          </>)}
        </div>

        <button className="nm" onClick={()=>setMenuOpen(!menuOpen)} style={{
          background:"none",border:"none",cursor:"pointer",color:"#F5F0E8",padding:"6px",display:"none",
        }}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            {menuOpen?(<><line x1="4" y1="4" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="18" y1="4" x2="4" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></>):(<><line x1="3" y1="6" x2="19" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="3" y1="11" x2="19" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="3" y1="16" x2="19" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></>)}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div style={{
          background:"rgba(8,8,14,0.97)", backdropFilter:"blur(24px)",
          borderTop:"1px solid rgba(212,175,55,0.12)", padding:"16px 24px 24px",
          display:"flex", flexDirection:"column", gap:"2px",
        }}>
          {[{to:"/",l:"Home"},{to:"/signin",l:"Sign In"},{to:"/signup",l:"Get Started"}].map(({to,l})=>(
            <Link key={l} to={to} style={{
              textDecoration:"none", padding:"12px 14px", color:"#F5F0E8",
              fontFamily:"'DM Sans',system-ui,sans-serif", fontSize:"15px", borderRadius:"10px",
            }}>{l}</Link>
          ))}
        </div>
      )}

      <style>{`@media(max-width:768px){.nd{display:none!important}.nm{display:flex!important}}`}</style>
    </nav>
  );
};
export default NavBar;
