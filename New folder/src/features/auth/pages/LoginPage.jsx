import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";

const SocialButton = ({ icon, label }) => (
  <button style={{
    flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:"10px",
    padding:"12px 16px", borderRadius:"11px",
    border:"1px solid rgba(255,255,255,0.1)", background:"rgba(255,255,255,0.04)",
    color:"rgba(245,240,232,0.8)", fontSize:"14px", fontWeight:"500",
    fontFamily:"'DM Sans',system-ui,sans-serif", cursor:"pointer",
    transition:"all 0.2s",
  }}
  onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,0.08)";e.currentTarget.style.borderColor="rgba(255,255,255,0.18)"}}
  onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.04)";e.currentTarget.style.borderColor="rgba(255,255,255,0.1)"}}
  >
    {icon}
    <span>{label}</span>
  </button>
);

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
);

const AppleIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
);

const LoginPage = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => { if (user) navigate("/"); }, [user, navigate]);

  return (
    <div style={{
      minHeight: "100vh", display: "flex",
      background: "#08080E",
      fontFamily: "'DM Sans',system-ui,sans-serif",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap" rel="stylesheet" />

      {/* ── Left panel – decorative ──────────────────── */}
      <div style={{
        flex: 1, display: "none", position: "relative", overflow: "hidden",
        background: "linear-gradient(160deg, #0d0d1a 0%, #1a1208 50%, #0a0d0a 100%)",
      }} className="auth-panel">
        {/* Orbs */}
        <div style={{ position:"absolute",top:"15%",left:"20%",width:"320px",height:"320px",borderRadius:"50%",background:"radial-gradient(circle,rgba(212,175,55,0.12) 0%,transparent 70%)",filter:"blur(40px)" }}/>
        <div style={{ position:"absolute",bottom:"20%",right:"10%",width:"260px",height:"260px",borderRadius:"50%",background:"radial-gradient(circle,rgba(99,102,241,0.1) 0%,transparent 70%)",filter:"blur(40px)" }}/>
        <div style={{ position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)",backgroundSize:"48px 48px" }}/>

        <div style={{
          position:"absolute",inset:0,display:"flex",flexDirection:"column",
          justifyContent:"center",alignItems:"center",padding:"60px",textAlign:"center",
        }}>
          <div style={{ marginBottom:"40px" }}>
            <div style={{ fontSize:"48px",marginBottom:"16px" }}>✦</div>
            <h2 style={{ margin:"0 0 16px",fontSize:"clamp(28px,3vw,40px)",fontWeight:"400",color:"#F5F0E8",fontFamily:"Georgia,'Times New Roman',serif",fontStyle:"italic",letterSpacing:"-0.5px",lineHeight:"1.15" }}>
              Welcome<br/>Back
            </h2>
            <p style={{ margin:0,fontSize:"16px",color:"rgba(245,240,232,0.45)",lineHeight:"1.7",maxWidth:"300px" }}>
              Sign in to access your curated collection and exclusive member benefits.
            </p>
          </div>

          {/* Testimonial card */}
          <div style={{
            background:"rgba(255,255,255,0.04)",backdropFilter:"blur(16px)",
            border:"1px solid rgba(255,255,255,0.08)",borderRadius:"18px",
            padding:"24px 28px",maxWidth:"340px",textAlign:"left",
          }}>
            <div style={{ display:"flex",gap:"2px",marginBottom:"12px" }}>
              {[...Array(5)].map((_,i)=><span key={i} style={{ color:"#D4AF37",fontSize:"14px" }}>★</span>)}
            </div>
            <p style={{ margin:"0 0 16px",fontSize:"14px",color:"rgba(245,240,232,0.7)",fontFamily:"Georgia,serif",fontStyle:"italic",lineHeight:"1.6" }}>
              "The most refined shopping experience I've encountered. Absolutely unmatched."
            </p>
            <div style={{ display:"flex",alignItems:"center",gap:"10px" }}>
              <div style={{ width:"34px",height:"34px",borderRadius:"50%",background:"linear-gradient(135deg,#D4AF37,#B8941E)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"14px",fontWeight:"700",color:"#08080E" }}>A</div>
              <div>
                <div style={{ fontSize:"13px",fontWeight:"600",color:"#F5F0E8" }}>Alessandra V.</div>
                <div style={{ fontSize:"12px",color:"rgba(245,240,232,0.4)" }}>Milan, Italy</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right panel – form ───────────────────────── */}
      <div style={{
        flex:1, display:"flex", alignItems:"center", justifyContent:"center",
        padding:"80px 48px 60px",
        background:"#08080E",
        minWidth:0,
      }}>
        <div style={{ width:"100%", maxWidth:"420px" }}>
          {/* Logo */}
          <Link to="/" style={{ textDecoration:"none",display:"inline-flex",alignItems:"center",gap:"10px",marginBottom:"48px" }}>
            <div style={{ width:"32px",height:"32px",borderRadius:"8px",background:"linear-gradient(135deg,#D4AF37,#F5E090)",display:"flex",alignItems:"center",justifyContent:"center" }}>
              <span style={{ fontSize:"16px",fontWeight:"900",color:"#08080E",fontFamily:"Georgia,serif" }}>L</span>
            </div>
            <span style={{ fontFamily:"Georgia,serif",fontSize:"20px",color:"#F5F0E8" }}>Luxe</span>
          </Link>

          <h1 style={{ margin:"0 0 8px",fontSize:"clamp(26px,4vw,34px)",fontWeight:"400",color:"#F5F0E8",fontFamily:"Georgia,serif",letterSpacing:"-0.5px" }}>
            Sign in
          </h1>
          <p style={{ margin:"0 0 36px",fontSize:"15px",color:"rgba(245,240,232,0.45)",lineHeight:"1.6" }}>
            Don't have an account?{" "}
            <Link to="/signup" style={{ color:"#D4AF37",textDecoration:"none",fontWeight:"500" }}>Create one →</Link>
          </p>

          {/* Social buttons */}
          <div style={{ display:"flex",gap:"10px",marginBottom:"28px" }}>
            <SocialButton icon={<GoogleIcon/>} label="Google" />
            <SocialButton icon={<AppleIcon/>} label="Apple" />
          </div>

          {/* Divider */}
          <div style={{ display:"flex",alignItems:"center",gap:"14px",marginBottom:"28px" }}>
            <div style={{ flex:1,height:"1px",background:"rgba(255,255,255,0.08)" }}/>
            <span style={{ fontSize:"12px",color:"rgba(245,240,232,0.3)",fontWeight:"500",letterSpacing:"0.06em",textTransform:"uppercase" }}>or continue with email</span>
            <div style={{ flex:1,height:"1px",background:"rgba(255,255,255,0.08)" }}/>
          </div>

          <LoginForm />
        </div>
      </div>

      <style>{`@media(min-width:900px){.auth-panel{display:flex!important}}`}</style>
    </div>
  );
};

export default LoginPage;
