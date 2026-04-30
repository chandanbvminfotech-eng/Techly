import React from "react";
import { useDispatch } from "react-redux";
import { deleteSingleItemCart, updateCartQuantity } from "../cartSlice";

const Cart = ({ cart }) => {
  const dispatch = useDispatch();

  const handleAddQuantity = async () => {
    await dispatch(
      updateCartQuantity({
        productId: cart.productId.id,
        quantity: cart.quantity + 1,
      }),
    );
  };

  const handleSubtractQuantity = async () => {
    if (cart.quantity === 1) {
      await dispatch(deleteSingleItemCart({ productId: cart.productId.id }));
    } else {
      await dispatch(
        updateCartQuantity({
          productId: cart.productId.id,
          quantity: cart.quantity - 1,
        }),
      );
    }
  };

  const handleDeleteItemCart = async () => {
    await dispatch(deleteSingleItemCart({ productId: cart.productId.id }));
  };

  return (
    <div className="flex flex-col md:grid md:grid-cols-[5fr_1fr_1fr_1fr] gap-6 px-6 md:px-10 py-8 md:py-10 items-center transition-all duration-500 hover:bg-white/[0.02]">
      {/* Product Information */}
      <div className="flex items-center gap-5 md:gap-8 w-full">
        <div className="group/img relative w-[80px] h-[80px] md:w-[100px] md:h-[100px] shrink-0 bg-white rounded-2xl border border-white/5 p-3 md:p-4 flex items-center justify-center">
          <img
            src={cart.productId?.images?.[0].url}
            alt={cart.productId.name}
            className="w-full h-full object-contain transition-transform duration-700"
          />
        </div>

        <div className="flex flex-col gap-1 w-full">
          <h3 className="text-[#F5F0E8] text-base md:text-lg font-medium font-['DM_Sans'] tracking-tight">
            {cart.productId.name}
          </h3>
          <span className="text-[10px] md:text-[12px] text-[#D4AF37] uppercase tracking-[0.2em] font-bold line-clamp-1">
            {cart.productId.description}
          </span>
          <button
            className="text-[9px] md:text-[10px] bg-white/[0.03] border border-white/5 hover:border-red-500/30 hover:bg-red-500/10 text-[rgba(245,240,232,0.5)] hover:text-red-400 px-3 py-1.5 rounded-full transition-all duration-300 uppercase tracking-[0.15em] font-medium mt-1 md:mt-2 w-fit"
            onClick={handleDeleteItemCart}
          >
            Remove from vault
          </button>
        </div>
      </div>

      {/* Mobile Stats Container (Price, Qty, Total in a row on mobile) */}
      <div className="grid grid-cols-3 md:contents w-full items-center">
        {/* Price Display */}
        <div className="text-center md:text-center font-['DM_Sans']">
          <span className="text-[rgba(245,240,232,0.4)] text-[9px] md:hidden block uppercase mb-1">
            Unit Price
          </span>
          <span className="text-[#F5F0E8]/90 font-light text-sm md:text-base">
            ₹{cart?.productId?.price?.toLocaleString()}
          </span>
        </div>

        {/* Modern Counter */}
        <div className="flex flex-col items-center gap-1 md:gap-2">
          <span className="text-[rgba(245,240,232,0.4)] text-[9px] md:hidden block uppercase mb-1">
            Qty
          </span>
          <div className="flex items-center bg-white/[0.03] border border-white/10 rounded-full px-1.5 py-0.5">
            <button
              className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center text-[#D4AF37] hover:text-[#F5E090] transition-colors text-lg font-light"
              onClick={handleSubtractQuantity}
            >
              -
            </button>
            <span className="px-2 md:px-3 text-[#F5F0E8] text-xs md:text-sm font-bold min-w-[24px] text-center">
              {cart.quantity}
            </span>
            <button
              className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center text-[#D4AF37] hover:text-[#F5E090] transition-colors text-lg font-light"
              onClick={handleAddQuantity}
            >
              +
            </button>
          </div>
        </div>

        {/* Total Display */}
        <div className="text-right">
          <span className="text-[rgba(245,240,232,0.4)] text-[9px] md:hidden block uppercase mb-1">
            Total
          </span>
          <div className="font-[Georgia,serif] text-[#F5E090] text-lg md:text-xl tracking-tight italic">
            ₹{(cart.quantity * cart.productId.price).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
