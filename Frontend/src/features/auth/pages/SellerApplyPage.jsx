import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { applyForSeller } from "../../auth/authSlice";

const SellerApplyPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    storeName: "",
    storeDescription: "",
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(applyForSeller(formData));
    if (applyForSeller.fulfilled.match(result)) {
      setSuccess(true);
    }
  };

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[#F5F0E8] text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-all placeholder:text-white/20";
  const labelClass =
    "text-[#D4AF37] text-[9px] uppercase tracking-[0.3em] font-black mb-2 block";

  if (user?.role === "seller" && !user?.isVerified) {
    return (
      <div className="min-h-screen bg-[#08080E] flex flex-col items-center justify-center px-6">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[120px]" />
        </div>
        <div className="relative z-10 text-center max-w-md">
          <div className="w-16 h-16 rounded-full border border-[#D4AF37]/30 flex items-center justify-center mx-auto mb-8">
            <span className="text-2xl">⏳</span>
          </div>
          <span className="text-[#D4AF37] text-[10px] uppercase tracking-[0.4em] font-bold mb-4 block">
            Application Submitted
          </span>
          <h2 className="text-[32px] font-[Georgia,serif] text-[#F5F0E8] mb-4">
            Pending <span className="italic">Approval</span>
          </h2>
          <p className="text-[rgba(245,240,232,0.5)] text-sm leading-relaxed">
            Your application is under review. You'll be able to list products
            once approved by our team.
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-8 px-8 py-3 rounded-full border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] uppercase tracking-widest font-black hover:bg-[#D4AF37]/10 transition-all"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[#08080E] flex flex-col items-center justify-center px-6">
        <div className="relative z-10 text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8941E] flex items-center justify-center mx-auto mb-8">
            <span className="text-2xl">✓</span>
          </div>
          <span className="text-[#D4AF37] text-[10px] uppercase tracking-[0.4em] font-bold mb-4 block">
            Application Received
          </span>
          <h2 className="text-[32px] font-[Georgia,serif] text-[#F5F0E8] mb-4">
            Under <span className="italic">Review</span>
          </h2>
          <p className="text-[rgba(245,240,232,0.5)] text-sm leading-relaxed">
            Our team will review your application shortly.
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-8 px-8 py-3 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8941E] text-[#08080E] text-[10px] uppercase tracking-widest font-black hover:shadow-[0_20px_40px_rgba(212,175,55,0.3)] transition-all"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#08080E] pt-[100px] md:pt-[140px] pb-24 px-4 md:px-10 selection:bg-[#D4AF37]/30">
      <div className="max-w-[600px] mx-auto">
        <div className="flex flex-col mb-12 border-l-2 border-[#D4AF37] pl-6">
          <span className="text-[#D4AF37] text-[10px] uppercase tracking-[0.3em] font-bold mb-2">
            Merchant Program
          </span>
          <h2 className="text-[32px] md:text-[52px] font-[Georgia,serif] text-[#F5F0E8] leading-none">
            Become a <span className="italic">Seller</span>
          </h2>
          <p className="text-[rgba(245,240,232,0.4)] text-sm mt-4 leading-relaxed">
            Join our curated marketplace and list your products to thousands of
            buyers.
          </p>
        </div>

        {error && (
          <div className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/30">
            <p className="text-red-400 text-sm text-center">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="relative p-[1px] rounded-[24px] bg-gradient-to-b from-white/10 to-transparent">
            <div className="bg-[#0C0C12]/90 backdrop-blur-3xl rounded-[23px] p-8 space-y-6">
              <div>
                <label className={labelClass}>Store Name</label>
                <input
                  name="storeName"
                  value={formData.storeName}
                  onChange={handleChange}
                  placeholder="e.g. TechVault Store"
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Store Description</label>
                <textarea
                  name="storeDescription"
                  value={formData.storeDescription}
                  onChange={handleChange}
                  placeholder="Tell buyers about your store..."
                  rows={4}
                  className={`${inputClass} resize-none`}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group relative w-full overflow-hidden bg-gradient-to-br from-[#D4AF37] to-[#B8941E] px-6 py-4 rounded-full text-[#08080E] text-sm font-black uppercase tracking-[0.2em] hover:shadow-[0_20px_40px_rgba(212,175,55,0.3)] hover:scale-[1.01] transition-all duration-300 disabled:opacity-40"
              >
                <span className="relative z-10">
                  {loading ? "Submitting..." : "Submit Application"}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellerApplyPage;
