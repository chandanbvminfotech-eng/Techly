import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserProfile } from "../profileSlice.js";
import { getMe } from "../../auth/authSlice.js";
import { Input } from "../../../components/Input.jsx";


const ProfileEditForm = ({ user, onSuccess, onCancel }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [loading, setLoading] = useState(false);

  // Error states
  const [generalError, setGeneralError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    fullName: "",
    email: "",
    avatar: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.name || "",
        email: user.email || "",
      });
      const avatarUrl = user.avatar?.[0]?.url || user.avatar || "";
      setAvatarPreview(avatarUrl);
    }
  }, [user]);

  // Clear all errors when cancelling or unmounting
  const handleCancel = () => {
    setGeneralError("");
    setFieldErrors({ fullName: "", email: "", avatar: "" });
    setLoading(false);
    onCancel();
  };

  // Clear field error when user starts typing
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error for this field
    if (fieldErrors[name]) {
      setFieldErrors({ ...fieldErrors, [name]: "" });
    }
    // Clear general error
    if (generalError) setGeneralError("");
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setFieldErrors({
          ...fieldErrors,
          avatar: "File size should be less than 2MB",
        });
        return;
      }
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setFieldErrors({
          ...fieldErrors,
          avatar: "Only image files are allowed",
        });
        return;
      }

      setAvatarFile(file);
      setFieldErrors({ ...fieldErrors, avatar: "" });
      setGeneralError("");

      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear all previous errors
    setGeneralError("");
    setFieldErrors({ fullName: "", email: "", avatar: "" });

    // Check if at least one field is provided (including avatar)
    if (!formData.fullName && !formData.email && !avatarFile) {
      setGeneralError(
        "At least one field (name, email, or avatar) must be provided",
      );
      return;
    }

    setLoading(true);

    try {
      const submitData = new FormData();
      // Always send name and email (let backend handle duplicates)
      submitData.append("name", formData.fullName);
      submitData.append("email", formData.email);
      // Only append avatar if a new file is selected
      if (avatarFile) {
        submitData.append("avatar", avatarFile);
      }

      await dispatch(updateUserProfile(submitData)).unwrap();
      await dispatch(getMe());
      onSuccess();
    } catch (error) {
      console.error("Update failed:", error);

      // Extract error message from response
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Update failed. Please try again.";

      // Categorize errors to show on specific fields
      if (errorMessage.toLowerCase().includes("email")) {
        setFieldErrors({ ...fieldErrors, email: errorMessage });
      } else if (errorMessage.toLowerCase().includes("name")) {
        setFieldErrors({ ...fieldErrors, fullName: errorMessage });
      } else if (errorMessage.toLowerCase().includes("avatar")) {
        setFieldErrors({ ...fieldErrors, avatar: errorMessage });
      } else {
        setGeneralError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* General Error Display */}
      {generalError && (
        <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30">
          <p className="text-red-500 text-[12px] text-center font-['DM_Sans',system-ui,sans-serif]">
            {generalError}
          </p>
        </div>
      )}

      {/* Avatar Upload Section */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative group">
          <img
            src={avatarPreview || "/default-avatar.png"}
            alt="Avatar preview"
            className={`h-24 w-24 rounded-full object-cover border-2 cursor-pointer hover:opacity-80 transition-opacity ${
              fieldErrors.avatar ? "border-red-500" : "border-[#D4AF37]/30"
            }`}
            onClick={() => document.getElementById("avatarInput").click()}
          />
          <button
            type="button"
            onClick={() => document.getElementById("avatarInput").click()}
            className="absolute bottom-0 right-0 bg-[#D4AF37] rounded-full p-1.5 hover:scale-110 transition-transform"
          >
            📷
          </button>
          <input
            id="avatarInput"
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
        </div>
        <p className="text-[rgba(245,240,232,0.4)] text-[10px] mt-2">
          Click to change avatar (max 2MB)
        </p>
        {fieldErrors.avatar && (
          <p className="text-red-500 text-[11px] mt-1 text-center">
            {fieldErrors.avatar}
          </p>
        )}
      </div>

      {/* Form Fields */}
      <Input
        label="Full Name"
        type="text"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        placeholder="John Doe"
        error={fieldErrors.fullName}
      />

      <Input
        label="Email Address"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="you@example.com"
        error={fieldErrors.email}
      />

      {/* Action Buttons */}
      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 px-6 py-3 rounded-full bg-[#D4AF37] text-[#08080E] text-[10px] font-black uppercase tracking-widest hover:shadow-[0_10px_30px_rgba(212,175,55,0.3)] transition-all active:scale-95 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="flex-1 px-6 py-3 rounded-full border border-white/10 text-[rgba(245,240,232,0.6)] text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProfileEditForm;
