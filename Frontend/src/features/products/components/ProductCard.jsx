import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { addItemCart, deleteSingleItemCart, updateCartQuantity } from "../../cart/cartSlice";
import { useDispatch } from "react-redux";

const ProductCard = ({ product, cart, user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItem = cart?.items?.find((item) => item.productId.id === product._id);

  const handleAddToCart = async () => {
    await dispatch(addItemCart({ productId: product._id, quantity: 1 }));
  };
  const handleAddQuantity = async () => {
    await dispatch(updateCartQuantity({ productId: cartItem.productId._id, quantity: cartItem.quantity + 1 }));
  };
  const handleSubtractQuantity = async () => {
    if (cartItem.quantity === 1) {
      await dispatch(deleteSingleItemCart({ productId: cartItem.productId._id }));
    } else {
      await dispatch(updateCartQuantity({ productId: cartItem.productId._id, quantity: cartItem.quantity - 1 }));
    }
  };

  return (
    <div
      className="group relative rounded-2xl overflow-hidden flex flex-col transition-all duration-250"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-subtle)",
        boxShadow: "var(--shadow-card)",
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = "var(--gold)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.borderColor = "var(--border-subtle)"; }}
    >
      {/* Image */}
      <Link to={`/products/${product._id}`} className="block relative overflow-hidden" style={{ aspectRatio: "1/1" }}>
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: "linear-gradient(135deg, var(--gold-muted) 0%, transparent 60%)" }}
        />
        <img
          src={product.images?.[0]?.url}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Out of stock badge */}
        {product.stock === 0 && (
          <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.5)" }}>
            <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full" style={{ background: "var(--bg-surface)", color: "var(--text-muted)" }}>
              Out of Stock
            </span>
          </div>
        )}
      </Link>

      {/* Info */}
      <div className="flex flex-col flex-1 p-4">
        <Link to={`/products/${product._id}`} className="block mb-1 no-underline">
          <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color: "var(--gold)" }}>
            {product.brand}
          </p>
          <h3 className="text-[14px] font-semibold line-clamp-2 leading-snug" style={{ color: "var(--text-primary)" }}>
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-1 mb-3">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg key={star} width="11" height="11" viewBox="0 0 24 24" fill={star <= Math.round(product.ratings?.avg || 0) ? "#D4AF37" : "none"} stroke="#D4AF37" strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ))}
          </div>
          <span className="text-[10px] font-medium" style={{ color: "var(--text-muted)" }}>
            {product.ratings?.avg ? product.ratings.avg.toFixed(1) : "—"}
          </span>
        </div>

        {/* Price + Add to cart */}
        <div className="flex items-center justify-between mt-auto pt-3" style={{ borderTop: "1px solid var(--border-subtle)" }}>
          <div>
            <span className="text-[15px] font-bold" style={{ color: "var(--text-primary)" }}>
              ₹{Number(product.price).toLocaleString("en-IN")}
            </span>
          </div>

          {user ? (
            cartItem ? (
              <div className="flex items-center rounded-full p-0.5" style={{ background: "var(--input-bg)", border: "1px solid var(--border-subtle)" }}>
                <button
                  className="w-7 h-7 flex items-center justify-center rounded-full text-lg font-light transition-colors"
                  style={{ color: "var(--gold)" }}
                  onClick={handleSubtractQuantity}
                >−</button>
                <span className="px-2 text-sm font-bold min-w-[24px] text-center" style={{ color: "var(--text-primary)" }}>
                  {cartItem.quantity}
                </span>
                <button
                  className="w-7 h-7 flex items-center justify-center rounded-full text-lg font-light transition-colors"
                  style={{ color: "var(--gold)" }}
                  onClick={handleAddQuantity}
                >+</button>
              </div>
            ) : (
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-all duration-200 disabled:opacity-40"
                style={{
                  background: "var(--gold-muted)",
                  color: "var(--gold)",
                  border: "1px solid var(--gold)",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "var(--gold)"; e.currentTarget.style.color = "#08080E"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "var(--gold-muted)"; e.currentTarget.style.color = "var(--gold)"; }}
              >
                Add
              </button>
            )
          ) : (
            <button
              onClick={() => navigate("/signin")}
              className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-all duration-200"
              style={{
                background: "var(--gold-muted)",
                color: "var(--gold)",
                border: "1px solid var(--gold)",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "var(--gold)"; e.currentTarget.style.color = "#08080E"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "var(--gold-muted)"; e.currentTarget.style.color = "var(--gold)"; }}
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
