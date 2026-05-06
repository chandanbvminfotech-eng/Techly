import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, blockUser, unblockUser } from "../adminSlice";

const AdminUsersPage = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.admin);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getAllUsers({ page: currentPage, limit: 10, search: searchTerm }));
  }, [dispatch, currentPage, searchTerm]);

  const handleBlockToggle = async (user) => {
    if (user.isActive) {
      await dispatch(blockUser(user._id));
    } else {
      await dispatch(unblockUser(user._id));
    }
  };

  if (loading && users.length === 0) {
    return (
      <div className="min-h-screen bg-[#08080E] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-[1px] bg-[#D4AF37] animate-pulse" />
        <p className="text-[#D4AF37] font-['DM_Sans'] uppercase tracking-[0.5em] text-[9px] font-black italic">
          Indexing Global Directory...
        </p>
      </div>
    );
  }

  const tableHeaderClass =
    "text-left py-6 px-6 text-[#D4AF37] text-[10px] uppercase tracking-[0.3em] font-black border-b border-white/5";

  return (
    <div className="min-h-screen bg-[#08080E] pt-[120px] pb-24 px-6 md:px-12 selection:bg-[#D4AF37]/30">
      <div className="max-w-[1600px] mx-auto">
        {/* Editorial Header & Search */}
        <header className="flex flex-col xl:flex-row xl:items-end justify-between mb-20 gap-10 border-l-2 border-[#D4AF37] pl-10">
          <div className="space-y-4">
            <span className="text-[#D4AF37] text-[11px] uppercase tracking-[0.5em] font-bold block opacity-50">
              Identity & Access
            </span>
            <h1 className="text-5xl md:text-7xl font-[Georgia,serif] text-[#F5F0E8] leading-[1.1]">
              Member <span className="italic text-[#D4AF37]">Registry</span>
            </h1>
          </div>

          <div className="relative group max-w-md w-full">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-white/20 group-focus-within:text-[#D4AF37] transition-colors">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by identity or credentials..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-white/[0.02] border border-white/5 rounded-2xl py-5 pl-14 pr-8 text-[#F5F0E8] text-sm focus:outline-none focus:border-[#D4AF37]/30 focus:bg-white/[0.05] transition-all placeholder:text-white/10 uppercase tracking-widest text-[10px] font-bold"
            />
          </div>
        </header>

        {error && (
          <div className="mb-12 p-6 rounded-3xl bg-red-500/5 border border-red-500/10 flex items-center justify-center gap-4">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <p className="text-red-400 text-[10px] uppercase tracking-[0.2em] font-black">
              {error}
            </p>
          </div>
        )}

        {/* Desktop Table Interface */}
        <div className="relative group overflow-hidden">
          {/* Decorative Glow */}
          <div className="absolute -inset-[1px] bg-gradient-to-b from-white/10 to-transparent rounded-[40px] pointer-events-none opacity-50" />

          <div className="relative bg-[#0C0C12]/40 backdrop-blur-3xl rounded-[40px] border border-white/5 overflow-hidden">
            <div className="overflow-x-auto overflow-y-hidden">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-white/[0.01]">
                    <th className={tableHeaderClass}>Identification</th>
                    <th className={tableHeaderClass}>Role</th>
                    <th className={tableHeaderClass}>Standing</th>
                    <th className={tableHeaderClass}>Enrollment Date</th>
                    <th className={`${tableHeaderClass} text-right`}>
                      Operations
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.03]">
                  {users?.length > 0 ? (
                    users.map((user) => (
                      <tr
                        key={user._id}
                        className="group/row hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="py-8 px-8">
                          <div className="flex items-center gap-5">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/5 flex items-center justify-center text-[#D4AF37] font-[Georgia] text-lg italic group-hover/row:scale-110 transition-transform">
                              {user.name?.charAt(0) || "U"}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[#F5F0E8] text-sm font-bold tracking-wide mb-1">
                                {user.name}
                              </span>
                              <span className="text-white/20 text-[10px] uppercase tracking-widest font-mono">
                                {user.email}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="py-8 px-6">
                          <span
                            className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-[0.2em] border transition-colors ${
                              user.role === "admin"
                                ? "bg-red-500/5 text-red-400 border-red-500/10"
                                : user.role === "seller"
                                  ? "bg-blue-500/5 text-blue-400 border-blue-500/10"
                                  : "bg-emerald-500/5 text-emerald-400 border-emerald-500/10"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="py-8 px-6">
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-1.5 h-1.5 rounded-full ${user.isActive ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]" : "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.4)]"}`}
                            />
                            <span className="text-white/40 text-[10px] uppercase tracking-[0.1em] font-bold">
                              {user.isActive ? "Active" : "Revoked"}
                            </span>
                          </div>
                        </td>
                        <td className="py-8 px-6 text-white/20 text-[10px] uppercase tracking-widest font-mono">
                          {new Date(user.createdAt).toLocaleDateString(
                            "en-GB",
                            { day: "2-digit", month: "short", year: "numeric" },
                          )}
                        </td>
                        <td className="py-8 px-8 text-right">
                          {user.role !== "admin" ? (
                            <button
                              onClick={() => handleBlockToggle(user)}
                              className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all border ${
                                user.isActive
                                  ? "text-red-400 border-red-500/20 hover:bg-red-500/10"
                                  : "text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/10"
                              }`}
                            >
                              {user.isActive
                                ? "Revoke Access"
                                : "Restore Access"}
                            </button>
                          ) : (
                            <span className="text-white/10 text-[9px] uppercase tracking-[0.4em] font-black italic">
                              Immune
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="py-32 text-center">
                        <p className="text-white/10 text-[11px] uppercase tracking-[0.5em] font-black italic">
                          No records found in current sector
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Subtle Pagination Placeholder */}
        <footer className="mt-12 flex justify-between items-center text-white/20 px-8">
          <p className="text-[9px] uppercase tracking-[0.3em] font-bold italic">
            Page {currentPage} of System Memory
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="w-10 h-10 border border-white/5 rounded-full flex items-center justify-center hover:border-[#D4AF37]/40 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              className="w-10 h-10 border border-white/5 rounded-full flex items-center justify-center hover:border-[#D4AF37]/40 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AdminUsersPage;
