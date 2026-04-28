import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  addItemCart,
  deleteSingleItemCart,
  updateCartQuantity,
} from "../../cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { ApiError } from "../../../../../Backend/src/utils/apiError";

const SpecRow = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 py-3 border-b border-[rgba(245,240,232,0.06)] last:border-0 group">
    <span className="text-[#D4AF37] text-lg w-6 shrink-0">{icon}</span>
    <span className="text-xs font-semibold tracking-wider text-[rgba(245,240,232,0.5)] uppercase w-24">
      {label}
    </span>
    <span className="text-sm text-[rgba(245,240,232,0.85)] font-medium ml-auto text-right">
      {value}
    </span>
  </div>
);

const StockBadge = ({ stock }) => {
  const low = stock <= 5;
  const out = stock === 0;
  return (
    <span
      className={`inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full
        ${
          out
            ? "bg-red-500/10 text-red-400 border border-red-500/20"
            : low
              ? "bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20"
              : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
        }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          out ? "bg-red-400" : low ? "bg-[#D4AF37]" : "bg-emerald-400"
        }`}
      />
      {out ? "Out of Stock" : low ? `Only ${stock} left` : "In Stock"}
    </span>
  );
};

const SingleProduct = ({ product, cart, user }) => {
  const [activeImg, setActiveImg] = useState(0);
  const [added, setAdded] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const images = product.images?.length ? product.images : [{ url: "" }];
  const cartItem = cart?.items?.find(
    (item) => item.productId.id === product._id,
  );


  const handleAddToCart = async () => {
    if (!user) {
      localStorage.setItem("redirectAfterLogin", `/products/${product._id}`);
      navigate("/signin", {
        state: { from: `/products/${product._id}`, productId: product._id },
      });
      return;
    }
    try {
      await dispatch(
        addItemCart({
          productId: product._id,
          quantity: quantity,
        }),
      );
      setAdded(true);
      setTimeout(() => setAdded(false), 2200);
    } catch (err) {
      throw new ApiError(400, "Error in adding to cart");
    }
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
      await dispatch(
        deleteSingleItemCart({ productId: cartItem.productId._id }),
      );
    } else {
      await dispatch(
        updateCartQuantity({
          productId: cartItem.productId._id,
          quantity: cartItem.quantity - 1,
        }),
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#0C0D11] font-['DM_Sans',system-ui,sans-serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-xs text-[rgba(245,240,232,0.5)] font-medium">
          <Link to="/" className="hover:text-[#D4AF37] transition-colors">
            Home
          </Link>
          <span>›</span>
          <Link
            to="/products"
            className="hover:text-[#D4AF37] transition-colors"
          >
            Products
          </Link>
          <span>›</span>
          <span className="text-[rgba(245,240,232,0.72)]">{product.name}</span>
        </nav>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative group rounded-2xl bg-[rgba(245,240,232,0.02)] border border-[rgba(245,240,232,0.06)] overflow-hidden">
              <div className="aspect-square flex items-center justify-center p-8">
                <img
                  src={images[activeImg]?.url}
                  alt={product.name}
                  onLoad={() => setImgLoaded(true)}
                  className={`max-w-full max-h-full object-contain transition-all duration-500
                    group-hover:scale-105
                    ${imgLoaded ? "opacity-100" : "opacity-0"}`}
                />
              </div>

              {/* Image Counter */}
              {images.length > 1 && (
                <div className="absolute bottom-4 right-4 bg-[#08080E]/80 backdrop-blur-sm px-2 py-1 rounded-lg text-xs text-[rgba(245,240,232,0.72)]">
                  {activeImg + 1} / {images.length}
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all
                      ${
                        activeImg === i
                          ? "border-[#D4AF37] shadow-lg shadow-[#D4AF37]/20"
                          : "border-[rgba(245,240,232,0.1)] hover:border-[rgba(245,240,232,0.3)]"
                      }`}
                  >
                    <img
                      src={img.url}
                      alt={`Product view ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            {/* Brand and Name */}
            <div>
              <div className="inline-block px-3 py-1 bg-[#D4AF37]/10 rounded-full mb-4">
                <span className="text-xs font-bold text-[#D4AF37] tracking-wider">
                  {product.brand}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#F5F0E8] mb-4 leading-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-3 flex-wrap">
                <StockBadge stock={product.stock} />
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 pb-2 border-b border-[rgba(245,240,232,0.06)]">
              <span className="text-4xl font-bold text-[#F5F0E8]">
                ₹{Number(product.price).toLocaleString("en-IN")}
              </span>
              <span className="text-base text-[rgba(245,240,232,0.5)] line-through">
                ₹
                {(Number(product.price) * 1.12).toLocaleString("en-IN", {
                  maximumFractionDigits: 0,
                })}
              </span>
              <span className="text-sm font-semibold text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-1 rounded">
                12% OFF
              </span>
            </div>

            {/* Description */}
            <div className="bg-[rgba(245,240,232,0.03)] rounded-xl p-4 border border-[rgba(245,240,232,0.06)]">
              <p className="text-sm text-[rgba(245,240,232,0.72)] leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Specifications */}
            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-[#D4AF37] tracking-wider">
                SPECIFICATIONS
              </h3>
              <div className="bg-[rgba(245,240,232,0.02)] rounded-xl border border-[rgba(245,240,232,0.06)] overflow-hidden">
                <div className="p-4 space-y-1">
                  {product.ram && <SpecRow label="RAM" value={product.ram} />}
                  {product.storage && (
                    <SpecRow label="Storage" value={product.storage} />
                  )}
                  {product.processor && (
                    <SpecRow label="Processor" value={product.processor} />
                  )}
                  {product.battery && (
                    <SpecRow label="Battery" value={`${product.battery} mAh`} />
                  )}
                </div>
              </div>
            </div>

            {/* Quantity Selector */}
            {!cartItem && (
              <div className="flex items-center gap-4">
                <span className="text-sm text-[rgba(245,240,232,0.72)]">
                  Quantity:
                </span>
                <div className="flex items-center gap-2 bg-[rgba(245,240,232,0.05)] rounded-lg border border-[rgba(245,240,232,0.1)]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center hover:bg-[rgba(245,240,232,0.1)] rounded-l-lg transition"
                  >
                    -
                  </button>
                  <span className="w-12 text-center text-sm font-medium text-[#F5F0E8]">
                    {quantity}
                  </span>
                  <button
                    onClick={() =>
                      setQuantity(Math.min(product.stock, quantity + 1))
                    }
                    className="w-8 h-8 flex items-center justify-center hover:bg-[rgba(245,240,232,0.1)] rounded-r-lg transition"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons */}

            {!cartItem ? (
              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className={`flex-1 relative py-3.5 px-6 rounded-xl font-semibold text-sm tracking-wide transition-all duration-200 active:scale-[0.98]
        ${
          product.stock === 0
            ? "bg-white/5 text-white/30 cursor-not-allowed"
            : added
              ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
              : "bg-[#D4AF37] text-black hover:bg-[#B8941E] shadow-lg shadow-[#D4AF37]/20"
        }`}
                >
                  <span
                    className={`transition-opacity duration-300 ${added ? "opacity-0" : "opacity-100"}`}
                  >
                    {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                  </span>
                  {added && (
                    <span className="absolute inset-0 flex items-center justify-center font-bold">
                      ✓ Added
                    </span>
                  )}
                </button>

                <button className="w-12 flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 text-white/60 hover:text-[#D4AF37] transition-all duration-200">
                  <span className="text-xl leading-none">♡</span>
                </button>
              </div>
            ) : (
              <div className="w-32 flex items-center bg-white/[0.03] border border-white/10 rounded-xl p-1">
                <button
                  onClick={handleSubtractQuantity}
                  className="flex-1 h-8 flex items-center justify-center text-[#D4AF37] hover:bg-white/5 rounded-lg transition-colors"
                >
                  -
                </button>
                <span className="flex-1 text-center text-white text-sm font-bold">
                  {cartItem.quantity}
                </span>
                <button
                  onClick={handleAddQuantity}
                  className="flex-1 h-8 flex items-center justify-center text-[#D4AF37] hover:bg-white/5 rounded-lg transition-colors"
                >
                  +
                </button>
              </div>
            )}

            {/* Delivery Info */}
            <div className="bg-[rgba(245,240,232,0.02)] rounded-xl p-4 border border-[rgba(245,240,232,0.06)]">
              <div className="flex items-center gap-3 text-sm">
                <svg
                  className="w-5 h-5 text-[#D4AF37]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-[rgba(245,240,232,0.72)]">
                  Free delivery on orders above ₹999
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm mt-2">
                <svg
                  className="w-5 h-5 text-[#D4AF37]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <span className="text-[rgba(245,240,232,0.72)]">
                  Easy returns within 7 days
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
