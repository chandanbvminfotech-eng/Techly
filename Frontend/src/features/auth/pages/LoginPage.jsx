import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";

const SocialButton = ({ icon, label }) => (
  <button
    className="flex-1 flex items-center justify-center gap-[10px] px-4 py-3 rounded-[11px]
    border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.04)]
    text-[rgba(245,240,232,0.8)] text-sm font-medium
    font-['DM_Sans',system-ui,sans-serif]
    transition-all duration-200
    hover:bg-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.18)]"
  >
    {icon}
    <span>{label}</span>
  </button>
);

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

const AppleIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

const LoginPage = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex bg-[#08080E] font-['DM_Sans',system-ui,sans-serif]">
      {/* LEFT PANEL */}
      <div
        className="hidden lg:flex flex-1 relative overflow-hidden
        bg-[linear-gradient(160deg,#0d0d1a_0%,#1a1208_50%,#0a0d0a_100%)]"
      >
        {/* Orbs */}
        <div
          className="absolute top-[15%] left-[20%] w-[320px] h-[320px] rounded-full
          bg-[radial-gradient(circle,rgba(212,175,55,0.12)_0%,transparent_70%)] blur-[40px]"
        />

        <div
          className="absolute bottom-[20%] right-[10%] w-[260px] h-[260px] rounded-full
          bg-[radial-gradient(circle,rgba(99,102,241,0.1)_0%,transparent_70%)] blur-[40px]"
        />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px]" />

        <div className="absolute inset-0 flex flex-col justify-center items-center px-[60px] text-center">
          <div className="mb-10">
            <div className="text-[48px] mb-4">✦</div>
            <h2
              className="mb-4 text-[clamp(28px,3vw,40px)] text-[#F5F0E8]
              font-[Georgia,'Times New Roman',serif] italic tracking-[-0.5px] leading-[1.15]"
            >
              Welcome
              <br />
              Back
            </h2>
            <p className="text-[16px] text-[rgba(245,240,232,0.45)] leading-[1.7] max-w-[300px]">
              Sign in to access your curated collection and exclusive member
              benefits.
            </p>
          </div>

          {/* Testimonial */}
          <div
            className="bg-[rgba(255,255,255,0.04)] backdrop-blur-xl
            border border-[rgba(255,255,255,0.08)] rounded-[18px]
            px-[28px] py-6 max-w-[340px] text-left"
          >
            <div className="flex gap-[2px] mb-3">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-[#D4AF37] text-sm">
                  ★
                </span>
              ))}
            </div>

            <p
              className="mb-4 text-sm text-[rgba(245,240,232,0.7)]
              font-[Georgia,serif] italic leading-[1.6]"
            >
              "The most refined shopping experience I've encountered. Absolutely
              unmatched."
            </p>

            <div className="flex items-center gap-[10px]">
              <div
                className="w-[34px] h-[34px] rounded-full
                bg-gradient-to-br from-[#D4AF37] to-[#B8941E]
                flex items-center justify-center text-sm font-bold text-[#08080E]"
              >
                A
              </div>
              <div>
                <div className="text-[13px] font-semibold text-[#F5F0E8]">
                  Alessandra V.
                </div>
                <div className="text-[12px] text-[rgba(245,240,232,0.4)]">
                  Milan, Italy
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 flex items-center justify-center px-12 py-[80px] min-w-0">
        <div className="w-full max-w-[420px]">
          {/* Logo */}
          <Link
            to="/"
            className="inline-flex items-center gap-[10px] mb-12 no-underline"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#F5E090] flex items-center justify-center">
              <span className="text-[16px] font-black text-[#08080E] font-[Georgia,serif]">
                L
              </span>
            </div>
            <span className="text-[20px] text-[#F5F0E8] font-[Georgia,serif]">
              Techly
            </span>
          </Link>

          <h1 className="mb-2 text-[clamp(26px,4vw,34px)] text-[#F5F0E8] font-[Georgia,serif] tracking-[-0.5px]">
            Sign in
          </h1>

          <p className="mb-9 text-[15px] text-[rgba(245,240,232,0.45)] leading-[1.6]">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-[#D4AF37] font-medium no-underline"
            >
              Create one →
            </Link>
          </p>

          {/* Social */}
          <div className="flex gap-[10px] mb-7">
            <SocialButton icon={<GoogleIcon />} label="Google" />
            <SocialButton icon={<AppleIcon />} label="Apple" />
          </div>

          {/* Divider */}
          <div className="flex items-center gap-[14px] mb-7">
            <div className="flex-1 h-[1px] bg-[rgba(255,255,255,0.08)]" />
            <span className="text-[12px] text-[rgba(245,240,232,0.3)] font-medium tracking-[0.06em] uppercase">
              or continue with email
            </span>
            <div className="flex-1 h-[1px] bg-[rgba(255,255,255,0.08)]" />
          </div>

          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
