import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../adminSlice";

const AdminOrdersPage = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.admin);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
      case "confirmed":
        return "text-blue-400 bg-blue-400/10 border-blue-400/20";
      case "shipped":
        return "text-indigo-400 bg-indigo-400/10 border-indigo-400/20";
      case "delivered":
        return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
      case "cancelled":
        return "text-rose-500 bg-rose-500/10 border-rose-500/20";
      default:
        return "text-white/40 bg-white/5 border-white/10";
    }
  };

  if (loading && orders.length === 0) {
    return (
      <div className="min-h-screen bg-[#08080E] flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-[1px] bg-[#D4AF37] animate-pulse" />
        <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.4em] font-black italic">
          Fetching Ledger...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#08080E] pt-[120px] pb-24 px-6 md:px-12 selection:bg-[#D4AF37]/30">
      <div className="max-w-[1400px] mx-auto">
        {/* Editorial Header */}
        <header className="flex flex-col mb-16 border-l-2 border-[#D4AF37] pl-10">
          <span className="text-[#D4AF37] text-[11px] uppercase tracking-[0.5em] font-bold block opacity-60 mb-4">
            Operations Console
          </span>
          <h1 className="text-5xl md:text-7xl font-[Georgia,serif] text-[#F5F0E8] leading-tight">
            Order <span className="italic">Manifest</span>
          </h1>
          <div className="flex items-center gap-6 mt-8">
            <div className="px-5 py-1.5 rounded-full bg-white/[0.03] border border-white/5 backdrop-blur-md">
              <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-black">
                Registry:{" "}
                <span className="text-white/80">
                  {orders?.length || 0} Transactions
                </span>
              </p>
            </div>
          </div>
        </header>

        {error && (
          <div className="mb-10 p-6 rounded-3xl bg-rose-500/5 border border-rose-500/10 flex items-center justify-center gap-3">
            <div className="w-1 h-1 rounded-full bg-rose-500 animate-ping" />
            <p className="text-rose-400 text-[10px] uppercase tracking-[0.2em] font-black">
              {error}
            </p>
          </div>
        )}

        {orders?.length === 0 && !loading ? (
          <div className="bg-[#0C0C12] rounded-[40px] border border-white/5 p-24 text-center">
            <p className="text-white/20 text-[10px] uppercase tracking-[0.4em] font-black italic">
              The ledger is currently blank
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className={`group overflow-hidden rounded-[32px] border transition-all duration-500 ${
                  expandedOrder === order._id
                    ? "bg-[#0E0E16] border-[#D4AF37]/30 ring-1 ring-[#D4AF37]/10"
                    : "bg-[#0C0C12] border-white/5 hover:border-white/10"
                }`}
              >
                {/* Master Row */}
                <div
                  className="p-8 cursor-pointer relative"
                  onClick={() =>
                    setExpandedOrder(
                      expandedOrder === order._id ? null : order._id,
                    )
                  }
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                    {/* Identifier & Customer */}
                    <div className="flex items-center gap-6">
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-colors ${
                          expandedOrder === order._id
                            ? "bg-[#D4AF37]/10 border-[#D4AF37]/20"
                            : "bg-white/5 border-white/5"
                        }`}
                      >
                        <span className="text-xl">
                          {expandedOrder === order._id ? "📖" : "📦"}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[#D4AF37] text-[10px] font-mono tracking-tighter uppercase opacity-60">
                          ID: {order._id?.toUpperCase()}
                        </p>
                        <h3 className="text-[#F5F0E8] text-lg font-bold tracking-tight">
                          {order.userId?.name || "Anonymous Requester"}
                        </h3>
                      </div>
                    </div>

                    {/* Logistics Data */}
                    <div className="flex flex-wrap items-center gap-8 lg:gap-12">
                      <div className="space-y-1">
                        <p className="text-white/20 text-[9px] uppercase tracking-widest font-black">
                          Fiscal Total
                        </p>
                        <p className="text-[#F5F0E8] text-xl font-bold tracking-tighter">
                          ₹{order.totalAmount?.toLocaleString()}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <p className="text-white/20 text-[9px] uppercase tracking-widest font-black">
                          Current Phase
                        </p>
                        <span
                          className={`px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${getStatusColor(order.status)}`}
                        >
                          {order.status}
                        </span>
                      </div>

                      <div className="hidden sm:block space-y-1 text-right">
                        <p className="text-white/20 text-[9px] uppercase tracking-widest font-black">
                          Logged Date
                        </p>
                        <p className="text-white/60 text-xs font-medium">
                          {new Date(order.createdAt).toLocaleDateString(
                            "en-GB",
                            { day: "2-digit", month: "short", year: "numeric" },
                          )}
                        </p>
                      </div>

                      <div
                        className={`transition-transform duration-500 text-[#D4AF37]/40 ${expandedOrder === order._id ? "rotate-180" : ""}`}
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Granular Detail Panel */}
                {expandedOrder === order._id && (
                  <div className="px-8 pb-10 pt-4 animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="grid lg:grid-cols-3 gap-10 p-8 rounded-[24px] bg-black/40 border border-white/5">
                      {/* Customer & Shipping */}
                      <div className="space-y-6">
                        <section>
                          <h4 className="text-[#D4AF37] text-[10px] uppercase tracking-[0.3em] font-black mb-4 flex items-center gap-2">
                            <span className="w-4 h-[1px] bg-[#D4AF37]/40" />{" "}
                            Profile
                          </h4>
                          <p className="text-white/80 text-sm font-medium">
                            {order.userId?.name}
                          </p>
                          <p className="text-white/40 text-xs mt-1 italic">
                            {order.userId?.email}
                          </p>
                          <p className="text-[#D4AF37] text-[10px] uppercase font-bold mt-3 tracking-widest">
                            {order.paymentMethod} Payment
                          </p>
                        </section>

                        {order.addressId && (
                          <section>
                            <h4 className="text-[#D4AF37] text-[10px] uppercase tracking-[0.3em] font-black mb-4 flex items-center gap-2">
                              <span className="w-4 h-[1px] bg-[#D4AF37]/40" />{" "}
                              Destination
                            </h4>
                            <p className="text-white/60 text-xs leading-relaxed">
                              {order.addressId.addressLine}
                              <br />
                              {order.addressId.city}, {order.addressId.state} —{" "}
                              {order.addressId.pincode}
                            </p>
                            <p className="text-white/40 text-[10px] mt-2 font-mono">
                              Contact: {order.addressId.phone}
                            </p>
                          </section>
                        )}
                      </div>

                      {/* Line Items */}
                      <div className="lg:col-span-2">
                        <h4 className="text-[#D4AF37] text-[10px] uppercase tracking-[0.3em] font-black mb-4 flex items-center gap-2">
                          <span className="w-4 h-[1px] bg-[#D4AF37]/40" />{" "}
                          Manifest Items
                        </h4>
                        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                          {order.items?.map((item, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-6 p-4 rounded-2xl bg-white/[0.02] border border-white/5 group/item hover:bg-white/[0.04] transition-colors"
                            >
                              <div className="relative overflow-hidden w-16 h-16 rounded-xl border border-white/10">
                                <img
                                  src={
                                    item.product?.image || "/placeholder.png"
                                  }
                                  alt=""
                                  className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-110"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-white/90 text-sm font-bold truncate">
                                  {item.product?.name}
                                </p>
                                <p className="text-white/30 text-[10px] uppercase tracking-widest mt-1">
                                  {item.product?.brand}
                                </p>
                              </div>
                              <div className="text-right whitespace-nowrap">
                                <p className="text-[#D4AF37] text-xs font-bold">
                                  ₹{item.totalPrice?.toLocaleString()}
                                </p>
                                <p className="text-white/20 text-[9px] mt-1 font-black uppercase tracking-tighter">
                                  Qty: {item.quantity}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrdersPage;
