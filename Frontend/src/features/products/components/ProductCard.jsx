import React, { useState } from "react";
import { Link } from "react-router-dom";
import { addItemCart } from "../../cart/cartSlice";
import { useDispatch } from "react-redux";

const ProductCard = ({ product }) => {
  const [hovered, setHovered] = useState(false);
  const dispatch = useDispatch();
  const handleAddToCart = async () => {
    await dispatch(addItemCart({
      productId: product._id,
      quantity:1
    }))
  }


  return (
    <div className="group relative rounded-2xl overflow-hidden bg-[#111] border border-white/10 hover:border-[#D4AF37]/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_25px_80px_rgba(0,0,0,0.6)]">
  {/* The Link now only wraps the clickable content area */}
  <Link to={`/products/${product._id}`} className="block">
    {/* Glow Effect */}
    <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

    {/* Image Section */}
    <div className="relative h-[280px] overflow-hidden">
      <img
        src={product.images?.[0]?.url}
        alt={product.name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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

      <button
        onClick={(e) => {
          e.preventDefault(); // Just in case
          handleAddToCart();
        }}
        className="px-4 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white/80 backdrop-blur hover:bg-[#D4AF37] hover:text-black transition-all duration-300"
      >
        Add
      </button>
    </div>
  </div>
</div>
  );
};

export default ProductCard;
