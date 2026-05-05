import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateOrderStatus } from "../sellerSlice";

const STATUS_OPTIONS = ["confirmed", "shipped", "delivered"];

const getStatusColor = (status) => {
  switch (status) {
    case "confirmed":
      return "text-blue-400 border-blue-400/20 bg-blue-400/5";
    case "shipped":
      return "text-purple-400 border-purple-400/20 bg-purple-400/5";
    case "delivered":
      return "text-[#D4AF37] border-[#D4AF37]/20 bg-[#D4AF37]/5";
    case "cancelled":
      return "text-red-400 border-red-400/10 bg-red-400/5";
    default:
      return "text-gray-400 border-white/10 bg-white/5";
  }
};

const SellerOrderCard = ({ order }) => {
  const dispatch = useDispatch();
  const [updating, setUpdating] = useState(false);

  const orderId = order.orderId?._id;
  const currentStatus = order.orderId?.status;
  const address = order.orderId?.address;

  const statusOrder = ["pending", "confirmed", "shipped", "delivered"];
  const currentIndex = statusOrder.indexOf(currentStatus);
  const availableStatuses = STATUS_OPTIONS.filter(
    (s) => statusOrder.indexOf(s) > currentIndex,
  );

  const handleStatusUpdate = async (status) => {
    setUpdating(true);
    await dispatch(updateOrderStatus({ orderId, status }));
    setUpdating(false);
  };

  return (
    <div className="group relative p-[1px] rounded-[32px] bg-gradient-to-br from-white/10 via-transparent to-transparent transition-all duration-500 hover:from-[#D4AF37]/30">
      <div className="bg-[#0C0C12]/90 backdrop-blur-3xl rounded-[31px] p-6 md:p-10">
        <div className="flex flex-col lg:flex-row justify-between gap-10">
          {/* Main Info Section */}
          <div className="flex-1 space-y-8">
            {/* Header: ID & Status */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full">
                <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.2em]">
                  ID: {orderId?.slice(-8).toUpperCase()}
                </span>
              </div>
              <span
                className={`text-[9px] px-4 py-1.5 rounded-full uppercase tracking-[0.2em] border font-black ${getStatusColor(currentStatus)}`}
              >
                {currentStatus}
              </span>
            </div>

            {/* Product Metadata */}
            <div className="flex gap-6 items-start">
              <div className="relative shrink-0">
                <div className="absolute inset-0 bg-[#D4AF37]/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <img
                  src={order.productImage}
                  alt={order.productName}
                  className="relative w-20 h-20 rounded-2xl object-cover border border-white/10 bg-[#16161D]"
                />
              </div>

              <div className="space-y-1">
                <h4 className="text-[#F5F0E8] font-[Georgia] italic text-lg leading-tight">
                  {order.productName}
                </h4>
                <p className="text-white/30 text-[10px] uppercase tracking-widest font-bold">
                  Quantity: {order.quantity}{" "}
                  <span className="mx-2 text-white/10">|</span> Unit: ₹
                  {order.priceAtPurchase?.toLocaleString()}
                </p>
                <div className="pt-2">
                  <span className="text-[#D4AF37] font-black text-sm tracking-tighter">
                    ₹
                    {(order.quantity * order.priceAtPurchase)?.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Logistics: Shipping Address */}
            {address && (
              <div className="relative p-5 rounded-2xl bg-white/[0.02] border border-white/5 overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-white"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <p className="text-[#D4AF37] text-[9px] uppercase tracking-[0.3em] font-black mb-3">
                  Consignee Details
                </p>
                <p className="text-[#F5F0E8] text-xs font-bold mb-1">
                  {address.name}
                </p>
                <p className="text-white/40 text-xs leading-relaxed max-w-sm">
                  {address.addressLine}, {address.city}, {address.state} —{" "}
                  <span className="text-white/60 font-mono tracking-tighter">
                    {address.pincode}
                  </span>
                </p>
                <p className="text-[#D4AF37] text-[10px] mt-3 font-mono">
                  TEL: {address.phone}
                </p>
              </div>
            )}
          </div>

          {/* Action Sidebar */}
          {currentStatus !== "delivered" &&
            currentStatus !== "cancelled" &&
            availableStatuses.length > 0 && (
              <div className="flex flex-col justify-center gap-3 lg:w-64 border-t lg:border-t-0 lg:border-l border-white/5 pt-8 lg:pt-0 lg:pl-10">
                <p className="text-white/20 text-[9px] uppercase tracking-[0.4em] font-black mb-2 text-center lg:text-left">
                  Workflow Update
                </p>
                {availableStatuses.map((status) => (
                  <button
                    key={status}
                    onClick={() => handleStatusUpdate(status)}
                    disabled={updating}
                    className="group/btn relative overflow-hidden py-4 px-6 rounded-xl border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] uppercase tracking-[0.2em] font-black transition-all hover:bg-[#D4AF37] hover:text-black disabled:opacity-20"
                  >
                    <span className="relative z-10">
                      {updating ? "Processing..." : `Mark as ${status}`}
                    </span>
                    <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500" />
                  </button>
                ))}
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default SellerOrderCard;
