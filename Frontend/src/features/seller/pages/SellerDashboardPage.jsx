import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getSellerStats } from "../sellerSlice";

const StatCard = ({ label, value, suffix }) => (
  <div className="relative group p-[1px] rounded-[32px] bg-gradient-to-b from-white/10 to-transparent overflow-hidden">
    {/* Subtle Background Glow */}
    <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-[#D4AF37]/5 blur-3xl rounded-full group-hover:bg-[#D4AF37]/10 transition-all duration-700" />
    
    <div className="bg-[#0C0C12]/90 backdrop-blur-3xl rounded-[31px] p-8 md:p-10 relative z-10">
      <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.4em] font-black mb-6 opacity-70">{label}</p>
      <div className="flex items-baseline gap-1">
        {suffix === "₹" && <span className="text-[#D4AF37] font-[Georgia] text-2xl italic mr-1">₹</span>}
        <p className="text-[48px] md:text-[56px] font-[Georgia,serif] text-[#F5F0E8] leading-none tracking-tighter">
          {value?.toLocaleString()}
        </p>
      </div>
    </div>
  </div>
);

const SellerDashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { stats, loading } = useSelector((state) => state.seller);
  const statsData = stats?.data;

  useEffect(() => {
    dispatch(getSellerStats());
  }, [dispatch]);

  if (loading) return (
    <div className="min-h-screen bg-[#08080E] flex flex-col items-center justify-center gap-4">
      <div className="w-12 h-[1px] bg-[#D4AF37] animate-pulse" />
      <p className="text-[#D4AF37] font-['DM_Sans'] uppercase tracking-[0.5em] text-[9px] font-black italic">
        Synchronizing Assets...
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#08080E] pt-[120px] md:pt-[160px] pb-24 px-4 md:px-10 selection:bg-[#D4AF37]/30">
      <div className="max-w-[1100px] mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-l-2 border-[#D4AF37] pl-8">
          <div>
            <span className="text-[#D4AF37] text-[11px] uppercase tracking-[0.4em] font-bold mb-3 block opacity-60">
              Merchant Overview
            </span>
            <h2 className="text-[40px] md:text-[60px] font-[Georgia,serif] text-[#F5F0E8] leading-tight">
              Enterprise <span className="italic text-[#D4AF37]">Metrics</span>
            </h2>
          </div>
          <div className="hidden md:block">
            <p className="text-white/20 text-[9px] uppercase tracking-[0.5em] font-bold border-b border-white/5 pb-2">
              Real-time Ledger v3.0
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <StatCard label="Total Inventory" value={statsData?.totalProducts || 0} />
          <StatCard label="Completed Sales" value={statsData?.totalOrders || 0} />
          <StatCard label="Gross Revenue" value={statsData?.totalRevenue || 0} suffix="₹" />
        </div>

        {/* Quick Actions Title */}
        <div className="mb-8 flex items-center gap-4">
          <p className="text-white/20 text-[9px] uppercase tracking-[0.5em] font-bold shrink-0">Navigational Links</p>
          <div className="h-[1px] w-full bg-white/5" />
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <button
            onClick={() => navigate("/seller/products")}
            className="group relative p-[1px] rounded-[32px] bg-gradient-to-br from-white/10 to-transparent transition-all duration-500 hover:from-[#D4AF37]/40"
          >
            <div className="bg-[#0C0C12]/90 backdrop-blur-3xl rounded-[31px] p-10 overflow-hidden relative">
              {/* Background Decorative "P" */}
              <span className="absolute -right-4 -bottom-10 text-[120px] font-[Georgia] italic text-white/[0.02] pointer-events-none group-hover:text-[#D4AF37]/5 transition-all duration-700">P</span>
              
              <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.3em] font-black mb-4 flex items-center gap-2">
                Inventory Control <span className="w-4 h-[1px] bg-[#D4AF37]/30" />
              </p>
              <p className="text-[#F5F0E8] font-[Georgia,serif] italic text-3xl group-hover:translate-x-3 transition-transform duration-500">
                Manage Products <span className="text-[#D4AF37] ml-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </p>
            </div>
          </button>

          <button
            onClick={() => navigate("/seller/orders")}
            className="group relative p-[1px] rounded-[32px] bg-gradient-to-br from-white/10 to-transparent transition-all duration-500 hover:from-[#D4AF37]/40"
          >
            <div className="bg-[#0C0C12]/90 backdrop-blur-3xl rounded-[31px] p-10 overflow-hidden relative">
              {/* Background Decorative "O" */}
              <span className="absolute -right-4 -bottom-10 text-[120px] font-[Georgia] italic text-white/[0.02] pointer-events-none group-hover:text-[#D4AF37]/5 transition-all duration-700">O</span>

              <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.3em] font-black mb-4 flex items-center gap-2">
                Order Fulfillment <span className="w-4 h-[1px] bg-[#D4AF37]/30" />
              </p>
              <p className="text-[#F5F0E8] font-[Georgia,serif] italic text-3xl group-hover:translate-x-3 transition-transform duration-500">
                Sales Pipeline <span className="text-[#D4AF37] ml-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboardPage;