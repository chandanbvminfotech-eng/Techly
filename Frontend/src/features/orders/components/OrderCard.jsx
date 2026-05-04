import React from "react";
import { Link } from "react-router-dom";

const OrderCard = ({ order,orderItems }) => {
  // 1. Add a safety check at the top
  if (!order) return null;
  // console.log("Rendering OrderCard for order:", order);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "text-yellow-200/70 border-yellow-200/20 bg-yellow-200/5";
      case "confirmed":
        return "text-blue-200/70 border-blue-200/20 bg-blue-200/5";
      case "delivered":
        return "text-[#D4AF37] border-[#D4AF37]/20 bg-[#D4AF37]/5";
      case "cancelled":
        return "text-red-300/60 border-red-300/10 bg-red-300/5";
      default:
        return "text-gray-400 border-white/10 bg-white/5";
    }
  };

  // Ensure items is at least an empty array if undefined
  const itemCount = orderItems?.filter(
    (item) => item.orderId === order._id
  ).length || 0

  return (
    <Link
      to={`/orders/${order._id}`}
      className="group block p-6 md:p-8 transition-all duration-500"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-4">
            <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.2em]">
              ID: {order._id?.slice(-8) || "N/A"}
            </span>
            <span
              className={`text-[9px] px-3 py-1 rounded-full uppercase tracking-widest border font-bold ${getStatusColor(
                order.status
              )}`}
            >
              {order.status || "Unknown"}
            </span>
          </div>

          <div>
            <h3 className="text-[#F5F0E8] font-[Georgia,serif] italic text-lg leading-none mb-1">
              {itemCount} Product{itemCount !== 1 ? "s" : ""}{" "}
              <span className="text-sm font-light not-italic opacity-40">Acquired</span>
            </h3>
            <p className="text-[rgba(245,240,232,0.4)] text-[11px] uppercase tracking-widest font-medium">
              Placed on {order.createdAt ? new Date(order.createdAt).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }) : "Date Unknown"}
            </p>
          </div>
        </div>

        <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-white/5">
          <div className="text-left md:text-right">
            <p className="text-[rgba(245,240,232,0.4)] text-[10px] uppercase tracking-[0.2em] font-bold mb-1">
              Transaction Total
            </p>
            <p className="text-[#F5F0E8] text-2xl font-[Georgia,serif]">
              ₹{order.totalAmount?.toLocaleString() || "0"}
            </p>
          </div>
          
          <div className="md:mt-4 flex items-center gap-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
            <span className="text-[#D4AF37] text-[10px] uppercase tracking-[0.2em] font-bold">
              View Receipt
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default OrderCard;