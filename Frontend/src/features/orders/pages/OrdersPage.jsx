import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchOrders } from "../orderSlice";
import OrderCard from "../components/OrderCard";

const OrdersPage = () => {
  const dispatch = useDispatch();
  const { orders, orderItems, isLoading } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#08080E] flex items-center justify-center">
        <p className="text-[#D4AF37] font-['DM_Sans'] uppercase tracking-widest text-sm animate-pulse">
          Accessing Order History...
        </p>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="min-h-screen bg-[#08080E] pt-[100px] md:pt-[140px] px-6 flex flex-col items-center justify-center text-center">
        <div className="max-w-md">
          <p className="text-[rgba(245,240,232,0.3)] font-[Georgia,serif] italic text-xl mb-8">
            Your acquisition history is currently empty.
          </p>
          <Link
            to="/products"
            className="group relative inline-block overflow-hidden bg-[#D4AF37] px-10 py-4 rounded-full transition-all duration-500 hover:scale-[1.05] hover:shadow-[0_20px_40px_rgba(212,175,55,0.2)]"
          >
            <span className="relative z-10 text-[#08080E] text-xs font-black uppercase tracking-[0.2em]">
              Explore Collection
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#08080E] pt-[100px] md:pt-[140px] pb-24 px-4 md:px-6 selection:bg-[#D4AF37]/30">
      <div className="max-w-[900px] mx-auto">
        <div className="flex flex-col mb-10 md:mb-16 border-l-2 border-[#D4AF37] pl-4 md:pl-6">
          <span className="text-[#D4AF37] text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold mb-2">
            Personal Archive
          </span>
          <h2 className="text-[32px] md:text-[52px] font-[Georgia,serif] text-[#F5F0E8] leading-tight md:leading-none">
            Your <span className="italic">Orders</span>
          </h2>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 bg-[#D4AF37]/5 blur-3xl rounded-full opacity-50 pointer-events-none" />
          <div className="relative space-y-6">
            {orders.map((orderItem) => (
              <div
                key={orderItem._id}
                className="relative p-[1px] rounded-[24px] bg-gradient-to-b from-white/10 to-transparent hover:from-[#D4AF37]/30 transition-all duration-500"
              >
                <div className="bg-[#0C0C12]/80 backdrop-blur-3xl rounded-[23px] overflow-hidden">
                  <OrderCard order={orderItem} orderItems={orderItems} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-[rgba(245,240,232,0.4)] text-[11px] uppercase tracking-widest font-medium">
            Need assistance with an acquisition?{" "}
            <span className="text-[#D4AF37] cursor-pointer hover:underline">
              Contact Concierge
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
