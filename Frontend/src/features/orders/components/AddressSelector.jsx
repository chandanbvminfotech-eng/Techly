import React from "react";
import { useNavigate } from "react-router-dom";

const AddressSelector = ({ addresses, selectedAddressId, onSelectAddress }) => {
  const navigate = useNavigate();

  if (addresses.length === 0) {
    return (
      <div>
        <h2 className="text-base font-bold mb-4" style={{ color: "var(--text-primary)" }}>Shipping Address</h2>
        <div className="text-center py-6 rounded-xl" style={{ background: "var(--input-bg)", border: "1px solid var(--border-subtle)" }}>
          <p className="text-sm mb-3" style={{ color: "var(--text-secondary)" }}>No addresses saved yet</p>
          <button onClick={() => navigate("/profile?tab=addresses")} className="text-sm font-semibold underline" style={{ color: "var(--gold)" }}>
            Add an address →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-base font-bold mb-4" style={{ color: "var(--text-primary)" }}>Shipping Address</h2>
      <div className="space-y-3">
        {addresses.map((addr) => (
          <label
            key={addr._id}
            className="flex items-start gap-3 p-4 rounded-xl cursor-pointer transition-all"
            style={{
              background: selectedAddressId === addr._id ? "var(--gold-muted)" : "var(--input-bg)",
              border: `1px solid ${selectedAddressId === addr._id ? "var(--gold)" : "var(--border-subtle)"}`,
            }}
          >
            <input
              type="radio"
              name="address"
              value={addr._id}
              checked={selectedAddressId === addr._id}
              onChange={() => onSelectAddress(addr._id)}
              className="mt-0.5 accent-[#D4AF37]"
            />
            <div className="flex-1">
              <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                {addr.name}
                {addr.isDefault && <span className="ml-2 text-[11px] font-bold" style={{ color: "var(--gold)" }}>(Default)</span>}
              </p>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{addr.phone}</p>
              <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>
                {addr.addressLine}, {addr.city}, {addr.state} – {addr.pincode}
              </p>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default AddressSelector;
