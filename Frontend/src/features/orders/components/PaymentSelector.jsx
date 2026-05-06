import React from "react";

const PaymentSelector = ({ paymentMethod, onSelectPayment }) => {
  return (
    <div>
      <h2 className="text-base font-bold mb-4" style={{ color: "var(--text-primary)" }}>Payment Method</h2>
      <div className="space-y-3">
        <label
          className="flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all"
          style={{
            background: paymentMethod === "cod" ? "var(--gold-muted)" : "var(--input-bg)",
            border: `1px solid ${paymentMethod === "cod" ? "var(--gold)" : "var(--border-subtle)"}`,
          }}
        >
          <input type="radio" name="payment" value="cod" checked={paymentMethod === "cod"} onChange={(e) => onSelectPayment(e.target.value)} className="accent-[#D4AF37]" />
          <div>
            <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Cash on Delivery</p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>Pay when your order arrives</p>
          </div>
        </label>
        <div
          className="flex items-center gap-3 p-4 rounded-xl opacity-50"
          style={{ background: "var(--input-bg)", border: "1px solid var(--border-subtle)" }}
        >
          <input type="radio" disabled />
          <div>
            <p className="text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>Online Payment</p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>Coming Soon</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSelector;
