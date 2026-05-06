import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";

const SocialButton = ({ icon, label }) => (
  <button
    className="flex-1 flex items-center justify-center gap-[10px] px-4 py-3 rounded-[11px] text-sm font-medium transition-all duration-200"
    style={{ border: "1px solid var(--border-subtle)", background: "var(--input-bg)", color: "var(--text-secondary)" }}
    onMouseEnter={e => { e.currentTarget.style.background = "var(--bg-chip)"; e.currentTarget.style.borderColor = "var(--border-medium)"; }}
    onMouseLeave={e => { e.currentTarget.style.background = "var(--input-bg)"; e.currentTarget.style.borderColor = "var(--border-subtle)"; }}
  >
    {icon}
    <span>{label}</span>
  </button>
);

const GoogleIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const RegisterPage = () => {
  const { registerSuccess } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (registerSuccess) navigate("/signin");
  }, [registerSuccess, navigate]);

  return (
    <div className="min-h-screen flex" style={{ background: "var(--bg-base)" }}>
      {/* Left panel */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden" style={{ background: "linear-gradient(160deg,#0a0a16 0%,#16100a 55%,#0a0f0a 100%)" }}>
        <div className="absolute top-[25%] right-[15%] w-[350px] h-[350px] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.1)_0%,transparent_70%)] blur-[50px]" />
        <div className="absolute bottom-[15%] left-[10%] w-[280px] h-[280px] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.07)_0%,transparent_70%)] blur-[40px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="absolute inset-0 flex flex-col justify-center items-center px-[60px] text-center">
          <div className="text-[44px] mb-5" style={{ color: "#D4AF37" }}>◈</div>
          <h2 className="mb-4 text-[clamp(28px,3vw,42px)] font-[Georgia,serif] italic leading-[1.15]" style={{ color: "#F5F0E8" }}>
            Join the<br />Inner Circle
          </h2>
          <p className="mb-10 text-[16px] leading-[1.7] max-w-[300px]" style={{ color: "rgba(245,240,232,0.45)" }}>
            Unlock exclusive access to curated selections and early releases.
          </p>
          <div className="flex flex-col gap-3 max-w-[300px] w-full">
            {[
              { icon: "✦", text: "Priority access to limited releases" },
              { icon: "◉", text: "Free standard shipping on all orders" },
              { icon: "◈", text: "7-day easy return policy" },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-3 px-4 py-3 bg-white/[0.04] backdrop-blur-md border border-white/[0.07] rounded-[12px] text-left">
                <span className="text-lg min-w-[20px]" style={{ color: "#D4AF37" }}>{icon}</span>
                <span className="text-[14px] leading-[1.4]" style={{ color: "rgba(245,240,232,0.7)" }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-6 sm:px-12 py-20 min-w-0 overflow-y-auto">
        <div className="w-full max-w-[420px]">
          <Link to="/" className="inline-flex items-center gap-[10px] mb-10 no-underline">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#F5E090] flex items-center justify-center">
              <span className="text-[16px] font-black text-[#08080E] font-[Georgia,serif]">T</span>
            </div>
            <span className="text-[20px] font-[Georgia,serif]" style={{ color: "var(--text-primary)" }}>Techly</span>
          </Link>

          <h1 className="mb-2 text-[clamp(26px,4vw,34px)] font-[Georgia,serif] tracking-[-0.5px]" style={{ color: "var(--text-primary)" }}>
            Create account
          </h1>
          <p className="mb-8 text-[15px] leading-[1.6]" style={{ color: "var(--text-muted)" }}>
            Already a member?{" "}
            <Link to="/signin" className="font-medium no-underline" style={{ color: "var(--gold)" }}>Sign in →</Link>
          </p>

          <div className="flex gap-[10px] mb-6">
            <SocialButton icon={<GoogleIcon />} label="Continue with Google" />
          </div>

          <div className="flex items-center gap-[14px] mb-6">
            <div className="flex-1 h-[1px]" style={{ background: "var(--border-subtle)" }} />
            <span className="text-[12px] font-medium tracking-[0.06em] uppercase" style={{ color: "var(--text-muted)" }}>or with email</span>
            <div className="flex-1 h-[1px]" style={{ background: "var(--border-subtle)" }} />
          </div>

          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
