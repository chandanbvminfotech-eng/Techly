import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchOrderById, cancelOrder } from "../orderSlice";
import OrderItemCard from "../components/OrderItemCard";

const OrderDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentOrder, isLoading } = useSelector((state) => state.order);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    dispatch(fetchOrderById(id));
  }, [dispatch, id]);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "text-yellow-200/70 border-yellow-200/20 bg-yellow-200/5";
      case "confirmed":
        return "text-blue-200/70 border-blue-200/20 bg-blue-200/5";
      case "shipped":
        return "text-purple-200/70 border-purple-200/20 bg-purple-200/5";
      case "delivered":
        return "text-[#D4AF37] border-[#D4AF37]/20 bg-[#D4AF37]/5";
      case "cancelled":
        return "text-red-300/60 border-red-300/10 bg-red-300/5";
      default:
        return "text-gray-400 border-white/10 bg-white/5";
    }
  };

  const handleCancel = async () => {
    if (
      window.confirm("Are you certain you wish to revoke this acquisition?")
    ) {
      setCancelling(true);
      try {
        await dispatch(cancelOrder(id)).unwrap();
      } catch (err) {
        alert(err || "Failed to cancel order");
      } finally {
        setCancelling(false);
      }
    }
  };

  const canCancel =
    currentOrder?.status === "pending" || currentOrder?.status === "confirmed";

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#08080E] flex items-center justify-center">
        <p className="text-[#D4AF37] font-['DM_Sans'] uppercase tracking-widest text-sm animate-pulse">
          Opening Secure Archive...
        </p>
      </div>
    );
  }

  if (!currentOrder) {
    return (
      <div className="min-h-screen bg-[#08080E] pt-[100px] flex flex-col items-center justify-center">
        <p className="text-[rgba(245,240,232,0.3)] font-[Georgia,serif] italic text-xl">
          Record not found.
        </p>
        <button
          onClick={() => navigate("/orders")}
          className="text-[#D4AF37] uppercase tracking-widest text-xs font-bold mt-6 hover:brightness-125 transition-all"
        >
          Return to Archive
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#08080E] pt-[100px] md:pt-[140px] pb-24 px-4 md:px-6 selection:bg-[#D4AF37]/30">
      <div className="max-w-[1100px] mx-auto">
        {/* Navigation & Header */}
        <button
          onClick={() => navigate("/orders")}
          className="group flex items-center gap-2 text-[#D4AF37] text-[10px] uppercase tracking-[0.2em] font-black mb-8 hover:gap-4 transition-all duration-300"
        >
          <span className="text-lg">←</span> Back to Archive
        </button>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-l-2 border-[#D4AF37] pl-4 md:pl-6 gap-6">
          <div>
            <span className="text-[#D4AF37] text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold mb-2 block">
              Manifest Detail
            </span>
            <h2 className="text-[32px] md:text-[52px] font-[Georgia,serif] text-[#F5F0E8] leading-tight md:leading-none">
              Order{" "}
              <span className="italic">#{currentOrder?._id?.slice(-8)}</span>
            </h2>
            <p className="text-[rgba(245,240,232,0.4)] text-[11px] uppercase tracking-widest font-medium mt-2">
              Authenticated on{" "}
              {new Date(currentOrder.createdAt).toLocaleString("en-IN", {
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <div
            className={`px-6 py-2 rounded-full text-[10px] uppercase tracking-[0.2em] font-black border ${getStatusColor(currentOrder.status)}`}
          >
            {currentOrder.status}
          </div>
        </div>

        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8">
          {/* Items Section */}
          <div className="space-y-6">
            <div className="relative p-[1px] rounded-[24px] bg-gradient-to-b from-white/10 to-transparent">
              <div className="bg-[#0C0C12]/80 backdrop-blur-3xl rounded-[23px] p-6 md:p-8">
                <h3 className="text-[#F5F0E8] font-[Georgia,serif] italic text-xl mb-8 border-b border-white/5 pb-4">
                  Selection Manifest
                </h3>
                <div className="space-y-6">
                  {currentOrder?.items?.length > 0 ? (
                    currentOrder.items.map((item, idx) => (
                      <OrderItemCard key={idx} item={item} />
                    ))
                  ) : (
                    <p className="text-[rgba(245,240,232,0.3)] italic">
                      No items found in this record.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar: Summary & Logistics */}
          <div className="space-y-8">
            {/* Financial Summary */}
            <div className="relative group">
              <div className="absolute -inset-[1px] bg-gradient-to-b from-[#D4AF37]/20 to-transparent rounded-[24px] blur-md opacity-50" />
              <div className="relative bg-[#0C0C12]/90 border border-white/5 rounded-[24px] p-8 backdrop-blur-3xl">
                <h3 className="text-[#F5F0E8] font-[Georgia,serif] italic text-lg mb-6">
                  Financial Summary
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between text-[rgba(245,240,232,0.5)] text-xs uppercase tracking-widest font-bold">
                    <span>Subtotal</span>
                    <span>₹{currentOrder.totalAmount?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[rgba(245,240,232,0.5)] text-xs uppercase tracking-widest font-bold">
                    <span>Shipping</span>
                    <span className="text-[#D4AF37]">Complimentary</span>
                  </div>
                  <div className="h-[1px] w-full bg-white/5 my-2" />
                  <div className="flex justify-between items-end">
                    <span className="text-[rgba(245,240,232,0.4)] text-[10px] uppercase tracking-[0.2em] font-black">
                      Total Investment
                    </span>
                    <span className="text-[28px] font-[Georgia,serif] text-[#F5E090] leading-none">
                      ₹{currentOrder.totalAmount?.toLocaleString()}
                    </span>
                  </div>

                  {canCancel && (
                    <button
                      onClick={handleCancel}
                      disabled={cancelling}
                      className="w-full mt-6 py-4 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] uppercase tracking-[0.2em] font-black hover:bg-red-500/20 transition-all disabled:opacity-30"
                    >
                      {cancelling ? "Cancelling..." : "Cancel Order"}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Delivery Details */}
            {currentOrder.address && (
              <div className="bg-[#0C0C12]/40 border border-white/5 rounded-[24px] p-8">
                <h3 className="text-[#F5F0E8] font-[Georgia,serif] italic text-lg mb-6 text-[rgba(245,240,232,0.6)]">
                  Delivery Destination
                </h3>
                <div className="space-y-1">
                  <p className="text-[#F5F0E8] text-sm font-bold uppercase tracking-wider">
                    {currentOrder.address.name}
                  </p>
                  <p className="text-[rgba(245,240,232,0.5)] text-xs leading-relaxed">
                    {currentOrder.address.addressLine}
                    <br />
                    {currentOrder.address.city}, {currentOrder.address.state} —{" "}
                    {currentOrder.address.pincode}
                  </p>
                  <p className="text-[#D4AF37] text-[10px] font-black mt-4 uppercase tracking-widest">
                    Contact: {currentOrder.address.phone}
                  </p>
                </div>
              </div>
            )}

            {/* Payment Method */}
            <div className="bg-[#0C0C12]/40 border border-white/5 rounded-[24px] p-8">
              <h3 className="text-[#F5F0E8] font-[Georgia,serif] italic text-lg mb-2 text-[rgba(245,240,232,0.6)]">
                Settlement
              </h3>
              <p className="text-[rgba(245,240,232,0.5)] text-xs uppercase tracking-[0.2em] font-bold">
                {currentOrder.paymentMethod === "cod"
                  ? "Cash on Delivery"
                  : currentOrder.paymentMethod}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
