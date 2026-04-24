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
      await dispatch(deleteSingleItemCart({productId:cart.productId.id}))
    }
    else {
      await dispatch(
        updateCartQuantity({
          productId: cart.productId.id,
          quantity: cart.quantity - 1,
        }),
      );
    }
  };
  const handleDeleteItemCart = async () => {
    await dispatch(deleteSingleItemCart({
      productId:cart.productId.id
    }))
  }
  // console.log("CART",cart)

  return (
    <div className="grid grid-cols-1 md:grid-cols-[5fr_1fr_1fr_1fr] gap-6 px-10 py-10 items-center transition-all duration-500 hover:bg-white/[0.02]">
      {/* Product Information */}
      <div className="flex items-center gap-8">
        <div className="group/img relative w-[100px] h-[100px] shrink-0 bg-white rounded-2xl border border-white/5 p-4 flex items-center justify-center ">
          <img
            src={cart.productId?.images?.[0].url}
            alt={cart.productId.name}
            className="w-full h-full object-contain transition-transform duration-700"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <h3 className="text-[#F5F0E8] text-lg font-medium font-['DM_Sans'] tracking-tight">
            {cart.productId.name}
          </h3>
          <span className="text-[12px] text-[#D4AF37] uppercase tracking-[0.2em] font-bold">
            {cart.productId.description}
          </span>
          {/* Subtle Remove Trigger */}
          <button
            className="text-[10px] bg-white/[0.03] border border-white/5 hover:border-red-500/30 hover:bg-red-500/10 text-[rgba(245,240,232,0.5)] hover:text-red-400 px-3 py-1.5 rounded-full transition-all duration-300 uppercase tracking-[0.15em] font-medium mt-2 w-fit"
            onClick={handleDeleteItemCart}
          >
            Remove from vault
          </button>
        </div>
      </div>

      {/* Price Display */}
      <div className="text-center font-['DM_Sans']">
        <span className="text-[rgba(245,240,232,0.4)] text-[10px] md:hidden block uppercase mb-1">
          Unit Price
        </span>
        <span className="text-[#F5F0E8]/90 font-light text-base">
          ${cart?.productId?.price?.toLocaleString()}
        </span>
      </div>

      {/* Modern Counter */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-[rgba(245,240,232,0.4)] text-[10px] md:hidden block uppercase mb-1">
          Quantity
        </span>
        <div className="flex items-center bg-white/[0.03] border border-white/10 rounded-full px-2 py-1">
          <button
            className="w-8 h-8 flex items-center justify-center text-[#D4AF37] hover:text-[#F5E090] transition-colors text-xl font-light"
            onClick={handleSubtractQuantity}
          >
            -
          </button>
          <span className="px-3 text-[#F5F0E8] text-sm font-bold min-w-[30px] text-center">
            {cart.quantity}
          </span>
          <button
            className="w-8 h-8 flex items-center justify-center text-[#D4AF37] hover:text-[#F5E090] transition-colors text-xl font-light"
            onClick={handleAddQuantity}
          >
            +
          </button>
        </div>
      </div>

      {/* Total Display */}
      <div className="text-right">
        <span className="text-[rgba(245,240,232,0.4)] text-[10px] md:hidden block uppercase mb-1">
          Total
        </span>
        <div className="font-[Georgia,serif] text-[#F5E090] text-xl tracking-tight italic">
          ₹{(cart.quantity * cart.productId.price).toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default Cart;
