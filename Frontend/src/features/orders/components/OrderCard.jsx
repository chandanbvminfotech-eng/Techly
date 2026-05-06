import React from "react";
import { Link } from "react-router-dom";

const statusStyles = {
  pending:   { color: "#fbbf24", bg: "rgba(251,191,36,0.08)",   border: "rgba(251,191,36,0.2)" },
  confirmed: { color: "#60a5fa", bg: "rgba(96,165,250,0.08)",   border: "rgba(96,165,250,0.2)" },
  delivered: { color: "#34d399", bg: "rgba(52,211,153,0.08)",   border: "rgba(52,211,153,0.2)" },
  cancelled: { color: "#f87171", bg: "rgba(248,113,113,0.08)",  border: "rgba(248,113,113,0.2)" },
};

const OrderCard = ({ order, orderItems }) => {
  if (!order) return null;
  const st = statusStyles[order.status] || { color: "var(--text-muted)", bg: "var(--input-bg)", border: "var(--border-subtle)" };
  const itemCount = orderItems?.filter((i) => i.orderId === order._id).length || 0;

  return (
    <Link to={`/orders/${order._id}`} className="group block p-5 md:p-7 no-underline">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-[11px] font-black uppercase tracking-[0.15em]" style={{ color: "var(--gold)" }}>
              #{order._id?.slice(-8) || "N/A"}
            </span>
            <span
              className="text-[10px] px-3 py-1 rounded-full uppercase tracking-widest font-bold"
              style={{ color: st.color, background: st.bg, border: `1px solid ${st.border}` }}
            >
              {order.status || "Unknown"}
            </span>
          </div>

          <h3 className="font-[Georgia,serif] italic text-base" style={{ color: "var(--text-primary)" }}>
            {itemCount} item{itemCount !== 1 ? "s" : ""}
            <span className="text-sm font-normal not-italic ml-2" style={{ color: "var(--text-muted)" }}>ordered</span>
          </h3>

          <p className="text-[11px] uppercase tracking-widest font-medium" style={{ color: "var(--text-muted)" }}>
            {order.createdAt
              ? new Date(order.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
              : "Date unknown"}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xl font-bold font-[Georgia,serif]" style={{ color: "var(--text-primary)" }}>
            ₹{order.totalAmount?.toLocaleString("en-IN")}
          </span>
          <span className="text-lg transition-transform duration-200 group-hover:translate-x-1" style={{ color: "var(--gold)" }}>→</span>
        </div>
      </div>
    </Link>
  );
};

export default OrderCard;
