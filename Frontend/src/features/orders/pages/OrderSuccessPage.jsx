import React, { useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const OrderSuccessPage = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#08080E] flex flex-col items-center justify-center px-6 selection:bg-[#D4AF37]/30">
      {/* Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-lg">
        {/* Animated checkmark */}
        <div className="w-24 h-24 rounded-full border-2 border-[#D4AF37]/40 flex items-center justify-center mb-8 animate-pulse">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8941E] flex items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.4)]">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path
                d="M6 16L13 23L26 9"
                stroke="#08080E"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Text */}
        <span className="text-[#D4AF37] text-[10px] uppercase tracking-[0.4em] font-bold mb-4">
          Acquisition Confirmed
        </span>
        <h1 className="text-[40px] md:text-[56px] font-[Georgia,serif] text-[#F5F0E8] leading-none mb-4">
          Order <span className="italic">Placed</span>
        </h1>
        <p className="text-[rgba(245,240,232,0.5)] text-sm font-['DM_Sans'] leading-relaxed mb-2">
          Your transaction has been secured and is being processed.
        </p>

        {/* Order ID */}
        <div className="mt-6 px-6 py-3 rounded-full border border-[rgba(212,175,55,0.2)] bg-[rgba(212,175,55,0.05)]">
          <span className="text-[#D4AF37] text-[11px] uppercase tracking-[0.3em] font-bold">
            Order ID: #{orderId?.slice(-8).toUpperCase()}
          </span>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-white/5 my-10" />

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <Link
            to={`/orders/${orderId}`}
            className="flex-1 py-4 rounded-full border border-[rgba(212,175,55,0.4)] text-[#D4AF37] text-[11px] font-black uppercase tracking-[0.2em] text-center hover:bg-[rgba(212,175,55,0.08)] transition-all duration-300"
          >
            View Receipt
          </Link>
          <Link
            to="/products"
            className="group relative flex-1 overflow-hidden bg-gradient-to-br from-[#D4AF37] to-[#B8941E] py-4 rounded-full text-[#08080E] text-[11px] font-black uppercase tracking-[0.2em] text-center hover:shadow-[0_20px_40px_rgba(212,175,55,0.3)] hover:scale-[1.02] transition-all duration-300"
          >
            <span className="relative z-10">Continue Shopping</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
