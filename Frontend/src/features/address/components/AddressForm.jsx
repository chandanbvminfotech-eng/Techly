import React, { useState, useEffect } from "react";
import { Input } from "../../../components/Input";
import { useDispatch } from "react-redux";
import { createAddress, fetchAddresses, updateAddress } from "../addressSlice.js";

const AddressForm = ({ onSuccess, onCancel, initialData = null }) => {
  const dispatch = useDispatch();
  const isEditMode = !!initialData;

  const [formData, setFormData] = useState({
    name: "",
    state: "",
    city: "",
    addressLine: "",
    phone: "",
    pincode: "",
    isDefault: false,
  });

  // Sync initialData for Edit Mode
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        state: initialData.state || "",
        city: initialData.city || "",
        addressLine: initialData.addressLine || "",
        phone: initialData.phone || "",
        pincode: initialData.pincode || "",
        isDefault: initialData.isDefault || false,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditMode) {
      await dispatch(
        updateAddress({
          addressId: initialData._id,
          formData, 
        }),
      );
      dispatch(fetchAddresses());
    } else {
      await dispatch(createAddress(formData));
      dispatch(fetchAddresses());
    }
    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        {/* Editorial Subheader for Context */}
        <p className="text-[rgba(245,240,232,0.4)] text-[10px] uppercase tracking-[0.2em] font-bold mb-6">
          {isEditMode
            ? "Modify existing destination details"
            : "Register a new secure terminal"}
        </p>

        <Input
          label="Full Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Recipient Name"
        />

        <Input
          label="Phone No"
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          placeholder="10-digit Number"
        />

        <Input
          label="Street Address"
          name="addressLine"
          value={formData.addressLine}
          onChange={handleChange}
          required
          placeholder="Suite, Building, Street"
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
          <Input
            label="State"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4 items-center">
          <Input
            label="Pincode"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            required
            type="number"
          />

          {/* Custom Luxury Checkbox */}
          <label className="flex items-center gap-3 cursor-pointer group mt-6">
            <div className="relative flex items-center justify-center">
              <input
                type="checkbox"
                name="isDefault"
                checked={formData.isDefault}
                onChange={handleChange}
                className="peer sr-only"
              />
              <div className="h-5 w-5 border border-white/20 rounded bg-white/5 peer-checked:bg-[#D4AF37] peer-checked:border-[#D4AF37] transition-all duration-300" />
              <svg
                className="absolute w-3 h-3 text-[#08080E] opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-[rgba(245,240,232,0.4)] group-hover:text-[#F5F0E8] transition-colors">
              Set as Primary Dispatch
            </span>
          </label>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex gap-4 mt-10">
        <button
          type="submit"
          className="flex-1 bg-[#D4AF37] text-[#08080E] py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:shadow-[0_15px_30px_rgba(212,175,55,0.2)] transition-all active:scale-95"
        >
          {isEditMode ? "Update Registry" : "Confirm Registry"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-8 py-4 rounded-xl border border-white/10 text-[rgba(245,240,232,0.6)] text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/5 transition-all"
        >
          Discard
        </button>
      </div>
    </form>
  );
};

export default AddressForm;
