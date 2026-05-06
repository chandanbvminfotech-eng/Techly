import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addItemCart, deleteSingleItemCart, updateCartQuantity } from "../../cart/cartSlice";
import { useDispatch } from "react-redux";

const SpecRow = ({ label, value }) => (
  <div className="flex items-center gap-3 py-3 last:border-0" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
    <span className="text-xs font-bold tracking-wider uppercase w-24" style={{ color: "var(--text-muted)" }}>{label}</span>
    <span className="text-sm font-semibold ml-auto text-right" style={{ color: "var(--text-primary)" }}>{value}</span>
  </div>
);

const StockBadge = ({ stock }) => {
  const low = stock <= 5;
  const out = stock === 0;
  return (
    <span className={`inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full ${
      out ? "bg-red-500/10 text-red-400 border border-red-500/20"
          : low ? "bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20"
               : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
    }`}>
      <span className={`w-1.5 h-1.5 rounded-full ${out ? "bg-red-400" : low ? "bg-[#D4AF37]" : "bg-emerald-400"}`} />
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
  const cartItem = cart?.items?.find((item) => item.productId.id === product._id);

  const handleAddToCart = async () => {
    if (!user) {
      localStorage.setItem("redirectAfterLogin", `/products/${product._id}`);
      navigate("/signin", { state: { from: `/products/${product._id}` } });
      return;
    }
    try {
      await dispatch(addItemCart({ productId: product._id, quantity }));
      setAdded(true);
      setTimeout(() => setAdded(false), 2200);
    } catch {}
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
    <div className="min-h-screen font-['DM_Sans',system-ui,sans-serif]" style={{ background: "var(--bg-base)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-xs font-medium flex-wrap">
          <Link to="/" className="transition-colors hover:opacity-80" style={{ color: "var(--text-muted)" }}>Home</Link>
          <span style={{ color: "var(--text-muted)" }}>›</span>
          <Link to="/products" className="transition-colors hover:opacity-80" style={{ color: "var(--text-muted)" }}>Products</Link>
          <span style={{ color: "var(--text-muted)" }}>›</span>
          <span style={{ color: "var(--text-secondary)" }}>{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="relative group rounded-2xl overflow-hidden" style={{ background: "var(--bg-surface)", border: "1px solid var(--border-subtle)" }}>
              <div className="aspect-square flex items-center justify-center p-6 sm:p-10">
                <img
                  src={images[activeImg]?.url}
                  alt={product.name}
                  onLoad={() => setImgLoaded(true)}
                  className={`max-w-full max-h-full object-contain transition-all duration-500 group-hover:scale-105 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
                />
              </div>
              {images.length > 1 && (
                <div className="absolute bottom-4 right-4 px-2 py-1 rounded-lg text-xs font-medium backdrop-blur-sm"
                  style={{ background: "var(--bg-card)", color: "var(--text-secondary)", border: "1px solid var(--border-subtle)" }}>
                  {activeImg + 1} / {images.length}
                </div>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className="relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all"
                    style={{ borderColor: activeImg === i ? "var(--gold)" : "var(--border-subtle)" }}
                  >
                    <img src={img.url} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-5">
            {/* Brand + name */}
            <div>
              <div className="inline-block px-3 py-1 rounded-full mb-3" style={{ background: "var(--gold-muted)" }}>
                <span className="text-xs font-bold tracking-wider" style={{ color: "var(--gold)" }}>{product.brand}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-3" style={{ color: "var(--text-primary)" }}>
                {product.name}
              </h1>
              <StockBadge stock={product.stock} />
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 pb-4" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
              <span className="text-3xl md:text-4xl font-bold" style={{ color: "var(--text-primary)" }}>
                ₹{Number(product.price).toLocaleString("en-IN")}
              </span>
              <span className="text-base line-through" style={{ color: "var(--text-muted)" }}>
                ₹{(Number(product.price) * 1.12).toLocaleString("en-IN", { maximumFractionDigits: 0 })}
              </span>
              <span className="text-xs font-bold px-2 py-1 rounded" style={{ color: "var(--gold)", background: "var(--gold-muted)" }}>
                12% OFF
              </span>
            </div>

            {/* Description */}
            <div className="rounded-xl p-4" style={{ background: "var(--input-bg)", border: "1px solid var(--border-subtle)" }}>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{product.description}</p>
            </div>

            {/* Specs */}
            {(product.ram || product.storage || product.processor || product.battery) && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "var(--gold)" }}>Specifications</h3>
                <div className="rounded-xl overflow-hidden" style={{ background: "var(--input-bg)", border: "1px solid var(--border-subtle)" }}>
                  <div className="p-3">
                    {product.ram && <SpecRow label="RAM" value={product.ram} />}
                    {product.storage && <SpecRow label="Storage" value={product.storage} />}
                    {product.processor && <SpecRow label="Processor" value={product.processor} />}
                    {product.battery && <SpecRow label="Battery" value={`${product.battery} mAh`} />}
                  </div>
                </div>
              </div>
            )}

            {/* Quantity */}
            {!cartItem && (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>Qty:</span>
                <div className="flex items-center gap-1 rounded-lg overflow-hidden" style={{ border: "1px solid var(--border-subtle)", background: "var(--input-bg)" }}>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-9 h-9 flex items-center justify-center text-lg transition-colors hover:opacity-70"
                    style={{ color: "var(--text-primary)" }}
                  >−</button>
                  <span className="w-10 text-center text-sm font-bold" style={{ color: "var(--text-primary)" }}>{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-9 h-9 flex items-center justify-center text-lg transition-colors hover:opacity-70"
                    style={{ color: "var(--text-primary)" }}
                  >+</button>
                </div>
              </div>
            )}

            {/* Actions */}
            {!cartItem ? (
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1 relative py-4 px-6 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 active:scale-[0.98] disabled:opacity-40"
                  style={{
                    background: added ? "#10b981" : "var(--gold)",
                    color: "#08080E",
                  }}
                >
                  <span className={`transition-opacity duration-300 ${added ? "opacity-0" : "opacity-100"}`}>
                    {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                  </span>
                  {added && (
                    <span className="absolute inset-0 flex items-center justify-center font-bold">✓ Added!</span>
                  )}
                </button>
                <button className="w-12 flex items-center justify-center rounded-xl transition-all duration-200" style={{ border: "1px solid var(--border-subtle)", background: "var(--input-bg)", color: "var(--text-muted)" }}>
                  ♡
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>In cart:</span>
                <div className="flex items-center rounded-xl overflow-hidden" style={{ border: "1px solid var(--border-subtle)", background: "var(--input-bg)" }}>
                  <button onClick={handleSubtractQuantity} className="w-10 h-10 flex items-center justify-center transition-colors" style={{ color: "var(--gold)" }}>−</button>
                  <span className="w-10 text-center font-bold text-sm" style={{ color: "var(--text-primary)" }}>{cartItem.quantity}</span>
                  <button onClick={handleAddQuantity} className="w-10 h-10 flex items-center justify-center transition-colors" style={{ color: "var(--gold)" }}>+</button>
                </div>
              </div>
            )}

            {/* Delivery info */}
            <div className="rounded-xl p-4 space-y-2" style={{ background: "var(--input-bg)", border: "1px solid var(--border-subtle)" }}>
              {[
                { icon: "✓", text: "Free delivery on orders above ₹999" },
                { icon: "↩", text: "Easy returns within 7 days" },
                { icon: "🔒", text: "Secure checkout" },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-sm">
                  <span style={{ color: "var(--gold)" }}>{icon}</span>
                  <span style={{ color: "var(--text-secondary)" }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
