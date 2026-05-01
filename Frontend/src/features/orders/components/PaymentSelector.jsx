import React from "react";

const PaymentSelector = ({ paymentMethod, onSelectPayment }) => {
  return (
    <div className="bg-[rgba(255,255,255,0.04)] rounded-xl p-5">
      <h2 className="text-lg font-semibold text-white mb-4">Payment Method</h2>
      <div className="space-y-3">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            name="payment"
            value="cod"
            checked={paymentMethod === "cod"}
            onChange={(e) => onSelectPayment(e.target.value)}
          />
          <span className="text-white text-sm">Cash on Delivery</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer opacity-50">
          <input type="radio" disabled />
          <span className="text-[rgba(245,240,232,0.4)] text-sm">
            Online Payment (Coming Soon)
          </span>
        </label>
      </div>
    </div>
  );
};

export default PaymentSelector;
