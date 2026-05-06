import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center text-center px-8" style={{ background: "var(--bg-base)" }}>
    <div className="text-[110px] font-[Georgia,serif] leading-none mb-2" style={{ color: "var(--gold-muted)" }}>404</div>
    <h1 className="text-[32px] font-[Georgia,serif] italic mb-3" style={{ color: "var(--text-primary)" }}>Page Not Found</h1>
    <p className="text-[16px] mb-9" style={{ color: "var(--text-secondary)" }}>The page you're looking for doesn't exist.</p>
    <Link
      to="/"
      className="no-underline px-8 py-3.5 rounded-xl font-bold text-[15px]"
      style={{ background: "linear-gradient(135deg,#D4AF37,#B8941E)", color: "#08080E" }}
    >
      Return Home
    </Link>
  </div>
);

export default NotFound;
