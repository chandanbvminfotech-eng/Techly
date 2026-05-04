import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const SellerProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Ensuring stock is treated as a number for the logic
  const stockCount = parseInt(product.stock) || 0;
  const isLowStock = stockCount < 5;

  const handleDelete = async () => {
    if (
      window.confirm(
        `Revoke listing for "${product.name}"? This cannot be undone.`,
      )
    ) {
      // dispatch(deleteProduct(product._id));
    }
  };

  return (
    <div className="group relative rounded-2xl overflow-hidden bg-[#0C0C12] border border-white/10 hover:border-[#D4AF37]/40 transition-all duration-500 shadow-2xl">
      {/* Subtle Glow Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none" />

      {/* Media Section */}
      <div className="relative h-[220px] overflow-hidden bg-white/[0.03] flex items-center justify-center p-6">
        <img
          src={product.images?.[0]?.url}
          alt={product.name}
          className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-110"
        />

        {/* Brand Badge - Highly Readable */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1.5 rounded-md bg-[#08080E] text-[#D4AF37] text-[10px] uppercase tracking-[0.15em] font-black border border-[#D4AF37]/40 shadow-lg">
            {product.brand}
          </span>
        </div>

        {/* Low Stock Indicator */}
        {isLowStock && (
          <span className="absolute top-4 right-4 px-3 py-1.5 rounded-md bg-red-600 text-white text-[10px] uppercase tracking-widest font-black shadow-lg">
            Low Stock
          </span>
        )}
      </div>

      {/* Information Section */}
      <div className="p-6 space-y-5">
        <div>
          <h3 className="text-[18px] font-bold text-white leading-tight line-clamp-1 mb-2">
            {product.name}
          </h3>
          {/* Enhanced Technical Specs Visibility */}
          <div className="flex flex-wrap gap-2">
            <span className="text-[11px] px-2 py-0.5 rounded bg-white/5 text-[rgba(245,240,232,0.8)] font-bold uppercase tracking-wider">
              {product.processor}
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded bg-white/5 text-[rgba(245,240,232,0.8)] font-bold uppercase tracking-wider">
              {product.ram} / {product.storage}
            </span>
          </div>
        </div>

        {/* Pricing and Inventory - Bold & Clear */}
        <div className="flex items-center justify-between border-t border-white/10 pt-4">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-[rgba(245,240,232,0.5)] font-black mb-1">
              Price
            </span>
            <span className="text-2xl font-bold text-[#F5E090]">
              ₹{Number(product.price).toLocaleString()}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[10px] uppercase tracking-widest text-[rgba(245,240,232,0.5)] font-black mb-1 block">
              Stock
            </span>
            <span
              className={`text-sm font-black ${isLowStock ? "text-red-400" : "text-green-400"}`}
            >
              {stockCount} Units
            </span>
          </div>
        </div>

        {/* Actions Section - High Contrast Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={() => navigate(`/seller/products/edit/${product._id}`)}
            className="flex-1 py-3 rounded-xl bg-[#D4AF37] text-[#08080E] text-[11px] uppercase tracking-[0.1em] font-black hover:bg-[#F5E090] transition-all duration-300"
          >
            Modify
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-[11px] uppercase tracking-[0.1em] font-black hover:bg-red-600/20 hover:border-red-600/40 hover:text-red-400 transition-all duration-300"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellerProductCard;
