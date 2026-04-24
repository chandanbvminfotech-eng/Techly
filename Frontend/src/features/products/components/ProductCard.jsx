import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addItemCart, deleteSingleItemCart, updateCartQuantity } from "../../cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const ProductCard = ({ product }) => {
  const [hovered, setHovered] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.user);
  const cartItem = cart?.items?.find(
    (item) => item.productId.id === product._id,
  );

  // if (typeof cartItem !== "undefined") {                               // used for checking
  //   console.log("CartItem", cartItem);
  // }


  
  const handleAddToCart = async () => {
    await dispatch(
      addItemCart({
        productId: product._id,
        quantity: 1,
      }),
    );
  };
  const handleAddQuantity = async () => {
    await dispatch(
      updateCartQuantity({
        productId: cartItem.productId._id,
        quantity: cartItem.quantity + 1,
      }),
    );
  };
  const handleSubtractQuantity = async () => {
    if (cartItem.quantity === 1) {
      await dispatch(deleteSingleItemCart({productId:cartItem.productId._id}))
    } else {
      await dispatch(
        updateCartQuantity({
          productId: cartItem.productId._id,
          quantity: cartItem.quantity - 1,
        }),
      );
    }
  };
  const handleFirstTimeAddClick = () => {
    navigate("/signin");
  };

  return (
    <div className="group relative rounded-2xl overflow-hidden bg-[#111] border border-white/10 ">
      {/* The Link now only wraps the clickable content area */}
      <Link to={`/products/${product._id}`} className="block">
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

        {/* Image Section */}
        <div className="relative h-[280px] overflow-hidden">
          <img
            src={product.images?.[0]?.url}
            alt={product.name}
            className="w-full h-full object-cover "
          />
        </div>

        {/* Content Area */}
        <div className="p-5 relative z-10">
          <h3 className="text-[15px] font-medium text-[#F5F0E8] line-clamp-1 mb-2">
            {product.name}
          </h3>

          <div className="text-xs text-yellow-400 mb-2">
            ⭐ {product.ratings?.avg || 0}
          </div>
        </div>
      </Link>

      {/* Button Section - Now OUTSIDE the Link */}
      <div className="px-5 pb-5 relative z-20">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-white">
            ₹{product.price}
          </span>

          {user ? (
            cartItem ? (
              <div className="flex items-center bg-white/[0.03] border border-white/10 rounded-full p-[1px]">
                <button
                  className="w-8 h-8 flex items-center justify-center text-[#D4AF37] hover:text-[#F5E090] transition-colors text-xl font-light"
                  onClick={handleSubtractQuantity}
                >
                  -
                </button>
                <span className="px-3 text-[#F5F0E8] text-sm font-bold min-w-[30px] text-center">
                  {cartItem.quantity}
                </span>
                <button
                  className="w-8 h-8 flex items-center justify-center text-[#D4AF37] hover:text-[#F5E090] transition-colors text-xl font-light"
                  onClick={handleAddQuantity}
                >
                  +
                </button>
              </div>
            ) : (
              <button
                onClick={handleAddToCart}
                className="px-4 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white/80 backdrop-blur hover:bg-[#D4AF37] hover:text-black transition-all duration-300"
              >
                Add
              </button>
            )
          ) : (
            <button
              onClick={handleFirstTimeAddClick}
              className="px-4 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white/80 backdrop-blur hover:bg-[#D4AF37] hover:text-black transition-all duration-300"
            >
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
