import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../authSlice.js";

const Input = ({ label, type, name, value, onChange, required, placeholder, rightEl }) => {
  const [focused, setFocused] = useState(false);
  const [hasVal, setHasVal] = useState(false);
  return (
    <div style={{ position: "relative", marginBottom: "20px" }}>
      <label style={{
        display: "block", marginBottom: "8px", fontSize: "13px", fontWeight: "500",
        color: focused ? "#D4AF37" : "rgba(245,240,232,0.6)",
        fontFamily: "'DM Sans',system-ui,sans-serif", transition: "color 0.2s",
        letterSpacing: "0.02em",
      }}>{label}</label>
      <div style={{ position: "relative" }}>
        <input
          type={type} name={name} value={value}
          onChange={(e) => { onChange(e); setHasVal(!!e.target.value); }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          required={required}
          style={{
            width: "100%", boxSizing: "border-box",
            padding: rightEl ? "13px 48px 13px 16px" : "13px 16px",
            borderRadius: "12px", fontSize: "15px",
            fontFamily: "'DM Sans',system-ui,sans-serif",
            background: "rgba(255,255,255,0.04)",
            border: `1px solid ${focused ? "rgba(212,175,55,0.6)" : "rgba(255,255,255,0.1)"}`,
            color: "#F5F0E8", outline: "none",
            transition: "border-color 0.2s, box-shadow 0.2s",
            boxShadow: focused ? "0 0 0 3px rgba(212,175,55,0.1)" : "none",
          }}
        />
        {rightEl && (
          <div style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)" }}>
            {rightEl}
          </div>
        )}
      </div>
    </div>
  );
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => { e.preventDefault(); dispatch(loginUser(formData)); };
  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const EyeIcon = ({ show }) => (
    <button type="button" onClick={() => setShowPassword(p => !p)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, color: "rgba(245,240,232,0.4)", display: "flex" }}>
      {show ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
      )}
    </button>
  );

  return (
    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
      <Input label="Email address" type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="you@example.com" />
      <Input label="Password" type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} required placeholder="Your password" rightEl={<EyeIcon show={showPassword} />} />

      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "28px", marginTop: "-10px" }}>
        <a href="#" style={{ fontSize: "13px", color: "#D4AF37", textDecoration: "none", fontFamily: "'DM Sans',system-ui,sans-serif" }}>Forgot password?</a>
      </div>

      {error && (
        <div style={{
          padding: "12px 16px", borderRadius: "10px", marginBottom: "20px",
          background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)",
          fontSize: "14px", color: "#fca5a5", fontFamily: "'DM Sans',system-ui,sans-serif",
        }}>{error}</div>
      )}

      <button type="submit" disabled={loading} style={{
        width: "100%", padding: "14px", borderRadius: "12px",
        background: loading ? "rgba(212,175,55,0.4)" : "linear-gradient(135deg,#D4AF37,#B8941E)",
        border: "none", color: "#08080E", fontSize: "16px", fontWeight: "700",
        fontFamily: "'DM Sans',system-ui,sans-serif", cursor: loading ? "not-allowed" : "pointer",
        boxShadow: loading ? "none" : "0 0 30px rgba(212,175,55,0.3)",
        transition: "all 0.25s",
      }}>
        {loading ? (
          <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: "spin 0.8s linear infinite" }}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
            Signing in…
          </span>
        ) : "Sign In"}
      </button>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </form>
  );
};

export default LoginForm;
