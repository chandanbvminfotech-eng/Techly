import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createAddress, updateAddress } from "../addressSlice.js"; // Adjust import path as needed

const Input = ({
  label,
  type,
  name,
  value,
  onChange,
  required,
  placeholder,
  error,
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative mb-5">
      <label
        className={`block mb-2 text-[13px] font-medium tracking-[0.02em] font-['DM_Sans',system-ui,sans-serif] transition-colors duration-200 ${
          focused ? "text-[#D4AF37]" : "text-[rgba(245,240,232,0.6)]"
        }`}
      >
        {label} {required && <span className="text-red-500">*</span>}
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
          px-[16px] py-[13px]
          ${
            focused
              ? "border border-[rgba(212,175,55,0.6)] shadow-[0_0_0_3px_rgba(212,175,55,0.1)]"
              : error
                ? "border border-red-500"
                : "border border-[rgba(255,255,255,0.1)]"
          }`}
        />
      </div>

      {error && (
        <p className="text-red-500 text-[11px] mt-1 font-['DM_Sans',system-ui,sans-serif]">
          {error}
        </p>
      )}
    </div>
  );
};

const AddressForm = ({ initialData, onSuccess, onCancel, isEditing = false }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    pincode: "",
    city: "",
    state: "",
    addressLine: "",
    isDefault: false,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        phone: initialData.phone || "",
        pincode: initialData.pincode || "",
        city: initialData.city || "",
        state: initialData.state || "",
        addressLine: initialData.addressLine || "",
        isDefault: initialData.isDefault || false,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    // Clear error for this field
    if (fieldErrors[name]) {
      setFieldErrors({ ...fieldErrors, [name]: "" });
    }
    if (generalError) setGeneralError("");
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = "Full name is required";
    }
    
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      errors.phone = "Please enter a valid 10-digit phone number";
    }
    
    if (!formData.pincode.trim()) {
      errors.pincode = "Pincode is required";
    } else if (!/^[0-9]{6}$/.test(formData.pincode)) {
      errors.pincode = "Please enter a valid 6-digit pincode";
    }
    
    if (!formData.city.trim()) {
      errors.city = "City is required";
    }
    
    if (!formData.state.trim()) {
      errors.state = "State is required";
    }
    
    if (!formData.addressLine.trim()) {
      errors.addressLine = "Address line is required";
    }
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setGeneralError("");
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      if (isEditing && initialData?._id) {
        await dispatch(updateAddress({ id: initialData._id, addressData: formData })).unwrap();
      } else {
        await dispatch(createAddress(formData)).unwrap();
      }
      onSuccess();
    } catch (error) {
      console.error("Address save failed:", error);
      const errorMessage = error?.response?.data?.message || error?.message || "Failed to save address. Please try again.";
      setGeneralError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* General Error Display */}
      {generalError && (
        <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30">
          <p className="text-red-500 text-[12px] text-center font-['DM_Sans',system-ui,sans-serif]">
            {generalError}
          </p>
        </div>
      )}

      {/* Name */}
      <Input
        label="Full Name"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="John Doe"
        required
        error={fieldErrors.name}
      />

      {/* Phone */}
      <Input
        label="Phone Number"
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="9876543210"
        required
        error={fieldErrors.phone}
      />

      {/* Pincode */}
      <Input
        label="Pincode"
        type="text"
        name="pincode"
        value={formData.pincode}
        onChange={handleChange}
        placeholder="110001"
        required
        error={fieldErrors.pincode}
      />

      {/* City and State - Two Column Layout */}
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="City"
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="New Delhi"
          required
          error={fieldErrors.city}
        />

        <Input
          label="State"
          type="text"
          name="state"
          value={formData.state}
          onChange={handleChange}
          placeholder="Delhi"
          required
          error={fieldErrors.state}
        />
      </div>

      {/* Address Line */}
      <div className="relative mb-5">
        <label className="block mb-2 text-[13px] font-medium tracking-[0.02em] font-['DM_Sans',system-ui,sans-serif] text-[rgba(245,240,232,0.6)]">
          Address Line <span className="text-red-500">*</span>
        </label>
        <textarea
          name="addressLine"
          value={formData.addressLine}
          onChange={handleChange}
          placeholder="House No., Street, Landmark"
          required
          rows="3"
          className={`w-full box-border text-[15px] rounded-[12px] font-['DM_Sans',system-ui,sans-serif] 
          bg-[rgba(255,255,255,0.04)] text-[#F5F0E8] outline-none transition-all duration-200
          px-[16px] py-[13px] resize-none
          ${
            fieldErrors.addressLine
              ? "border border-red-500"
              : "border border-[rgba(255,255,255,0.1)] focus:border-[rgba(212,175,55,0.6)]"
          }`}
        />
        {fieldErrors.addressLine && (
          <p className="text-red-500 text-[11px] mt-1 font-['DM_Sans',system-ui,sans-serif]">
            {fieldErrors.addressLine}
          </p>
        )}
      </div>

      {/* Default Address Checkbox */}
      <div className="flex items-center gap-3 mb-6">
        <input
          type="checkbox"
          name="isDefault"
          id="isDefault"
          checked={formData.isDefault}
          onChange={handleChange}
          className="w-4 h-4 rounded border border-[rgba(255,255,255,0.2)] bg-transparent checked:bg-[#D4AF37] checked:border-[#D4AF37] focus:ring-[#D4AF37] focus:ring-offset-0"
        />
        <label
          htmlFor="isDefault"
          className="text-[13px] font-medium text-[rgba(245,240,232,0.8)] cursor-pointer"
        >
          Set as default address
        </label>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 px-6 py-3 rounded-full bg-[#D4AF37] text-[#08080E] text-[10px] font-black uppercase tracking-widest hover:shadow-[0_10px_30px_rgba(212,175,55,0.3)] transition-all active:scale-95 disabled:opacity-50"
        >
          {loading ? "Saving..." : isEditing ? "Update Address" : "Add Address"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-6 py-3 rounded-full border border-white/10 text-[rgba(245,240,232,0.6)] text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddressForm;