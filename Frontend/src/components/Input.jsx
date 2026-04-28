import { useState } from "react";

export const Input = ({
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
