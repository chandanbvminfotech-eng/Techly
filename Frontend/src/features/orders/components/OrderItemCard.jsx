import React from "react";

const OrderItemCard = ({ item }) => {
  return (
    <div className="flex gap-3 pb-4 border-b border-[rgba(255,255,255,0.1)] last:border-0">
      <img
        src={item.productId?.images?.[0]?.url || "/placeholder.png"}
        alt={item.name}
        className="w-16 h-16 rounded object-cover"
      />
      <div className="flex-1">
        <p className="text-white font-medium">{item.name}</p>
        <p className="text-[rgba(245,240,232,0.5)] text-sm">
          Qty: {item.quantity} × ₹{item.price}
        </p>
      </div>
      <p className="text-white font-semibold">₹{item.price * item.quantity}</p>
    </div>
  );
};

export default OrderItemCard;
