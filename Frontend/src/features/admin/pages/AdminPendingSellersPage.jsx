import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPendingSellers, approveSeller, rejectSeller } from "../adminSlice";

const AdminPendingSellersPage = () => {
  const dispatch = useDispatch();
  const { pendingSellers, loading, error } = useSelector(
    (state) => state.admin,
  );
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    dispatch(getPendingSellers());
  }, [dispatch]);

  const handleApprove = async (sellerId) => {
    setActionLoading(sellerId);
    await dispatch(approveSeller(sellerId));
    setActionLoading(null);
  };

  const handleReject = async (sellerId) => {
    setActionLoading(sellerId);
    await dispatch(rejectSeller(sellerId));
    setActionLoading(null);
  };

  if (loading && pendingSellers.length === 0) {
    return (
      <div className="min-h-screen bg-[#08080E] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-[1px] bg-[#D4AF37] animate-pulse" />
        <p className="text-[#D4AF37] font-['DM_Sans'] uppercase tracking-[0.5em] text-[9px] font-black italic">
          Verifying Merchant Credentials...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#08080E] pt-[120px] pb-24 px-6 md:px-12 selection:bg-[#D4AF37]/30">
      <div className="max-w-[1200px] mx-auto">
        {/* Header Section */}
        <header className="flex flex-col mb-20 border-l-2 border-[#D4AF37] pl-10">
          <span className="text-[#D4AF37] text-[11px] uppercase tracking-[0.5em] font-bold block opacity-50 mb-4">
            Validation Queue
          </span>
          <h1 className="text-5xl md:text-7xl font-[Georgia,serif] text-[#F5F0E8] leading-tight">
            Pending <span className="italic text-[#D4AF37]">Credentials</span>
          </h1>
          <div className="flex items-center gap-4 mt-8">
            <div className="px-4 py-1 rounded-full bg-white/[0.03] border border-white/5">
              <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-black">
                {pendingSellers?.length || 0}{" "}
                <span className="text-white/60">
                  Applications Awaiting Review
                </span>
              </p>
            </div>
          </div>
        </header>

        {error && (
          <div className="mb-12 p-6 rounded-[24px] bg-red-500/5 border border-red-500/10 flex items-center justify-center gap-4">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <p className="text-red-400 text-[10px] uppercase tracking-[0.2em] font-black">
              {error}
            </p>
          </div>
        )}

        {pendingSellers?.length === 0 && !loading ? (
          <div className="relative group overflow-hidden">
            <div className="absolute -inset-[1px] bg-gradient-to-b from-white/10 to-transparent rounded-[40px] pointer-events-none opacity-50" />
            <div className="relative bg-[#0C0C12]/40 backdrop-blur-3xl rounded-[40px] border border-white/5 p-24 text-center">
              <div className="text-4xl mb-6 opacity-20">⚖️</div>
              <p className="text-[#F5F0E8] text-xl font-[Georgia,serif] italic mb-2">
                The queue is empty
              </p>
              <p className="text-white/20 text-[10px] uppercase tracking-[0.3em] font-black">
                All merchant identities have been processed.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {pendingSellers.map((seller) => (
              <div
                key={seller._id}
                className="group relative overflow-hidden rounded-[32px] bg-[#0C0C12]/60 backdrop-blur-3xl border border-white/5 p-8 md:p-10 transition-all hover:bg-white/[0.02] hover:border-[#D4AF37]/20"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                  {/* Merchant Info */}
                  <div className="flex items-start gap-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D4AF37]/20 to-transparent border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] text-2xl font-[Georgia,serif] italic">
                      {seller.name?.charAt(0) || "S"}
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-[#F5F0E8] text-2xl font-bold tracking-tight">
                        {seller.name}
                      </h3>
                      <div className="flex flex-col gap-1">
                        <span className="text-[#D4AF37] text-[10px] uppercase tracking-widest font-black opacity-60 italic">
                          {seller.email}
                        </span>
                        <div className="flex items-center gap-4 text-white/20 text-[9px] uppercase tracking-widest font-mono mt-2">
                          <span>
                            REG ID: {seller._id?.slice(-12).toUpperCase()}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-white/10" />
                          <span>
                            Submitted:{" "}
                            {new Date(seller.createdAt).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              },
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Decision Actions */}
                  <div className="flex items-center gap-4 border-t lg:border-t-0 pt-8 lg:pt-0 border-white/5">
                    <button
                      onClick={() => handleReject(seller._id)}
                      disabled={actionLoading === seller._id}
                      className="flex-1 lg:flex-none px-8 py-4 rounded-2xl text-white/30 text-[10px] font-black uppercase tracking-[0.2em] border border-white/5 hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/5 transition-all disabled:opacity-50"
                    >
                      {actionLoading === seller._id ? "..." : "Deny Access"}
                    </button>
                    <button
                      onClick={() => handleApprove(seller._id)}
                      disabled={actionLoading === seller._id}
                      className="flex-1 lg:flex-none px-10 py-4 rounded-2xl bg-[#D4AF37] text-[#08080E] text-[10px] font-black uppercase tracking-[0.2em] hover:shadow-[0_15px_30px_rgba(212,175,55,0.2)] hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                    >
                      {actionLoading === seller._id
                        ? "Processing"
                        : "Grant Status"}
                    </button>
                  </div>
                </div>

                {/* Decorative Side Bar */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-12 bg-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPendingSellersPage;
