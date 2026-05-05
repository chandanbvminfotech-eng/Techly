// src/features/seller/components/StatusUpdateDropdown.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateOrderStatus } from "../sellerSlice";

const StatusUpdateDropdown = ({ orderId, currentStatus, onStatusChange }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(currentStatus);

  const statusFlow = {
    pending: {
      next: "confirmed",
      label: "Pending",
      color: "text-yellow-400",
      bg: "bg-yellow-400/10",
      border: "border-yellow-400/20",
    },
    confirmed: {
      next: "processing",
      label: "Confirmed",
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      border: "border-blue-400/20",
    },
    processing: {
      next: "shipped",
      label: "Processing",
      color: "text-purple-400",
      bg: "bg-purple-400/10",
      border: "border-purple-400/20",
    },
    shipped: {
      next: "delivered",
      label: "Shipped",
      color: "text-orange-400",
      bg: "bg-orange-400/10",
      border: "border-orange-400/20",
    },
    delivered: {
      next: null,
      label: "Delivered",
      color: "text-green-400",
      bg: "bg-green-400/10",
      border: "border-green-400/20",
    },
    cancelled: {
      next: null,
      label: "Cancelled",
      color: "text-red-400",
      bg: "bg-red-400/10",
      border: "border-red-400/20",
    },
  };

  const availableStatuses = Object.keys(statusFlow).filter(
    (s) =>
      s === status ||
      statusFlow[status]?.next === s ||
      (status === "pending" && s === "cancelled"),
  );

  const handleStatusChange = async (newStatus) => {
    if (newStatus === status) {
      setIsOpen(false);
      return;
    }

    setLoading(true);
    try {
      const result = await dispatch(
        updateOrderStatus({ orderId, status: newStatus }),
      );
      if (updateOrderStatus.fulfilled.match(result)) {
        setStatus(newStatus);
        if (onStatusChange) onStatusChange(orderId, newStatus);
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setLoading(false);
      setIsOpen(false);
    }
  };

  const current = statusFlow[status] || statusFlow.pending;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={loading}
        className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-2 ${current.bg} ${current.color} border ${current.border} hover:opacity-80 disabled:opacity-50`}
      >
        {loading ? (
          <>
            <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
            Updating...
          </>
        ) : (
          <>
            {current.label}
            {current.next && (
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            )}
          </>
        )}
      </button>

      {isOpen && availableStatuses.length > 1 && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-[#0C0C12] border border-white/10 rounded-xl shadow-2xl z-20 overflow-hidden">
            {availableStatuses.map((s) => {
              const statusInfo = statusFlow[s];
              return (
                <button
                  key={s}
                  onClick={() => handleStatusChange(s)}
                  className={`w-full px-4 py-3 text-left text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:bg-white/5 ${statusInfo.color} ${s === status ? "bg-white/5 cursor-default" : ""}`}
                  disabled={s === status}
                >
                  {statusInfo.label}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default StatusUpdateDropdown;
