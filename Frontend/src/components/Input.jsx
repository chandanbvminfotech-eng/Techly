import { useState } from "react";

export const Input = ({ label, type, name, value, onChange, required, placeholder, rightEl }) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative mb-5">
      <label
        className="block mb-2 text-[13px] font-medium tracking-[0.02em] transition-colors duration-200"
        style={{ color: focused ? "var(--gold)" : "var(--text-secondary)" }}
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
          className="w-full box-border text-[15px] rounded-[12px] outline-none transition-all duration-200"
          style={{
            background: "var(--input-bg)",
            color: "var(--text-primary)",
            border: focused ? "1px solid var(--gold)" : "1px solid var(--border-subtle)",
            boxShadow: focused ? "0 0 0 3px var(--gold-muted)" : "none",
            padding: rightEl ? "13px 48px 13px 16px" : "13px 16px",
          }}
        />

        {rightEl && (
          <div className="absolute right-[14px] top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }}>
            {rightEl}
          </div>
        )}
      </div>
    </div>
  );
};
