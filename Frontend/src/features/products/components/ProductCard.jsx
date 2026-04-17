import React, { useState } from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] hover:border-[#D4AF37]/40"
    >
      <Link to={`/products/${product._id}`}>
        <h3>{product.name}</h3>
      </Link>
      {/* Image */}
      <div className="h-[280px] bg-black/20 flex items-center justify-center relative overflow-hidden">
        <img
          src={product.images?.[0]?.url}
          alt={product.name}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-[16px] text-[#F5F0E8] font-medium font-serif mb-3">
          {product.name}
        </h3>

        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-[#F5F0E8]">
            ₹{product.price}
          </span>

          <button className="px-4 py-1.5 rounded-lg border border-white/10 text-sm text-white/80 hover:bg-[#D4AF37] hover:text-black transition-all duration-200">
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
