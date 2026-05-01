import React from "react";
import { useNavigate } from "react-router-dom";

const AddressSelector = ({ addresses, selectedAddressId, onSelectAddress }) => {
  const navigate = useNavigate();

  if (addresses.length === 0) {
    return (
      <div className="bg-[rgba(255,255,255,0.04)] rounded-xl p-5 mb-6">
        <h2 className="text-lg font-semibold text-white mb-4">
          Shipping Address
        </h2>
        <div className="text-center py-4">
          <p className="text-[rgba(245,240,232,0.6)] mb-3">
            No addresses saved
          </p>
          <button
            onClick={() => navigate("/profile?tab=addresses")}
            className="text-[#D4AF37] text-sm underline"
          >
            Add an address first
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[rgba(255,255,255,0.04)] rounded-xl p-5 mb-6">
      <h2 className="text-lg font-semibold text-white mb-4">
        Shipping Address
      </h2>
      <div className="space-y-3">
        {addresses.map((addr) => (
          <label
            key={addr._id}
            className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all ${
              selectedAddressId === addr._id
                ? "bg-[rgba(212,175,55,0.1)] border border-[#D4AF37]"
                : "bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.1)]"
            }`}
          >
            <input
              type="radio"
              name="address"
              value={addr._id}
              checked={selectedAddressId === addr._id}
              onChange={() => onSelectAddress(addr._id)}
              className="mt-1"
            />
            <div className="flex-1">
              <p className="text-white text-sm font-medium">
                {addr.name}{" "}
                {addr.isDefault && (
                  <span className="text-[#D4AF37] text-xs ml-2">(Default)</span>
                )}
              </p>
              <p className="text-[rgba(245,240,232,0.6)] text-xs">
                {addr.phone}
              </p>
              <p className="text-[rgba(245,240,232,0.5)] text-xs mt-1">
                {addr.addressLine}, {addr.city}, {addr.state} - {addr.pincode}
              </p>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default AddressSelector;
