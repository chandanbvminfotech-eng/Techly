import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

const AdminLayout = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navItems = [
    { path: "/admin/dashboard", label: "Dashboard", icon: "📊" },
    { path: "/admin/users", label: "Users", icon: "👥" },
    { path: "/admin/sellers/pending", label: "Seller Approvals", icon: "🏪" },
    { path: "/admin/orders", label: "Orders", icon: "📦" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-[#08080E] flex">
      {/* Drawer Toggle Trigger (Floating) */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={`fixed top-20 z-[60] transition-all duration-500 bg-[#D4AF37] text-[#08080E] w-8 h-8 rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 ${
          isSidebarOpen ? "left-[264px]" : "left-6"
        }`}
      >
        <span
          className={`transition-transform duration-500 ${isSidebarOpen ? "rotate-180" : "rotate-0"}`}
        >
          →
        </span>
      </button>

      {/* Sidebar: Administrative Atelier Style */}
      <aside
        className={`fixed left-0 top-14 h-full bg-[#0C0C12]/80 backdrop-blur-3xl border-r border-white/5 p-8 z-50 flex flex-col transition-all duration-500 ease-in-out overflow-hidden ${
          isSidebarOpen
            ? "w-[280px] opacity-100"
            : "w-0 p-0 opacity-0 border-none"
        }`}
      >
        {/* Branding Area */}
        <div className="mb-14 border-l-2 border-[#D4AF37] pl-6 py-2 min-w-[200px]">
          <h1 className="text-3xl font-[Georgia,serif] text-[#F5F0E8] leading-none">
            Admin<span className="italic text-[#D4AF37]">.</span>
          </h1>
          <p className="text-[#D4AF37] text-[9px] uppercase tracking-[0.4em] font-black mt-2 opacity-50">
            Curation Suite
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-4 min-w-[215px]">
          <p className="text-white/10 text-[9px] uppercase tracking-[0.5em] font-bold mb-6 ml-4">
            Management
          </p>

          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`group relative flex items-center gap-4 px-5 py-4 rounded-2xl text-[11px] uppercase tracking-[0.2em] font-black transition-all duration-500 ${
                isActive(item.path)
                  ? "text-[#D4AF37] bg-[#D4AF37]/5 shadow-[inset_0_0_20px_rgba(212,175,55,0.05)]"
                  : "text-white/30 hover:text-white/80 hover:bg-white/[0.02]"
              }`}
            >
              {isActive(item.path) && (
                <div className="absolute left-0 w-[2px] h-4 bg-[#D4AF37] rounded-full" />
              )}

              <span
                className={`text-lg transition-transform duration-500 ${isActive(item.path) ? "scale-110" : "grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100"}`}
              >
                {item.icon}
              </span>

              <span className="flex-1">{item.label}</span>

              {isActive(item.path) && (
                <div className="w-1 h-1 bg-[#D4AF37] rounded-full animate-pulse" />
              )}
            </Link>
          ))}
        </nav>

        {/* Footer Meta */}
        <div className="pt-8 border-t border-white/5 min-w-[215px]">
          <div className="flex items-center gap-3 px-4 py-3 bg-white/[0.02] rounded-2xl border border-white/5">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-white/20 text-[9px] uppercase tracking-widest font-bold">
              System Online
            </span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main
        className={`flex-1 relative transition-all duration-500 ease-in-out ${
          isSidebarOpen ? "ml-[280px]" : "ml-0"
        }`}
      >
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/5 blur-[120px] pointer-events-none rounded-full" />

        <div className="relative z-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
