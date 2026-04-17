import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../authSlice.js";

const Input = ({
  label,
  type,
  name,
  value,
  onChange,
  required,
  placeholder,
  rightEl,
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative mb-5">
      <label
        className={`block mb-2 text-[13px] font-medium tracking-[0.02em] font-['DM_Sans',system-ui,sans-serif] transition-colors duration-200 ${
          focused ? "text-[#D4AF37]" : "text-[rgba(245,240,232,0.6)]"
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
          className={`w-full box-border text-[15px] rounded-[12px] font-['DM_Sans',system-ui,sans-serif] 
          bg-[rgba(255,255,255,0.04)] text-[#F5F0E8] outline-none transition-all duration-200
          ${rightEl ? "pr-[48px] pl-[16px] py-[13px]" : "px-[16px] py-[13px]"}
          ${
            focused
              ? "border border-[rgba(212,175,55,0.6)] shadow-[0_0_0_3px_rgba(212,175,55,0.1)]"
              : "border border-[rgba(255,255,255,0.1)]"
          }`}
        />

        {rightEl && (
          <div className="absolute right-[14px] top-1/2 -translate-y-1/2">
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

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  const handleChange = (e) =>
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  const EyeIcon = ({ show }) => (
    <button
      type="button"
      onClick={() => setShowPassword((p) => !p)}
      className="bg-none border-none cursor-pointer p-0 text-[rgba(245,240,232,0.4)] flex"
    >
      {show ? (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
          <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
          <line x1="1" y1="1" x2="23" y2="23" />
        </svg>
      ) : (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      )}
    </button>
  );

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <Input
        label="Email address"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        placeholder="you@example.com"
      />

      <Input
        label="Password"
        type={showPassword ? "text" : "password"}
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
        placeholder="Your password"
        rightEl={<EyeIcon show={showPassword} />}
      />

      {/* Forgot Password */}
      <div className="flex justify-end mb-7 -mt-2">
        <a
          href="#"
          className="text-[13px] text-[#D4AF37] no-underline font-['DM_Sans',system-ui,sans-serif]"
        >
          Forgot password?
        </a>
      </div>

      {/* Error */}
      {error && (
        <div className="px-4 py-3 rounded-[10px] mb-5 bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.25)] text-[14px] text-[#fca5a5] font-['DM_Sans',system-ui,sans-serif]">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-[14px] rounded-[12px] text-[16px] font-bold font-['DM_Sans',system-ui,sans-serif] transition-all duration-200
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
            Signing in…
          </span>
        ) : (
          "Sign In"
        )}
      </button>
    </form>
  );
};

export default LoginForm;
