import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ProductPage from "../../products/pages/ProductPage";

/* ── tiny animated counter ───────────────────────────── */
const Counter = ({ target, suffix = "" }) => {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          let start = 0;
          const step = Math.ceil(target / 60);
          const t = setInterval(() => {
            start += step;
            if (start >= target) {
              setVal(target);
              clearInterval(t);
            } else setVal(start);
          }, 16);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);
  return (
    <span ref={ref}>
      {val.toLocaleString()}
      {suffix}
    </span>
  );
};

/* ── product card ─────────────────────────────────────── */
const ProductCard = ({ name, category, price, badge, gradient }) => {
  return (
    <div
      className="
      bg-[rgba(255,255,255,0.03)]
      border border-[rgba(255,255,255,0.08)]
      rounded-[20px] overflow-hidden
      transition-all duration-300
      hover:-translate-y-[6px]
      hover:border-[rgba(212,175,55,0.35)]
      hover:shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_30px_rgba(212,175,55,0.08)]
      shadow-[0_4px_20px_rgba(0,0,0,0.3)]
      cursor-pointer
      group
    "
    >
      <div
        className="h-[220px] flex items-center justify-center relative"
        style={{ background: gradient }}
      >
        {badge && (
          <span
            className="
            absolute top-[14px] left-[14px]
            bg-[rgba(212,175,55,0.9)] text-[#08080E]
            text-[11px] font-bold px-[10px] py-[4px]
            rounded-[6px] uppercase tracking-[0.05em]
          "
          >
            {badge}
          </span>
        )}

        <div
          className="
          w-[80px] h-[80px] rounded-full
          bg-[rgba(255,255,255,0.12)] backdrop-blur-md
          flex items-center justify-center
          transition-transform duration-300
          group-hover:scale-110
        "
        >
          <svg
            width="34"
            height="34"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(245,240,232,0.9)"
            strokeWidth="1.5"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
        </div>
      </div>

      <div className="px-[22px] py-[20px]">
        <p className="text-[11px] font-semibold text-[#D4AF37] uppercase tracking-[0.08em] mb-1">
          {category}
        </p>

        <h3 className="text-[17px] text-[#F5F0E8] mb-4 font-serif">{name}</h3>

        <div className="flex items-center justify-between">
          <span className="text-[20px] font-semibold">${price}</span>

          <button
            className="
            px-[18px] py-[8px] rounded-[9px]
            text-[13px] font-semibold
            border border-[rgba(255,255,255,0.1)]
            bg-[rgba(255,255,255,0.06)]
            text-[#F5F0E8]
            transition-all duration-200
            group-hover:bg-gradient-to-br group-hover:from-[#D4AF37] group-hover:to-[#B8941E]
            group-hover:text-[#08080E]
            group-hover:border-transparent
          "
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

/* ── category bento cell ──────────────────────────────── */
const BentoCell = ({ label, sub, gradient, span = 1, tall = false }) => {
  return (
    <div
      className={`
        relative overflow-hidden rounded-[20px] p-[28px]
        cursor-pointer transition-all duration-300
        border border-[rgba(255,255,255,0.07)]
        hover:border-[rgba(212,175,55,0.3)]
        hover:scale-[1.01]
        hover:shadow-[0_8px_40px_rgba(0,0,0,0.5)]
        flex flex-col justify-end
      `}
      style={{
        background: gradient,
        gridColumn: `span ${span}`,
        gridRow: tall ? "span 2" : "span 1",
        minHeight: tall ? "300px" : "140px",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

      <div className="relative">
        <h3 className="text-[20px] text-[#F5F0E8] font-serif mb-1">{label}</h3>
        <p className="text-[13px] text-[rgba(245,240,232,0.6)]">{sub}</p>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════ */
const HomePage = () => {
  const [heroVisible, setHeroVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 80);
  }, []);

  const products = [
    {
      name: "Obsidian Chronograph",
      category: "Watches",
      price: "1,290",
      badge: "New",
      gradient: "linear-gradient(135deg,#1a1a2e,#16213e,#0f3460)",
    },
    {
      name: "Midnight Leather Tote",
      category: "Bags",
      price: "480",
      badge: "Trending",
      gradient: "linear-gradient(135deg,#2d1b0e,#4a2c0a,#6b3a0d)",
    },
    {
      name: "Crystal Eau de Parfum",
      category: "Fragrance",
      price: "220",
      badge: null,
      gradient: "linear-gradient(135deg,#0d1f0d,#1a3a1a,#0a2810)",
    },
    {
      name: "Silk Cashmere Wrap",
      category: "Apparel",
      price: "340",
      badge: "Limited",
      gradient: "linear-gradient(135deg,#1c0a2e,#2e1050,#3d1470)",
    },
    {
      name: "Titanium Pen Set",
      category: "Accessories",
      price: "185",
      badge: null,
      gradient: "linear-gradient(135deg,#1a1a1a,#2a2a2a,#1a1a1a)",
    },
    {
      name: "Amalfi Silk Scarf",
      category: "Apparel",
      price: "290",
      badge: "Sale",
      gradient: "linear-gradient(135deg,#1a0a0a,#2e0f0f,#3d1414)",
    },
  ];

  return (
    <div
      style={{ background: "#08080E", minHeight: "100vh", color: "#F5F0E8" }}
    >
      {/* ── Google Font Import ──────────────────────────── */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap"
        rel="stylesheet"
      />

      {/* ═══ HERO ═══════════════════════════════════════ */}
      <section
        className="
  min-h-screen relative flex items-center justify-center overflow-hidden
  bg-[#08080E]
"
      >
        {/* gradient background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(212,175,55,0.06)_0%,transparent_70%)]" />

        {/* content */}
        <div
          className="
    max-w-[900px] mx-auto px-8 text-center
    transition-all duration-700
  "
        >
          <div
            className="
      inline-flex items-center gap-2
      px-4 py-1.5 rounded-full
      border border-[rgba(212,175,55,0.25)]
      bg-[rgba(212,175,55,0.07)]
      mb-9
    "
          >
            <span className="w-[6px] h-[6px] bg-[#D4AF37] rounded-full" />
            <span className="text-[12px] uppercase tracking-[0.08em] text-[#D4AF37] font-semibold">
              New Season Collection — 2025
            </span>
          </div>

          <h1 className="text-[clamp(48px,8vw,96px)] font-serif leading-[1.05] tracking-[-2px]">
            Discover <br />
            <span className="italic text-[#D4AF37]">Refined</span> Luxury
          </h1>

          <p
            className="
      text-[clamp(16px,2vw,20px)]
      text-[rgba(245,240,232,0.55)]
      max-w-[560px] mx-auto mt-6 mb-11 leading-[1.7]
    "
          >
            Curated collections of the world's finest goods...
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/signup"
              className="
          px-[36px] py-[15px] rounded-[14px]
          bg-gradient-to-br from-[#D4AF37] to-[#B8941E]
          text-[#08080E] font-bold
          shadow-[0_0_40px_rgba(212,175,55,0.3)]
        "
            >
              Shop the Collection
            </Link>

            <a
              href="#trending"
              className="
          px-[34px] py-[15px] rounded-[14px]
          border border-[rgba(245,240,232,0.18)]
          bg-[rgba(255,255,255,0.04)]
        "
            >
              Explore Trending
            </a>
          </div>
        </div>
      </section>

      {/* ═══ STATS BAR ══════════════════════════════════ */}
      <section className="border-y border-white/10 py-12 px-8 bg-white/[0.015]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-8 text-center max-w-[1100px] mx-auto">
          {[
            { val: 12000, suffix: "+", label: "Premium Products" },
            { val: 98, suffix: "%", label: "Customer Satisfaction" },
            { val: 180, suffix: "+", label: "Countries Served" },
            { val: 50, suffix: "K+", label: "Happy Clients" },
          ].map(({ val, suffix, label }) => (
            <div key={label}>
              <div className="text-[clamp(28px,4vw,42px)] font-normal text-[#D4AF37] font-serif tracking-[-1px]">
                <Counter target={val} suffix={suffix} />
              </div>
              <div className="text-[13px] text-white/40 font-sans mt-1 tracking-wide">
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ BENTO CATEGORIES ═══════════════════════════ */}
      <section
        id="categories"
        className="py-[100px] px-8 max-w-[1280px] mx-auto"
      >
        <div className="mb-14">
          <p className="text-[12px] font-bold text-[#D4AF37] tracking-[0.12em] uppercase mb-2 font-sans">
            Collections
          </p>
          <h2 className="text-[clamp(32px,5vw,52px)] font-normal text-[#F5F0E8] tracking-[-1px] leading-tight font-serif">
            Browse by <br />
            <em>Category</em>
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-4 auto-rows-auto">
          <BentoCell
            label="Timepieces"
            sub="Swiss craftsmanship"
            gradient="linear-gradient(135deg,#0d1117,#1a2744,#0d1b4a)"
            tall
          />
          <BentoCell
            label="Fine Leather"
            sub="Italian artisans"
            gradient="linear-gradient(135deg,#1a0f06,#3d1f08,#5a2e0a)"
          />
          <BentoCell
            label="Fragrance"
            sub="Maison exclusives"
            gradient="linear-gradient(135deg,#060d0a,#0d2418,#0a3020)"
          />
          <BentoCell
            label="Apparel"
            sub="Seasonal essentials"
            gradient="linear-gradient(135deg,#130a1f,#241040,#1a0a3a)"
          />
          <BentoCell
            label="Fine Jewellery"
            sub="18k & precious stones"
            gradient="linear-gradient(135deg,#1a1508,#3a2e08,#4a3a0a)"
            span={2}
          />
        </div>
      </section>

      {/* ═══ TRENDING PRODUCTS ══════════════════════════ */}
      <ProductPage/>

      {/* ═══ TESTIMONIAL ════════════════════════════════ */}
      <section className="mx-8 mb-[100px] rounded-2xl border border-[#D4AF37]/20 bg-gradient-to-br from-[#D4AF37]/10 to-indigo-500/5 py-20 px-12 text-center">
        <div className="text-[56px] text-[#D4AF37]/40 font-serif leading-none mb-6">
          "
        </div>

        <blockquote className="mx-auto mb-8 max-w-[660px] text-[clamp(18px,2.5vw,26px)] text-white/85 font-serif italic leading-relaxed tracking-tight">
          Every piece I've received has exceeded my expectations. The attention
          to detail and quality is unmatched anywhere online.
        </blockquote>

        <div className="flex items-center justify-center gap-4">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8941E] flex items-center justify-center text-lg font-bold text-black font-serif">
            S
          </div>

          <div className="text-left">
            <div className="text-[15px] font-semibold text-[#F5F0E8] font-sans">
              Sofia Marchetti
            </div>
            <div className="text-[13px] text-white/40 font-sans">
              Milan, Italy
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═════════════════════════════════════ */}
      <footer className="border-t border-white/10 bg-[rgba(4,4,8,0.8)] px-8 py-16">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-14">
            {/* brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#F5E090] flex items-center justify-center">
                  <span className="font-black text-[#08080E]">L</span>
                </div>
                <span className="text-xl font-serif">Techly</span>
              </div>

              <p className="text-sm text-white/50 max-w-[240px]">
                The world's most refined selection...
              </p>
            </div>

            {/* links */}
            {["Shop", "Company", "Support"].map((title) => (
              <div key={title}>
                <h4 className="text-xs uppercase tracking-[0.08em] mb-4 text-white">
                  {title}
                </h4>

                <ul className="space-y-2 text-sm text-white/50">
                  <li className="hover:text-[#D4AF37] cursor-pointer">Item</li>
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-6 flex justify-between flex-wrap text-sm text-white/40">
            <p>© 2025 Techly</p>
            <div className="flex gap-5">
              <span>Privacy</span>
              <span>Terms</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
