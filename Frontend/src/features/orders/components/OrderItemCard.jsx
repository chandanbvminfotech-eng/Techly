import React from "react";

const OrderItemCard = ({ item }) => {
  return (
    <div className="flex gap-3 pb-4 border-b border-[rgba(255,255,255,0.1)] last:border-0">
      <img
        src={item.productImage || "/placeholder.png"}
        alt={item.productName}
        className="w-16 h-16 rounded object-cover"
      />
      <div className="flex-1">
        <p className="text-white font-medium">{item.productName}</p>
        <p className="text-[rgba(245,240,232,0.5)] text-sm">
          Qty: {item.quantity} × ₹{item.priceAtPurchase?.toLocaleString()}
        </p>
      </div>
      <p className="text-white font-semibold">
        ₹{(item.priceAtPurchase * item.quantity)?.toLocaleString()}
      </p>
    </div>
  );
};

export default OrderItemCard;