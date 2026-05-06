import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAdminStats } from "../adminSlice";

const AdminDashboardPage = () => {
  const dispatch = useDispatch();
  const { stats, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAdminStats());
  }, [dispatch]);

  if (loading && !stats) {
    return (
      <div className="min-h-screen bg-[#08080E] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-[1px] bg-[#D4AF37] animate-pulse" />
        <p className="text-[#D4AF37] font-['DM_Sans'] uppercase tracking-[0.5em] text-[9px] font-black italic">
          Fetching Core Metrics...
        </p>
      </div>
    );
  }

  const statCards = [
    {
      title: "Platform Users",
      value: stats?.totalUsers || 0,
      link: "/admin/users",
      trend: "+12%",
    },
    {
      title: "Active Merchants",
      value: stats?.totalSellers || 0,
      link: "/admin/users",
      trend: "+5%",
    },
    {
      title: "Total Acquisitions",
      value: stats?.totalOrders || 0,
      link: "/admin/orders",
      trend: "+18%",
    },
    {
      title: "Gross Valuation",
      value: `₹${(stats?.totalRevenue || 0).toLocaleString()}`,
      link: "/admin/orders",
      trend: "+24%",
    },
  ];

  const sectionTitle =
    "text-[#D4AF37] text-[10px] uppercase tracking-[0.3em] font-black mb-8 flex items-center gap-4 before:h-[1px] before:w-8 before:bg-[#D4AF37]/30";

  return (
    <div className="min-h-screen bg-[#08080E] pt-[120px] pb-24 px-6 md:px-12 selection:bg-[#D4AF37]/30">
      <div className="max-w-[1600px] mx-auto">
        {/* Editorial Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-20 border-l-2 border-[#D4AF37] pl-10 gap-8">
          <div className="space-y-4">
            <span className="text-[#D4AF37] text-[11px] uppercase tracking-[0.5em] font-bold block opacity-50">
              System Intelligence
            </span>
            <h1 className="text-5xl md:text-7xl font-[Georgia,serif] text-[#F5F0E8] leading-tight">
              Platform <span className="italic text-[#D4AF37]">Pulse</span>
            </h1>
          </div>
          <div className="max-w-xs text-right">
            <p className="text-white/20 text-[10px] uppercase tracking-[0.3em] font-bold leading-relaxed">
              Real-time aggregation of ecosystem performance and user
              engagement.
            </p>
          </div>
        </header>

        {error && (
          <div className="mb-12 p-6 rounded-3xl bg-red-500/5 border border-red-500/10 text-center">
            <p className="text-red-400 text-[10px] uppercase tracking-widest font-black tracking-[0.2em]">
              {error}
            </p>
          </div>
        )}

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20 animate-in fade-in slide-in-from-bottom-6 duration-1000">
          {statCards.map((card, idx) => (
            <Link key={idx} to={card.link} className="group relative">
              <div className="absolute -inset-[1px] bg-gradient-to-br from-white/10 to-transparent rounded-[32px] pointer-events-none transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative bg-[#0C0C12]/60 backdrop-blur-3xl rounded-[31px] p-8 border border-white/5 transition-all group-hover:border-[#D4AF37]/30">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-xl grayscale group-hover:grayscale-0 transition-all">
                    {card.icon}
                  </div>
                  <span className="text-[#D4AF37] text-[9px] font-black tracking-tighter bg-[#D4AF37]/5 px-2 py-1 rounded-md border border-[#D4AF37]/10">
                    {card.trend}
                  </span>
                </div>
                <p className="text-white/30 text-[10px] uppercase tracking-[0.3em] font-bold mb-2">
                  {card.title}
                </p>
                <p className="text-4xl font-[Georgia,serif] text-[#F5F0E8] group-hover:text-[#D4AF37] transition-colors">
                  {card.value}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Priority Action: Seller Approvals */}
        {stats?.pendingSellerApprovals > 0 && (
          <div className="relative mb-20 group">
            <div className="absolute -inset-[1px] bg-gradient-to-r from-[#D4AF37]/40 via-transparent to-transparent rounded-[32px] animate-pulse" />
            <div className="relative bg-gradient-to-r from-[#D4AF37]/10 to-transparent backdrop-blur-3xl rounded-[31px] p-8 md:p-12 border border-[#D4AF37]/20 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-8">
                <div className="hidden md:flex w-20 h-20 rounded-full border border-[#D4AF37]/30 items-center justify-center relative">
                  <div className="absolute inset-2 rounded-full border border-[#D4AF37]/10 animate-ping" />
                  <span className="text-3xl">🏪</span>
                </div>
                <div>
                  <h3 className="text-[#D4AF37] text-[10px] uppercase tracking-[0.4em] font-black mb-2">
                    Verification Required
                  </h3>
                  <p className="text-[#F5F0E8] text-2xl font-[Georgia,serif]">
                    {stats.pendingSellerApprovals}{" "}
                    <span className="italic">Merchant Applications</span>{" "}
                    awaiting review.
                  </p>
                </div>
              </div>
              <Link
                to="/admin/sellers/pending"
                className="w-full md:w-auto px-10 py-5 rounded-full bg-[#D4AF37] text-[#08080E] text-[11px] font-black uppercase tracking-[0.3em] hover:shadow-[0_20px_40px_rgba(212,175,55,0.2)] transition-all text-center"
              >
                Review Credentials
              </Link>
            </div>
          </div>
        )}

        {/* Management Ateliers (Quick Links) */}
        <h3 className={sectionTitle}>Registry Management</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              to: "/admin/users",
              icon: "👤",
              title: "User Directory",
              desc: "Manage platform access and user standing.",
            },
            {
              to: "/admin/sellers/pending",
              icon: "⚖️",
              title: "Merchant Ledger",
              desc: "Validate and onboard new retail partners.",
            },
            {
              to: "/admin/orders",
              icon: "📜",
              title: "Order Archives",
              desc: "Comprehensive log of all platform transactions.",
            },
          ].map((item, i) => (
            <Link
              key={i}
              to={item.to}
              className="group p-10 rounded-[32px] bg-white/[0.02] border border-white/5 hover:border-[#D4AF37]/20 transition-all hover:bg-white/[0.04]"
            >
              <div className="text-3xl mb-8 opacity-40 group-hover:opacity-100 transition-opacity">
                {item.icon}
              </div>
              <h4 className="text-[#F5F0E8] text-lg font-bold mb-3">
                {item.title}
              </h4>
              <p className="text-white/20 text-xs leading-relaxed uppercase tracking-widest font-medium group-hover:text-white/40 transition-colors">
                {item.desc}
              </p>
              <div className="mt-8 h-[1px] w-8 bg-[#D4AF37] group-hover:w-full transition-all duration-700" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
