import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../authSlice.js";

const FormInput = ({
  label,
  type,
  name,
  value,
  onChange,
  required,
  placeholder,
  rightEl,
  error,
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="mb-[18px]">
      <label
        className={`block mb-[7px] text-[13px] font-medium transition-colors duration-200 font-['DM_Sans',system-ui,sans-serif]
        ${
          error
            ? "text-[rgba(252,165,165,0.9)]"
            : focused
              ? "text-[#D4AF37]"
              : "text-[rgba(245,240,232,0.6)]"
        }`}
      >
        {label}
      </label>

      <div className="relative">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          required={required}
          className={`w-full box-border text-[14px] rounded-[11px] font-['DM_Sans',system-ui,sans-serif]
          bg-[rgba(255,255,255,0.04)] text-[#F5F0E8] outline-none transition-all duration-200
          ${rightEl ? "pr-[48px] pl-[16px] py-[12px]" : "px-[16px] py-[12px]"}
          ${
            error
              ? "border border-[rgba(239,68,68,0.5)] focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]"
              : focused
                ? "border border-[rgba(212,175,55,0.55)] shadow-[0_0_0_3px_rgba(212,175,55,0.1)]"
                : "border border-[rgba(255,255,255,0.1)]"
          }`}
        />

        {rightEl && (
          <div className="absolute right-[14px] top-1/2 -translate-y-1/2">
            {rightEl}
          </div>
        )}
      </div>

      {error && (
        <p className="mt-[5px] text-[12px] text-[#fca5a5] font-['DM_Sans',system-ui,sans-serif]">
          {error}
        </p>
      )}
    </div>
  );
};

const RegisterForm = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [showPw, setShowPw] = useState(false);
  const [showCPw, setShowCPw] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setFieldErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.email.includes("@")) errs.email = "Enter a valid email";
    if (formData.password.length < 8) errs.password = "Minimum 8 characters";
    if (formData.password !== formData.confirmPassword)
      errs.confirmPassword = "Passwords do not match";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setFieldErrors(errs);
      return;
    }
    dispatch(
      registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      }),
    );
  };

  const EyeBtn = ({ show, toggle }) => (
    <button
      type="button"
      onClick={toggle}
      className="bg-none border-none cursor-pointer p-0 text-[rgba(245,240,232,0.4)] flex"
    >
      {show ? (
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
          <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
          <line x1="1" y1="1" x2="23" y2="23" />
        </svg>
      ) : (
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
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
    <form onSubmit={handleSubmit} className="w-full">
      <FormInput
        label="Full Name"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        placeholder="Sofia Marchetti"
        error={fieldErrors.name}
      />
      <FormInput
        label="Email Address"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        placeholder="you@example.com"
        error={fieldErrors.email}
      />
      <FormInput
        label="Password"
        type={showPw ? "text" : "password"}
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
        placeholder="Min. 8 characters"
        error={fieldErrors.password}
        rightEl={<EyeBtn show={showPw} toggle={() => setShowPw((p) => !p)} />}
      />

      {/* Strength */}
      {strength && (
        <div className="mt-[-12px] mb-4">
          <div className="flex gap-[4px] mb-[4px]">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex-1 h-[3px] rounded-[2px] transition-all duration-300"
                style={{
                  background:
                    i <= strength.score
                      ? strength.color
                      : "rgba(255,255,255,0.1)",
                }}
              />
            ))}
          </div>
          <span
            className="text-[11px] font-semibold font-['DM_Sans',system-ui,sans-serif]"
            style={{ color: strength.color }}
          >
            {strength.label}
          </span>
        </div>
      )}

      <FormInput
        label="Confirm Password"
        type={showCPw ? "text" : "password"}
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
        placeholder="Re-enter password"
        error={fieldErrors.confirmPassword}
        rightEl={<EyeBtn show={showCPw} toggle={() => setShowCPw((p) => !p)} />}
      />

      {error && (
        <div className="px-4 py-3 rounded-[10px] mb-[18px] bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.25)] text-[14px] text-[#fca5a5] font-['DM_Sans',system-ui,sans-serif]">
          {error}
        </div>
      )}

      {/* Terms */}
      <div className="flex items-start gap-[10px] mb-6">
        <input
          type="checkbox"
          required
          id="terms"
          className="mt-[2px] w-[14px] h-[14px] accent-[#D4AF37]"
        />
        <label
          htmlFor="terms"
          className="text-[13px] text-[rgba(245,240,232,0.5)] leading-[1.5] cursor-pointer font-['DM_Sans',system-ui,sans-serif]"
        >
          I agree to the{" "}
          <a href="#" className="text-[#D4AF37] no-underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-[#D4AF37] no-underline">
            Privacy Policy
          </a>
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-[14px] rounded-[12px] text-[16px] font-bold transition-all duration-200
        ${
          loading
            ? "bg-[rgba(212,175,55,0.4)] cursor-not-allowed"
            : "bg-gradient-to-br from-[#D4AF37] to-[#B8941E] shadow-[0_0_30px_rgba(212,175,55,0.3)] cursor-pointer"
        }
        text-[#08080E]`}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
            Creating account…
          </span>
        ) : (
          "Create Account"
        )}
      </button>
    </form>
  );
};

export default RegisterForm;
