import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ProductGrid from "../../products/components/ProductGrid";
import { useNavigate } from "react-router-dom";

/* ── Animated counter ─────────────────────────────────── */
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
            if (start >= target) { setVal(target); clearInterval(t); }
            else setVal(start);
          }, 16);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
};

/* ── Category card ────────────────────────────────────── */
const CategoryCard = ({ label, sub, gradient, to }) => (
  <Link
    to={to}
    className="relative overflow-hidden rounded-2xl p-7 flex flex-col justify-end cursor-pointer transition-all duration-300 no-underline"
    style={{
      background: gradient,
      border: "1px solid var(--border-subtle)",
      minHeight: "180px",
    }}
    onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.01)"; e.currentTarget.style.borderColor = "var(--gold)"; }}
    onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.borderColor = "var(--border-subtle)"; }}
  >
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
    <div className="relative">
      <h3 className="text-[20px] font-[Georgia,serif] mb-1 text-white">{label}</h3>
      <p className="text-[13px] text-white/60">{sub}</p>
    </div>
  </Link>
);

const HomePage = () => {
  const [heroVisible, setHeroVisible] = useState(false);
  useEffect(() => { setTimeout(() => setHeroVisible(true), 80); }, []);

  return (
    <div style={{ background: "var(--bg-base)", minHeight: "100vh", color: "var(--text-primary)" }}>

      {/* ═══ HERO ═══ */}
      <section className="min-h-screen relative flex items-center justify-center overflow-hidden" style={{ background: "var(--bg-base)" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 100%, var(--gold-muted) 0%, transparent 70%)" }} />
        <div className="max-w-[860px] mx-auto px-6 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-9"
            style={{ border: "1px solid var(--gold-muted)", background: "var(--gold-muted)" }}
          >
            <span className="w-[6px] h-[6px] rounded-full" style={{ background: "var(--gold)" }} />
            <span className="text-[12px] uppercase tracking-[0.08em] font-semibold" style={{ color: "var(--gold)" }}>
              New Season Collection — 2025
            </span>
          </div>

          <h1
            className="text-[clamp(44px,8vw,92px)] font-[Georgia,serif] leading-[1.05] tracking-[-2px]"
            style={{ color: "var(--text-primary)" }}
          >
            Discover <br />
            <span className="italic" style={{ color: "var(--gold)" }}>Refined</span> Tech
          </h1>

          <p
            className="text-[clamp(16px,2vw,19px)] max-w-[520px] mx-auto mt-5 mb-10 leading-[1.7]"
            style={{ color: "var(--text-secondary)" }}
          >
            Curated collections of the world's finest electronics — phones, laptops, and more.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/products"
              className="px-[32px] py-[14px] rounded-[14px] bg-gradient-to-br from-[#D4AF37] to-[#B8941E] text-[#08080E] font-bold no-underline shadow-[0_0_40px_rgba(212,175,55,0.3)] transition-all hover:shadow-[0_0_60px_rgba(212,175,55,0.4)] active:scale-95"
            >
              Shop the Collection
            </Link>
            <a
              href="#categories"
              className="px-[30px] py-[14px] rounded-[14px] no-underline transition-all"
              style={{ border: "1px solid var(--border-medium)", background: "var(--input-bg)", color: "var(--text-primary)" }}
            >
              Explore Categories
            </a>
          </div>
        </div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <section className="py-12 px-8" style={{ borderTop: "1px solid var(--border-subtle)", borderBottom: "1px solid var(--border-subtle)", background: "var(--input-bg)" }}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-[1100px] mx-auto">
          {[
            { val: 12000, suffix: "+", label: "Premium Products" },
            { val: 98, suffix: "%", label: "Customer Satisfaction" },
            { val: 180, suffix: "+", label: "Brands Available" },
            { val: 50, suffix: "K+", label: "Happy Customers" },
          ].map(({ val, suffix, label }) => (
            <div key={label}>
              <div className="text-[clamp(26px,4vw,40px)] font-normal font-[Georgia,serif] tracking-[-1px]" style={{ color: "var(--gold)" }}>
                <Counter target={val} suffix={suffix} />
              </div>
              <div className="text-[13px] mt-1 tracking-wide" style={{ color: "var(--text-muted)" }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ CATEGORIES ═══ */}
      <section id="categories" className="py-20 px-6 md:px-8 max-w-[1280px] mx-auto">
        <div className="mb-12 text-center md:text-left">
          <p className="text-[12px] font-bold uppercase tracking-[0.12em] mb-2" style={{ color: "var(--gold)" }}>Collections</p>
          <h2 className="text-[clamp(30px,5vw,50px)] font-[Georgia,serif] leading-tight" style={{ color: "var(--text-primary)" }}>
            Browse by <em>Category</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <CategoryCard
            label="Phones"
            sub="Handheld Excellence"
            gradient="linear-gradient(135deg, #0d1117, #1a2744, #0d1b4a)"
            to="/products?category=phone"
          />
          <CategoryCard
            label="Laptops"
            sub="Desktop Power"
            gradient="linear-gradient(135deg, #0d1117, #2c1a44, #1a0d4a)"
            to="/products?category=laptop"
          />
        </div>
      </section>

      {/* ═══ TRENDING PRODUCTS ═══ */}
      <ProductGrid />

      {/* ═══ TRUST BADGES ═══ */}
      <section className="py-16 px-6 md:px-8 max-w-[1100px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: "🚚", title: "Free Delivery", sub: "On orders above ₹999" },
            { icon: "↩", title: "Easy Returns", sub: "7-day return policy" },
            { icon: "🔒", title: "Secure Payment", sub: "100% safe checkout" },
            { icon: "💬", title: "24/7 Support", sub: "Always here to help" },
          ].map(({ icon, title, sub }) => (
            <div
              key={title}
              className="flex flex-col items-center text-center p-5 rounded-2xl"
              style={{ background: "var(--bg-surface)", border: "1px solid var(--border-subtle)" }}
            >
              <span className="text-3xl mb-3">{icon}</span>
              <h4 className="text-sm font-bold mb-1" style={{ color: "var(--text-primary)" }}>{title}</h4>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>{sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ TESTIMONIAL ═══ */}
      <section className="mx-4 md:mx-8 mb-20 rounded-2xl py-16 px-8 md:px-12 text-center" style={{ border: "1px solid var(--gold-muted)", background: "var(--gold-muted)" }}>
        <div className="text-[52px] leading-none mb-4" style={{ color: "var(--gold)", opacity: 0.4 }}>"</div>
        <blockquote className="mx-auto mb-7 max-w-[600px] text-[clamp(17px,2.5vw,24px)] font-[Georgia,serif] italic leading-relaxed" style={{ color: "var(--text-primary)" }}>
          Every piece exceeded my expectations. Quality and attention to detail unmatched anywhere online.
        </blockquote>
        <div className="flex items-center justify-center gap-4">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8941E] flex items-center justify-center text-lg font-bold text-black font-serif">S</div>
          <div className="text-left">
            <div className="text-[14px] font-semibold" style={{ color: "var(--text-primary)" }}>Sofia Marchetti</div>
            <div className="text-[12px]" style={{ color: "var(--text-muted)" }}>Milan, Italy</div>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="px-6 md:px-8 py-14" style={{ borderTop: "1px solid var(--border-subtle)", background: "var(--bg-surface)" }}>
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#F5E090] flex items-center justify-center">
                  <span className="font-black text-[#08080E] text-sm">T</span>
                </div>
                <span className="text-xl font-[Georgia,serif]" style={{ color: "var(--text-primary)" }}>Techly</span>
              </div>
              <p className="text-sm max-w-[220px] leading-relaxed" style={{ color: "var(--text-muted)" }}>
                Curated tech products with a focus on quality and experience.
              </p>
            </div>
            {[
              { title: "Shop", items: ["Phones", "Laptops", "Accessories", "New Arrivals"] },
              { title: "Company", items: ["About", "Careers", "Press", "Blog"] },
              { title: "Support", items: ["Help Center", "Contact", "Returns", "Shipping"] },
            ].map(({ title, items }) => (
              <div key={title}>
                <h4 className="text-xs uppercase tracking-[0.08em] mb-4 font-bold" style={{ color: "var(--text-primary)" }}>{title}</h4>
                <ul className="space-y-2">
                  {items.map(item => (
                    <li key={item} className="text-sm cursor-pointer transition-colors hover:opacity-80" style={{ color: "var(--text-muted)" }}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-6" style={{ borderTop: "1px solid var(--border-subtle)" }}>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>© 2025 Techly. All rights reserved.</p>
            <div className="flex gap-5">
              {["Privacy", "Terms", "Cookies"].map(item => (
                <span key={item} className="text-sm cursor-pointer hover:opacity-80 transition-colors" style={{ color: "var(--text-muted)" }}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
