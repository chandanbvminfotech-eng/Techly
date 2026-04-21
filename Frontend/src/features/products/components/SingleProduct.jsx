import React, { useState } from "react";


const SpecRow = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 py-3 border-b border-white/5 last:border-0 group">
    <span className="text-amber-400/70 text-lg w-6 shrink-0 group-hover:text-amber-400 transition-colors duration-200">
      {icon}
    </span>
    <span className="text-xs font-semibold tracking-widest text-slate-500 uppercase w-20 shrink-0">
      {label}
    </span>
    <span className="text-sm text-slate-200 font-medium ml-auto text-right">
      {value}
    </span>
  </div>
);

const StockBadge = ({ stock }) => {
  const low = stock <= 5;
  const out = stock === 0;
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full tracking-wide
        ${
          out
            ? "bg-red-500/15 text-red-400 border border-red-500/25"
            : low
              ? "bg-amber-500/15 text-amber-400 border border-amber-500/25"
              : "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25"
        }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${out ? "bg-red-400" : low ? "bg-amber-400" : "bg-emerald-400"}`}
      />
      {out ? "Out of Stock" : low ? `Only ${stock} left` : "In Stock"}
    </span>
  );
};


const SingleProduct = ({ product }) => {
  const [activeImg, setActiveImg] = useState(0);
  const [added, setAdded] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const images = product.images?.length ? product.images : [{ url: "" }];

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <>

      <link
        href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap"
        rel="stylesheet"
      />

      <div className="min-h-screen bg-[#0C0D11] text-white font-['DM_Sans',system-ui,sans-serif] px-4 py-12 md:py-16">
        {/* ── breadcrumb ─────────────────────────────── */}
        <nav className="max-w-6xl mx-auto mb-10 flex items-center gap-2 text-xs text-slate-600 tracking-wider uppercase">
          <span className="hover:text-amber-400 cursor-pointer transition-colors">
            Home
          </span>
          <span>/</span>
          <span className="hover:text-amber-400 cursor-pointer transition-colors">
            Phones
          </span>
          <span>/</span>
          <span className="text-slate-400">{product.name}</span>
        </nav>

        {/* ── main grid ──────────────────────────────── */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-8 lg:gap-14 items-start">
          {/* ════ LEFT — Image Gallery ════════════════ */}
          <div className="flex flex-col gap-4">
            {/* Main image */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800/60 to-slate-900 border border-white/[0.06] aspect-[4/3] flex items-center justify-center group">
              {/* Ambient glow behind image */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/[0.04] via-transparent to-blue-500/[0.04] pointer-events-none" />

              <img
                src={images[activeImg]?.url}
                alt={product.name}
                onLoad={() => setImgLoaded(true)}
                className={`max-h-72 w-auto object-contain relative z-10 transition-all duration-500
                  group-hover:scale-105 drop-shadow-[0_20px_60px_rgba(0,0,0,0.8)]
                  ${imgLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              />

              {/* Brand watermark */}
              <span className="absolute top-4 left-5 text-[10px] font-bold tracking-[0.2em] text-white/10 uppercase">
                {product.brand}
              </span>

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-400/40" />
              </div>
            </div>

            {/* Thumbnail strip */}
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-200 shrink-0
                      ${
                        activeImg === i
                          ? "border-amber-400 shadow-[0_0_16px_rgba(251,191,36,0.35)]"
                          : "border-white/[0.07] hover:border-white/20"
                      }`}
                  >
                    <img
                      src={img.url}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ════ RIGHT — Product Details ═════════════ */}
          <div className="flex flex-col gap-6">
            {/* Brand + Name */}
            <div>
              <p className="text-xs font-bold tracking-[0.2em] text-amber-400/80 uppercase mb-2">
                {product.brand}
              </p>
              <h1
                className="text-3xl md:text-4xl font-['Syne',system-ui,sans-serif] font-700 text-white leading-[1.1] tracking-tight mb-4"
                style={{ fontWeight: 700 }}
              >
                {product.name}
              </h1>
              <div className="flex items-center gap-3 flex-wrap">
                <StockBadge stock={product.stock} />
                <span className="text-xs text-slate-600">•</span>
                <span className="text-xs text-slate-500 tracking-wide">
                  SKU: #{Math.random().toString(36).slice(2, 8).toUpperCase()}
                </span>
              </div>
            </div>

            {/* Price block */}
            <div className="flex items-baseline gap-3">
              <span
                className="text-4xl font-['Syne',system-ui,sans-serif] font-800 text-white tracking-tight"
                style={{ fontWeight: 800 }}
              >
                ₹{Number(product.price).toLocaleString("en-IN")}
              </span>
              <span className="text-sm text-slate-500 line-through">
                ₹
                {(Number(product.price) * 1.12).toLocaleString("en-IN", {
                  maximumFractionDigits: 0,
                })}
              </span>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                12% OFF
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-slate-400 leading-relaxed border-l-2 border-amber-400/30 pl-4">
              {product.description}
            </p>

            {/* Specs grid */}
            <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden">
              <div className="px-5 py-3 border-b border-white/[0.06] bg-white/[0.02]">
                <span className="text-[10px] font-bold tracking-[0.18em] text-slate-500 uppercase">
                  Specifications
                </span>
              </div>
              <div className="px-5 py-1">
                {product.ram && (
                  <SpecRow icon="⚡" label="RAM" value={product.ram} />
                )}
                {product.storage && (
                  <SpecRow icon="💾" label="Storage" value={product.storage} />
                )}
                {product.processor && (
                  <SpecRow
                    icon="🔲"
                    label="Processor"
                    value={product.processor}
                  />
                )}
                {product.battery && (
                  <SpecRow
                    icon="🔋"
                    label="Battery"
                    value={`${product.battery} mAh`}
                  />
                )}
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex gap-3 pt-1">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`flex-1 relative overflow-hidden py-4 px-6 rounded-xl font-bold text-sm tracking-wide
                  transition-all duration-300 active:scale-95
                  ${
                    product.stock === 0
                      ? "bg-slate-800 text-slate-600 cursor-not-allowed"
                      : added
                        ? "bg-emerald-500 text-white shadow-[0_0_30px_rgba(16,185,129,0.4)]"
                        : "bg-amber-400 text-slate-950 hover:bg-amber-300 shadow-[0_0_30px_rgba(251,191,36,0.3)] hover:shadow-[0_0_40px_rgba(251,191,36,0.5)]"
                  }`}
              >
                <span
                  className={`transition-all duration-300 ${added ? "opacity-0 scale-75" : "opacity-100 scale-100"}`}
                >
                  {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                </span>
                {added && (
                  <span className="absolute inset-0 flex items-center justify-center text-white font-bold">
                    ✓ Added!
                  </span>
                )}
              </button>

              {/* Wishlist */}
              <button className="w-14 rounded-xl border border-white/10 bg-white/[0.03] hover:border-amber-400/40 hover:bg-amber-400/[0.06] hover:text-amber-400 text-slate-500 transition-all duration-200 flex items-center justify-center text-lg">
                ♡
              </button>

              {/* Share */}
              <button className="w-14 rounded-xl border border-white/10 bg-white/[0.03] hover:border-white/20 text-slate-500 hover:text-slate-300 transition-all duration-200 flex items-center justify-center text-base">
                ↗
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 pt-1">
              {[
                {
                  icon: "🚚",
                  label: "Free Delivery",
                  sub: "Orders above ₹999",
                },
                {
                  icon: "↩️",
                  label: "Easy Returns",
                  sub: "7-day return policy",
                },
                { icon: "🔒", label: "Secure Pay", sub: "256-bit encryption" },
              ].map(({ icon, label, sub }) => (
                <div
                  key={label}
                  className="flex flex-col items-center text-center gap-1.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-amber-400/20 hover:bg-amber-400/[0.03] transition-all duration-200"
                >
                  <span className="text-xl">{icon}</span>
                  <span className="text-[11px] font-semibold text-slate-300">
                    {label}
                  </span>
                  <span className="text-[10px] text-slate-600 leading-tight">
                    {sub}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
