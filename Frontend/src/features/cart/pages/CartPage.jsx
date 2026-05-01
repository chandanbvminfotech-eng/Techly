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

  const quantityCheck = () => {
    if (cart?.items?.length < 1) return true;
    return false
  }
  // console.log(quantityCheck())

  useEffect(() => {
    if (user) {
      dispatch(getCartData());
    }
  }, [dispatch]);

  if (error)
    return (
      <div className="min-h-screen bg-[#08080E] flex items-center justify-center text-red-400 font-['DM_Sans']">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-[#08080E] pt-[100px] md:pt-[140px] pb-24 px-4 md:px-6 selection:bg-[#D4AF37]/30">
      <div className="max-w-[1200px] mx-auto">
        {/* Editorial Header */}
        <div className="flex flex-col mb-8 md:mb-12 border-l-2 border-[#D4AF37] pl-4 md:pl-6">
          <span className="text-[#D4AF37] text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold mb-2">
            Private Collection
          </span>
          <h2 className="text-[32px] md:text-[52px] font-[Georgia,serif] text-[#F5F0E8] leading-tight md:leading-none">
            Your Shopping <span className="italic">Cart</span>
          </h2>
        </div>

        {/* The "Vault" Container */}
        <div className="relative group">
          <div className="absolute -inset-[1px] bg-gradient-to-b from-[#D4AF37]/20 to-transparent rounded-[24px] blur-md opacity-50" />

          <div className="relative bg-[#0C0C12]/80 border border-white/5 rounded-[24px] overflow-hidden backdrop-blur-3xl shadow-2xl">
            {/* Minimalist Table Header - Hidden on Mobile */}
            <div className="hidden md:grid grid-cols-[5fr_1fr_1fr_1fr] gap-4 px-10 py-8 border-b border-white/5 text-[#ffffff] uppercase tracking-[0.2em] text-[12px] font-black">
              <div>Product Overview</div>
              <div className="text-center">Unit Price</div>
              <div className="text-center">Quantity</div>
              <div className="text-right">Line Total</div>
            </div>

            {/* Items */}
            <div className="divide-y divide-white/5">
              {cart?.items?.length > 0 ? (
                cart.items.map((item) => (
                  <Cart key={item.productId._id} cart={item} />
                ))
              ) : (
                <div className="py-24 text-center px-6">
                  <p className="text-[rgba(245,240,232,0.3)] font-[Georgia,serif] italic text-lg md:text-xl">
                    No items currently in your selection.
                  </p>
                </div>
              )}
            </div>

            {/* Premium Footer Section */}
            <div className="px-6 md:px-10 py-8 md:py-12 bg-gradient-to-t from-[rgba(212,175,55,0.03)] to-transparent">
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
                <div className="max-w-sm">
                  <p className="text-[rgba(245,240,232,0.5)] text-sm leading-relaxed font-light">
                    Complimentary standard shipping and luxury packaging
                    included with this order.
                  </p>
                </div>

                <div className="flex flex-col items-center md:items-end gap-6 w-full lg:w-auto">
                  <div className="flex flex-col items-center md:items-end">
                    <span className="text-[rgba(245,240,232,0.4)] text-[10px] uppercase tracking-[0.2em] font-bold mb-1">
                      Estimated Total
                    </span>
                    <span className="text-[32px] md:text-[36px] font-[Georgia,serif] text-[#F5E090] leading-none">
                      ₹{cart?.totalAmount?.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 md:gap-8 w-full sm:w-auto">
                    {!quantityCheck() && (
                      <button
                        className="group relative overflow-hidden bg-[#27161B] px-8 py-4 rounded-full transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(212,175,55,0.2)] active:scale-95"
                        onClick={handleClearCart}
                      >
                        <span className="relative z-10 text-slate-200 text-xs md:text-sm font-black uppercase tracking-[0.2em]">
                          Clear Cart
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      </button>
                    )}

                    <button
                      className="group relative overflow-hidden bg-[#D4AF37] px-8 py-4 rounded-full transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(212,175,55,0.2)] active:scale-95"
                      onClick={() => navigate("/checkout")}
                    >
                      <span className="relative z-10 text-[#08080E] text-xs md:text-sm font-black uppercase tracking-[0.2em]">
                        Proceed To Checkout
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </button>
                  </div>
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
