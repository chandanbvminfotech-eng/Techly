import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const OrderSuccessPage = () => {
  const { orderId } = useParams();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative" style={{ background: "var(--bg-base)" }}>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[400px] h-[400px] rounded-full blur-[120px]" style={{ background: "var(--gold-muted)" }} />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-lg">
        {/* Checkmark */}
        <div className="w-24 h-24 rounded-full flex items-center justify-center mb-8 animate-pulse" style={{ border: "2px solid var(--gold-muted)" }}>
          <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg" style={{ background: "linear-gradient(135deg,#D4AF37,#B8941E)" }}>
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
              <path d="M6 16L13 23L26 9" stroke="#08080E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        <span className="text-[10px] uppercase tracking-[0.4em] font-bold mb-3" style={{ color: "var(--gold)" }}>Order Confirmed</span>
        <h1 className="text-[38px] md:text-[54px] font-[Georgia,serif] leading-none mb-4" style={{ color: "var(--text-primary)" }}>
          Order <span className="italic">Placed!</span>
        </h1>
        <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
          Your order has been placed and is being processed.
        </p>

        <div className="mt-4 px-6 py-3 rounded-full" style={{ border: "1px solid var(--gold-muted)", background: "var(--gold-muted)" }}>
          <span className="text-[11px] uppercase tracking-[0.3em] font-bold" style={{ color: "var(--gold)" }}>
            Order #{orderId?.slice(-8).toUpperCase()}
          </span>
        </div>

        <div className="w-full h-px my-9" style={{ background: "var(--border-subtle)" }} />

        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <Link
            to={`/orders/${orderId}`}
            className="flex-1 no-underline py-4 rounded-full text-xs font-black uppercase tracking-[0.15em] text-center transition-all"
            style={{ border: "1px solid var(--border-medium)", color: "var(--text-secondary)", background: "var(--input-bg)" }}
          >
            View Order
          </Link>
          <Link
            to="/products"
            className="flex-1 no-underline py-4 rounded-full text-xs font-black uppercase tracking-[0.15em] text-center transition-all"
            style={{ background: "var(--gold)", color: "#08080E" }}
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
