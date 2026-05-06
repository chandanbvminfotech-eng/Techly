import React from "react";
import { useDispatch } from "react-redux";
import { deleteSingleItemCart, updateCartQuantity } from "../cartSlice";

const Cart = ({ cart }) => {
  const dispatch = useDispatch();

  const handleAddQuantity = async () => {
    await dispatch(updateCartQuantity({ productId: cart.productId.id, quantity: cart.quantity + 1 }));
  };
  const handleSubtractQuantity = async () => {
    if (cart.quantity === 1) {
      await dispatch(deleteSingleItemCart({ productId: cart.productId.id }));
    } else {
      await dispatch(updateCartQuantity({ productId: cart.productId.id, quantity: cart.quantity - 1 }));
    }
  };
  const handleDeleteItemCart = async () => {
    await dispatch(deleteSingleItemCart({ productId: cart.productId.id }));
  };

  return (
    <div
      className="flex flex-col md:grid md:grid-cols-[5fr_1fr_1fr_1fr] gap-4 md:gap-6 px-5 md:px-8 py-5 md:py-6 items-center transition-all duration-300"
      style={{ borderBottom: "1px solid var(--border-subtle)" }}
      onMouseEnter={e => e.currentTarget.style.background = "var(--input-bg)"}
      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
    >
      {/* Product info */}
      <div className="flex items-center gap-4 w-full">
        <div
          className="relative w-[72px] h-[72px] md:w-[88px] md:h-[88px] shrink-0 rounded-xl p-2 flex items-center justify-center overflow-hidden"
          style={{ background: "var(--bg-surface)", border: "1px solid var(--border-subtle)" }}
        >
          <img
            src={cart.productId?.images?.[0]?.url}
            alt={cart.productId.name}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="flex flex-col gap-1 flex-1 min-w-0">
          <h3 className="text-sm md:text-base font-semibold truncate" style={{ color: "var(--text-primary)" }}>
            {cart.productId.name}
          </h3>
          <span className="text-[10px] uppercase tracking-[0.15em] font-bold truncate" style={{ color: "var(--gold)" }}>
            {cart.productId.brand || cart.productId.description?.slice(0, 40)}
          </span>
          <button
            onClick={handleDeleteItemCart}
            className="text-[10px] px-3 py-1 rounded-full w-fit mt-1 transition-all duration-200 uppercase tracking-wider font-medium"
            style={{ background: "var(--input-bg)", color: "var(--text-muted)", border: "1px solid var(--border-subtle)" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.08)"; e.currentTarget.style.color = "#f87171"; e.currentTarget.style.borderColor = "rgba(239,68,68,0.3)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "var(--input-bg)"; e.currentTarget.style.color = "var(--text-muted)"; e.currentTarget.style.borderColor = "var(--border-subtle)"; }}
          >
            Remove
          </button>
        </div>
      </div>

      {/* Mobile: price/qty/total in a row; Desktop: in separate grid columns */}
      <div className="grid grid-cols-3 md:contents w-full items-center gap-2">
        {/* Price */}
        <div className="text-center">
          <span className="text-[9px] uppercase tracking-wider block mb-1 md:hidden" style={{ color: "var(--text-muted)" }}>Price</span>
          <span className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
            ₹{cart?.productId?.price?.toLocaleString("en-IN")}
          </span>
        </div>

        {/* Qty stepper */}
        <div className="flex flex-col items-center gap-1">
          <span className="text-[9px] uppercase tracking-wider block md:hidden" style={{ color: "var(--text-muted)" }}>Qty</span>
          <div className="flex items-center rounded-full px-1" style={{ background: "var(--input-bg)", border: "1px solid var(--border-subtle)" }}>
            <button
              className="w-7 h-7 flex items-center justify-center text-lg font-light transition-colors"
              style={{ color: "var(--gold)" }}
              onClick={handleSubtractQuantity}
            >−</button>
            <span className="px-2 text-sm font-bold min-w-[24px] text-center" style={{ color: "var(--text-primary)" }}>
              {cart.quantity}
            </span>
            <button
              className="w-7 h-7 flex items-center justify-center text-lg font-light transition-colors"
              style={{ color: "var(--gold)" }}
              onClick={handleAddQuantity}
            >+</button>
          </div>
        </div>

        {/* Line total */}
        <div className="text-right">
          <span className="text-[9px] uppercase tracking-wider block mb-1 md:hidden" style={{ color: "var(--text-muted)" }}>Total</span>
          <span className="text-base font-bold font-[Georgia,serif]" style={{ color: "var(--gold)" }}>
            ₹{(cart.quantity * cart.productId.price).toLocaleString("en-IN")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Cart;
