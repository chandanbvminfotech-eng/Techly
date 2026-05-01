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

  const handleCancel = async () => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
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
      <div className="flex justify-center items-center h-64">
        <p className="text-white">Loading order details...</p>
      </div>
    );
  }

  if (!currentOrder) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-[rgba(245,240,232,0.6)]">Order not found</p>
        <button
          onClick={() => navigate("/orders")}
          className="text-[#D4AF37] underline mt-4"
        >
          Back to Orders
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate("/orders")}
        className="text-[#D4AF37] text-sm mb-6 hover:underline"
      >
        ← Back to Orders
      </button>

      <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Order #{currentOrder._id.slice(-8)}
          </h1>
          <p className="text-[rgba(245,240,232,0.5)] text-sm mt-1">
            Placed on{" "}
            {new Date(currentOrder.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        <div
          className={`px-3 py-1.5 rounded-full text-sm capitalize ${getStatusColor(currentOrder.status)}`}
        >
          {currentOrder.status}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Items List */}
        <div className="md:col-span-2 bg-[rgba(255,255,255,0.04)] rounded-xl p-5">
          <h2 className="text-lg font-semibold text-white mb-4">Items</h2>
          <div className="space-y-4">
            {currentOrder.items.map((item, idx) => (
              <OrderItemCard key={idx} item={item} />
            ))}
          </div>
        </div>

        {/* Order Summary & Address */}
        <div className="space-y-6">
          {/* Summary */}
          <div className="bg-[rgba(255,255,255,0.04)] rounded-xl p-5">
            <h2 className="text-lg font-semibold text-white mb-4">
              Order Summary
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between text-[rgba(245,240,232,0.7)] text-sm">
                <span>Subtotal</span>
                <span>₹{currentOrder.totalAmount}</span>
              </div>
              <div className="flex justify-between text-[rgba(245,240,232,0.7)] text-sm">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-white text-lg font-bold pt-2 border-t border-[rgba(255,255,255,0.1)]">
                <span>Total</span>
                <span>₹{currentOrder.totalAmount}</span>
              </div>
            </div>

            {canCancel && (
              <button
                onClick={handleCancel}
                disabled={cancelling}
                className="w-full mt-4 px-4 py-2 rounded-lg bg-red-500/20 text-red-500 text-sm font-medium hover:bg-red-500/30 transition-all disabled:opacity-50"
              >
                {cancelling ? "Cancelling..." : "Cancel Order"}
              </button>
            )}
          </div>

          {/* Shipping Address */}
          {currentOrder.address && (
            <div className="bg-[rgba(255,255,255,0.04)] rounded-xl p-5">
              <h2 className="text-lg font-semibold text-white mb-4">
                Shipping Address
              </h2>
              <p className="text-white text-sm font-medium">
                {currentOrder.address.name}
              </p>
              <p className="text-[rgba(245,240,232,0.5)] text-xs">
                {currentOrder.address.phone}
              </p>
              <p className="text-[rgba(245,240,232,0.5)] text-xs mt-2">
                {currentOrder.address.addressLine}, {currentOrder.address.city},{" "}
                {currentOrder.address.state} - {currentOrder.address.pincode}
              </p>
            </div>
          )}

          {/* Payment Method */}
          <div className="bg-[rgba(255,255,255,0.04)] rounded-xl p-5">
            <h2 className="text-lg font-semibold text-white mb-2">
              Payment Method
            </h2>
            <p className="text-[rgba(245,240,232,0.6)] text-sm capitalize">
              {currentOrder.paymentMethod === "cod"
                ? "Cash on Delivery"
                : currentOrder.paymentMethod}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
