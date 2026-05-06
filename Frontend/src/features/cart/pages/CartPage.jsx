import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCart, getCartData } from "../cartSlice.js";
import Cart from "../components/Cart.jsx";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, error } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.user);

  const handleClearCart = async () => {
    await dispatch(deleteCart());
    navigate("/cart");
  };

  const quantityCheck = () => !cart?.items?.length;

  useEffect(() => {
    if (user) dispatch(getCartData());
  }, [dispatch]);

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg-base)", color: "#f87171" }}>
        {error}
      </div>
    );

  return (
    <div className="min-h-screen pt-[88px] md:pt-[112px] pb-24 px-4 md:px-6" style={{ background: "var(--bg-base)" }}>
      <div className="max-w-[1100px] mx-auto">

        {/* Header */}
        <div className="flex flex-col mb-8 md:mb-12 pl-5" style={{ borderLeft: "2px solid var(--gold)" }}>
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold mb-1" style={{ color: "var(--gold)" }}>
            Your Selection
          </span>
          <h2 className="text-[28px] md:text-[48px] font-[Georgia,serif] leading-tight" style={{ color: "var(--text-primary)" }}>
            Shopping <span className="italic">Cart</span>
          </h2>
        </div>

        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)", boxShadow: "var(--shadow-card)" }}
        >
          {/* Table header – desktop */}
          <div
            className="hidden md:grid grid-cols-[5fr_1fr_1fr_1fr] gap-4 px-8 py-5 text-[11px] uppercase tracking-[0.2em] font-black"
            style={{ borderBottom: "1px solid var(--border-subtle)", color: "var(--text-muted)" }}
          >
            <div>Product</div>
            <div className="text-center">Price</div>
            <div className="text-center">Qty</div>
            <div className="text-right">Total</div>
          </div>

          {/* Items */}
          <div style={{ borderBottom: "1px solid var(--border-subtle)" }}>
            {cart?.items?.length > 0 ? (
              cart.items.map((item) => (
                <Cart key={item.productId._id} cart={item} />
              ))
            ) : (
              <div className="py-24 text-center px-6">
                <div className="text-5xl mb-4">🛒</div>
                <p className="font-[Georgia,serif] italic text-lg mb-4" style={{ color: "var(--text-muted)" }}>
                  Your cart is empty.
                </p>
                <a href="/products" className="inline-block px-6 py-3 rounded-full text-sm font-bold" style={{ background: "var(--gold)", color: "#08080E" }}>
                  Browse Products
                </a>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 md:px-8 py-8">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <p className="text-sm max-w-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                Free standard shipping and secure packaging on all orders.
              </p>

              <div className="flex flex-col items-start lg:items-end gap-4">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold block mb-1" style={{ color: "var(--text-muted)" }}>
                    Estimated Total
                  </span>
                  <span className="text-[32px] md:text-[38px] font-[Georgia,serif]" style={{ color: "var(--gold)" }}>
                    ₹{cart?.totalAmount?.toLocaleString("en-IN") || "0"}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  {!quantityCheck() && (
                    <button
                      onClick={handleClearCart}
                      className="px-8 py-3.5 rounded-full text-xs font-black uppercase tracking-[0.15em] transition-all hover:opacity-80"
                      style={{ border: "1px solid var(--border-medium)", color: "var(--text-secondary)", background: "var(--input-bg)" }}
                    >
                      Clear Cart
                    </button>
                  )}
                  <button
                    onClick={() => navigate("/checkout")}
                    className="px-8 py-3.5 rounded-full text-xs font-black uppercase tracking-[0.15em] transition-all hover:opacity-90 active:scale-95"
                    style={{ background: "var(--gold)", color: "#08080E" }}
                  >
                    Proceed to Checkout →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
