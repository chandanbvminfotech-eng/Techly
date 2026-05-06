import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchOrders } from "../orderSlice";
import OrderCard from "../components/OrderCard";

const OrdersPage = () => {
  const dispatch = useDispatch();
  const { orders, orderItems, isLoading } = useSelector((state) => state.order);

  useEffect(() => { dispatch(fetchOrders()); }, [dispatch]);

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg-base)" }}>
        <p className="text-xs uppercase tracking-widest font-black animate-pulse" style={{ color: "var(--gold)" }}>Loading Orders...</p>
      </div>
    );

  if (!orders || orders.length === 0)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20" style={{ background: "var(--bg-base)" }}>
        <div className="text-6xl mb-5">📦</div>
        <p className="font-[Georgia,serif] italic text-xl mb-6" style={{ color: "var(--text-muted)" }}>No orders yet.</p>
        <Link to="/products" className="no-underline px-9 py-3.5 rounded-full font-black text-xs uppercase tracking-[0.2em]" style={{ background: "var(--gold)", color: "#08080E" }}>
          Start Shopping
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen pt-[88px] md:pt-[112px] pb-24 px-4 md:px-6" style={{ background: "var(--bg-base)" }}>
      <div className="max-w-[860px] mx-auto">
        <div className="flex flex-col mb-10 pl-5" style={{ borderLeft: "2px solid var(--gold)" }}>
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold mb-1" style={{ color: "var(--gold)" }}>History</span>
          <h2 className="text-[28px] md:text-[48px] font-[Georgia,serif] leading-tight" style={{ color: "var(--text-primary)" }}>
            Your <span className="italic">Orders</span>
          </h2>
        </div>

        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="rounded-2xl overflow-hidden transition-all duration-300" style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "var(--gold)"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border-subtle)"}
            >
              <OrderCard order={order} orderItems={orderItems} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
