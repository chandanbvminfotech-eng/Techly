import React from "react";
import { Link } from "react-router-dom";

const OrderCard = ({ order }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "text-yellow-500 bg-yellow-500/10";
      case "confirmed":
        return "text-blue-500 bg-blue-500/10";
      case "shipped":
        return "text-purple-500 bg-purple-500/10";
      case "delivered":
        return "text-green-500 bg-green-500/10";
      case "cancelled":
        return "text-red-500 bg-red-500/10";
      default:
        return "text-gray-500 bg-gray-500/10";
    }
  };

  return (
    <Link
      to={`/orders/${order._id}`}
      className="block bg-[rgba(255,255,255,0.04)] rounded-xl p-5 hover:bg-[rgba(255,255,255,0.06)] transition-all"
    >
      <div className="flex flex-wrap justify-between items-start gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[#D4AF37] text-xs font-mono">
              #{order._id.slice(-8)}
            </span>
            <span
              className={`text-xs px-2 py-1 rounded-full capitalize ${getStatusColor(order.status)}`}
            >
              {order.status}
            </span>
          </div>
          <p className="text-[rgba(245,240,232,0.5)] text-xs">
            {new Date(order.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          <p className="text-white text-sm mt-2">
            {order.items.length} item{order.items.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="text-right">
          <p className="text-white text-xl font-bold">₹{order.totalAmount}</p>
          <p className="text-[rgba(245,240,232,0.4)] text-xs capitalize mt-1">
            {order.paymentMethod === "cod"
              ? "Cash on Delivery"
              : order.paymentMethod}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default OrderCard;
