import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../authSlice.js";

const FormInput = ({ label, type, name, value, onChange, required, placeholder, rightEl, error }) => {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ marginBottom: "18px" }}>
      <label style={{
        display: "block", marginBottom: "7px", fontSize: "13px", fontWeight: "500",
        color: error ? "rgba(252,165,165,0.9)" : focused ? "#D4AF37" : "rgba(245,240,232,0.6)",
        fontFamily: "'DM Sans',system-ui,sans-serif", transition: "color 0.2s",
      }}>{label}</label>
      <div style={{ position: "relative" }}>
        <input
          type={type} name={name} value={value} onChange={onChange}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          placeholder={placeholder} required={required}
          style={{
            width: "100%", boxSizing: "border-box",
            padding: rightEl ? "12px 48px 12px 16px" : "12px 16px",
            borderRadius: "11px", fontSize: "14px",
            fontFamily: "'DM Sans',system-ui,sans-serif",
            background: "rgba(255,255,255,0.04)",
            border: `1px solid ${error ? "rgba(239,68,68,0.5)" : focused ? "rgba(212,175,55,0.55)" : "rgba(255,255,255,0.1)"}`,
            color: "#F5F0E8", outline: "none",
            boxShadow: focused ? `0 0 0 3px ${error ? "rgba(239,68,68,0.1)" : "rgba(212,175,55,0.1)"}` : "none",
            transition: "all 0.2s",
          }}
        />
        {rightEl && <div style={{ position:"absolute",right:"14px",top:"50%",transform:"translateY(-50%)" }}>{rightEl}</div>}
      </div>
      {error && <p style={{ margin:"5px 0 0",fontSize:"12px",color:"#fca5a5",fontFamily:"'DM Sans',system-ui,sans-serif" }}>{error}</p>}
    </div>
  );
};

const RegisterForm = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [showPw, setShowPw] = useState(false);
  const [showCPw, setShowCPw] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setFieldErrors(prev => ({ ...prev, [e.target.name]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.email.includes("@")) errs.email = "Enter a valid email";
    if (formData.password.length < 8) errs.password = "Minimum 8 characters";
    if (formData.password !== formData.confirmPassword) errs.confirmPassword = "Passwords do not match";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setFieldErrors(errs); return; }
    dispatch(registerUser({ name: formData.name, email: formData.email, password: formData.password }));
  };

  const EyeBtn = ({ show, toggle }) => (
    <button type="button" onClick={toggle} style={{ background:"none",border:"none",cursor:"pointer",padding:0,color:"rgba(245,240,232,0.4)",display:"flex" }}>
      {show ? (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
      ) : (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
      )}
    </button>
  );

  const pwStrength = () => {
    const p = formData.password;
    if (!p) return null;
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    const labels = ["", "Weak", "Fair", "Good", "Strong"];
    const colors = ["", "#ef4444", "#f59e0b", "#10b981", "#D4AF37"];
    return { score: s, label: labels[s], color: colors[s] };
  };
  const strength = pwStrength();

  return (
    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
      <FormInput label="Full Name" type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Sofia Marchetti" error={fieldErrors.name} />
      <FormInput label="Email Address" type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="you@example.com" error={fieldErrors.email} />
      <FormInput label="Password" type={showPw?"text":"password"} name="password" value={formData.password} onChange={handleChange} required placeholder="Min. 8 characters" error={fieldErrors.password} rightEl={<EyeBtn show={showPw} toggle={()=>setShowPw(p=>!p)}/>} />

      {/* Password strength */}
      {strength && (
        <div style={{ marginTop: "-12px", marginBottom: "16px" }}>
          <div style={{ display:"flex", gap:"4px", marginBottom:"4px" }}>
            {[1,2,3,4].map(i => (
              <div key={i} style={{ flex:1,height:"3px",borderRadius:"2px",background:i<=strength.score?strength.color:"rgba(255,255,255,0.1)",transition:"background 0.3s" }}/>
            ))}
          </div>
          <span style={{ fontSize:"11px",color:strength.color,fontFamily:"'DM Sans',system-ui,sans-serif",fontWeight:"600" }}>{strength.label}</span>
        </div>
      )}

      <FormInput label="Confirm Password" type={showCPw?"text":"password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required placeholder="Re-enter password" error={fieldErrors.confirmPassword} rightEl={<EyeBtn show={showCPw} toggle={()=>setShowCPw(p=>!p)}/>} />

      {error && (
        <div style={{ padding:"12px 16px",borderRadius:"10px",marginBottom:"18px",background:"rgba(239,68,68,0.1)",border:"1px solid rgba(239,68,68,0.25)",fontSize:"14px",color:"#fca5a5",fontFamily:"'DM Sans',system-ui,sans-serif" }}>{error}</div>
      )}

      <div style={{ display:"flex",alignItems:"flex-start",gap:"10px",marginBottom:"24px" }}>
        <input type="checkbox" required id="terms" style={{ marginTop:"2px",accentColor:"#D4AF37",width:"14px",height:"14px" }}/>
        <label htmlFor="terms" style={{ fontSize:"13px",color:"rgba(245,240,232,0.5)",fontFamily:"'DM Sans',system-ui,sans-serif",lineHeight:"1.5",cursor:"pointer" }}>
          I agree to the <a href="#" style={{ color:"#D4AF37",textDecoration:"none" }}>Terms of Service</a> and <a href="#" style={{ color:"#D4AF37",textDecoration:"none" }}>Privacy Policy</a>
        </label>
      </div>

      <button type="submit" disabled={loading} style={{
        width:"100%",padding:"14px",borderRadius:"12px",
        background:loading?"rgba(212,175,55,0.4)":"linear-gradient(135deg,#D4AF37,#B8941E)",
        border:"none",color:"#08080E",fontSize:"16px",fontWeight:"700",
        fontFamily:"'DM Sans',system-ui,sans-serif",cursor:loading?"not-allowed":"pointer",
        boxShadow:loading?"none":"0 0 30px rgba(212,175,55,0.3)",transition:"all 0.25s",
      }}>
        {loading ? (
          <span style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"8px"}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{animation:"spin 0.8s linear infinite"}}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
            Creating account…
          </span>
        ) : "Create Account"}
      </button>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </form>
  );
};

export default RegisterForm;
