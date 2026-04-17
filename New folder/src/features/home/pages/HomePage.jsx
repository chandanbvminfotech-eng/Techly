import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

/* ── tiny animated counter ───────────────────────────── */
const Counter = ({ target, suffix = "" }) => {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
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
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
};

/* ── product card ─────────────────────────────────────── */
const ProductCard = ({ name, category, price, badge, gradient }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${hovered ? "rgba(212,175,55,0.35)" : "rgba(255,255,255,0.08)"}`,
        borderRadius: "20px", overflow: "hidden",
        transition: "all 0.35s cubic-bezier(.25,.8,.25,1)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? "0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(212,175,55,0.08)" : "0 4px 20px rgba(0,0,0,0.3)",
        cursor: "pointer",
      }}
    >
      <div style={{
        height: "220px",
        background: gradient,
        position: "relative",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {badge && (
          <span style={{
            position: "absolute", top: "14px", left: "14px",
            background: "rgba(212,175,55,0.9)", color: "#08080E",
            fontSize: "11px", fontWeight: "700", padding: "4px 10px",
            borderRadius: "6px", fontFamily: "'DM Sans',system-ui,sans-serif",
            letterSpacing: "0.05em", textTransform: "uppercase",
          }}>{badge}</span>
        )}
        <div style={{
          width: "80px", height: "80px", borderRadius: "50%",
          background: "rgba(255,255,255,0.12)", backdropFilter: "blur(10px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          transform: hovered ? "scale(1.1)" : "scale(1)", transition: "transform 0.35s ease",
        }}>
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="rgba(245,240,232,0.9)" strokeWidth="1.5" strokeLinecap="round">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
        </div>
      </div>
      <div style={{ padding: "20px 22px 22px" }}>
        <p style={{ margin: "0 0 4px", fontSize: "11px", fontWeight: "600", color: "#D4AF37", fontFamily: "'DM Sans',system-ui,sans-serif", letterSpacing: "0.08em", textTransform: "uppercase" }}>{category}</p>
        <h3 style={{ margin: "0 0 14px", fontSize: "17px", fontWeight: "500", color: "#F5F0E8", fontFamily: "Georgia,'Times New Roman',serif", letterSpacing: "-0.2px" }}>{name}</h3>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: "20px", fontWeight: "600", color: "#F5F0E8", fontFamily: "'DM Sans',system-ui,sans-serif" }}>${price}</span>
          <button style={{
            padding: "8px 18px", borderRadius: "9px",
            background: hovered ? "linear-gradient(135deg,#D4AF37,#B8941E)" : "rgba(255,255,255,0.06)",
            border: hovered ? "none" : "1px solid rgba(255,255,255,0.1)",
            color: hovered ? "#08080E" : "#F5F0E8",
            fontSize: "13px", fontWeight: "600", cursor: "pointer",
            fontFamily: "'DM Sans',system-ui,sans-serif",
            transition: "all 0.25s ease",
          }}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

/* ── category bento cell ──────────────────────────────── */
const BentoCell = ({ label, sub, gradient, span = 1, tall = false }) => {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        gridColumn: `span ${span}`,
        gridRow: tall ? "span 2" : "span 1",
        background: gradient,
        borderRadius: "20px",
        padding: "28px 28px",
        cursor: "pointer",
        border: `1px solid ${hov ? "rgba(212,175,55,0.3)" : "rgba(255,255,255,0.07)"}`,
        transition: "all 0.3s ease",
        transform: hov ? "scale(1.01)" : "scale(1)",
        boxShadow: hov ? "0 8px 40px rgba(0,0,0,0.5)" : "none",
        position: "relative", overflow: "hidden",
        minHeight: tall ? "300px" : "140px",
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
      }}
    >
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
        background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)",
      }}/>
      <div style={{ position: "relative" }}>
        <h3 style={{ margin: "0 0 4px", fontSize: "20px", fontWeight: "500", color: "#F5F0E8", fontFamily: "Georgia,'Times New Roman',serif" }}>{label}</h3>
        <p style={{ margin: 0, fontSize: "13px", color: "rgba(245,240,232,0.6)", fontFamily: "'DM Sans',system-ui,sans-serif" }}>{sub}</p>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════ */
const HomePage = () => {
  const [heroVisible, setHeroVisible] = useState(false);
  useEffect(() => { setTimeout(() => setHeroVisible(true), 80); }, []);

  const products = [
    { name: "Obsidian Chronograph", category: "Watches", price: "1,290", badge: "New", gradient: "linear-gradient(135deg,#1a1a2e,#16213e,#0f3460)" },
    { name: "Midnight Leather Tote", category: "Bags", price: "480", badge: "Trending", gradient: "linear-gradient(135deg,#2d1b0e,#4a2c0a,#6b3a0d)" },
    { name: "Crystal Eau de Parfum", category: "Fragrance", price: "220", badge: null, gradient: "linear-gradient(135deg,#0d1f0d,#1a3a1a,#0a2810)" },
    { name: "Silk Cashmere Wrap", category: "Apparel", price: "340", badge: "Limited", gradient: "linear-gradient(135deg,#1c0a2e,#2e1050,#3d1470)" },
    { name: "Titanium Pen Set", category: "Accessories", price: "185", badge: null, gradient: "linear-gradient(135deg,#1a1a1a,#2a2a2a,#1a1a1a)" },
    { name: "Amalfi Silk Scarf", category: "Apparel", price: "290", badge: "Sale", gradient: "linear-gradient(135deg,#1a0a0a,#2e0f0f,#3d1414)" },
  ];

  return (
    <div style={{ background: "#08080E", minHeight: "100vh", color: "#F5F0E8" }}>
      {/* ── Google Font Import ──────────────────────────── */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap" rel="stylesheet" />

      {/* ═══ HERO ═══════════════════════════════════════ */}
      <section style={{
        minHeight: "100vh", position: "relative", display: "flex",
        alignItems: "center", justifyContent: "center",
        overflow: "hidden",
        background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(212,175,55,0.06) 0%, transparent 70%), #08080E",
      }}>
        {/* Decorative orbs */}
        <div style={{ position:"absolute", top:"20%", left:"10%", width:"400px", height:"400px", borderRadius:"50%", background:"radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)", filter:"blur(40px)", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", bottom:"10%", right:"5%", width:"600px", height:"600px", borderRadius:"50%", background:"radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)", filter:"blur(60px)", pointerEvents:"none" }}/>

        {/* Grid overlay */}
        <div style={{
          position:"absolute", inset:0, pointerEvents:"none",
          backgroundImage:"linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)",
          backgroundSize:"60px 60px", opacity:0.6,
        }}/>

        <div style={{
          maxWidth:"900px", margin:"0 auto", padding:"0 32px", textAlign:"center",
          opacity: heroVisible ? 1 : 0,
          transform: heroVisible ? "translateY(0)" : "translateY(28px)",
          transition: "opacity 0.9s ease, transform 0.9s ease",
        }}>
          <div style={{
            display:"inline-flex", alignItems:"center", gap:"8px",
            padding:"6px 16px 6px 8px", borderRadius:"100px",
            border:"1px solid rgba(212,175,55,0.25)",
            background:"rgba(212,175,55,0.07)",
            marginBottom:"36px",
          }}>
            <span style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#D4AF37", display:"inline-block" }}/>
            <span style={{ fontSize:"12px", fontWeight:"600", color:"#D4AF37", fontFamily:"'DM Sans',system-ui,sans-serif", letterSpacing:"0.08em", textTransform:"uppercase" }}>New Season Collection — 2025</span>
          </div>

          <h1 style={{
            fontFamily:"Georgia,'Times New Roman',serif",
            fontSize: "clamp(48px, 8vw, 96px)",
            fontWeight:"400", color:"#F5F0E8",
            lineHeight:"1.05", letterSpacing:"-2px",
            margin:"0 0 12px",
          }}>
            Discover<br/>
            <span style={{ fontStyle:"italic", color:"#D4AF37" }}>Refined</span> Luxury
          </h1>

          <p style={{
            fontSize:"clamp(16px,2vw,20px)", color:"rgba(245,240,232,0.55)",
            fontFamily:"'DM Sans',system-ui,sans-serif", fontWeight:"300",
            lineHeight:"1.7", margin:"24px auto 44px", maxWidth:"560px",
          }}>
            Curated collections of the world's finest goods. Every piece selected for its craftsmanship, heritage, and timeless appeal.
          </p>

          <div style={{ display:"flex", gap:"14px", justifyContent:"center", flexWrap:"wrap" }}>
            <Link to="/signup" style={{
              textDecoration:"none", padding:"15px 36px", borderRadius:"14px",
              background:"linear-gradient(135deg,#D4AF37,#B8941E)", color:"#08080E",
              fontSize:"16px", fontWeight:"700", fontFamily:"'DM Sans',system-ui,sans-serif",
              boxShadow:"0 0 40px rgba(212,175,55,0.3), 0 8px 32px rgba(0,0,0,0.3)",
              letterSpacing:"0.01em", transition:"all 0.25s",
            }}>Shop the Collection</Link>
            <a href="#trending" style={{
              textDecoration:"none", padding:"15px 34px", borderRadius:"14px",
              border:"1px solid rgba(245,240,232,0.18)", color:"#F5F0E8",
              fontSize:"16px", fontWeight:"500", fontFamily:"'DM Sans',system-ui,sans-serif",
              background:"rgba(255,255,255,0.04)",
            }}>Explore Trending</a>
          </div>
        </div>

        {/* scroll indicator */}
        <div style={{ position:"absolute", bottom:"40px", left:"50%", transform:"translateX(-50%)", display:"flex", flexDirection:"column", alignItems:"center", gap:"8px" }}>
          <span style={{ fontSize:"11px", color:"rgba(245,240,232,0.35)", fontFamily:"'DM Sans',system-ui,sans-serif", letterSpacing:"0.1em", textTransform:"uppercase" }}>Scroll</span>
          <div style={{ width:"1px", height:"48px", background:"linear-gradient(to bottom,rgba(212,175,55,0.5),transparent)" }}/>
        </div>
      </section>

      {/* ═══ STATS BAR ══════════════════════════════════ */}
      <section style={{
        borderTop:"1px solid rgba(255,255,255,0.07)",
        borderBottom:"1px solid rgba(255,255,255,0.07)",
        padding:"48px 32px",
        background:"rgba(255,255,255,0.015)",
      }}>
        <div style={{ maxWidth:"1100px", margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:"32px", textAlign:"center" }}>
          {[
            { val: 12000, suffix: "+", label: "Premium Products" },
            { val: 98, suffix: "%", label: "Customer Satisfaction" },
            { val: 180, suffix: "+", label: "Countries Served" },
            { val: 50, suffix: "K+", label: "Happy Clients" },
          ].map(({ val, suffix, label }) => (
            <div key={label}>
              <div style={{ fontSize:"clamp(28px,4vw,42px)", fontWeight:"400", color:"#D4AF37", fontFamily:"Georgia,'Times New Roman',serif", letterSpacing:"-1px" }}>
                <Counter target={val} suffix={suffix} />
              </div>
              <div style={{ fontSize:"13px", color:"rgba(245,240,232,0.45)", fontFamily:"'DM Sans',system-ui,sans-serif", marginTop:"6px", letterSpacing:"0.03em" }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ BENTO CATEGORIES ═══════════════════════════ */}
      <section id="categories" style={{ padding:"100px 32px", maxWidth:"1280px", margin:"0 auto" }}>
        <div style={{ marginBottom:"56px" }}>
          <p style={{ margin:"0 0 10px", fontSize:"12px", fontWeight:"700", color:"#D4AF37", fontFamily:"'DM Sans',system-ui,sans-serif", letterSpacing:"0.12em", textTransform:"uppercase" }}>Collections</p>
          <h2 style={{ margin:"0", fontSize:"clamp(32px,5vw,52px)", fontWeight:"400", color:"#F5F0E8", fontFamily:"Georgia,'Times New Roman',serif", letterSpacing:"-1px", lineHeight:"1.1" }}>
            Browse by<br/><em>Category</em>
          </h2>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gridTemplateRows:"auto auto", gap:"16px" }}>
          <BentoCell label="Timepieces" sub="Swiss craftsmanship" gradient="linear-gradient(135deg,#0d1117,#1a2744,#0d1b4a)" tall />
          <BentoCell label="Fine Leather" sub="Italian artisans" gradient="linear-gradient(135deg,#1a0f06,#3d1f08,#5a2e0a)" />
          <BentoCell label="Fragrance" sub="Maison exclusives" gradient="linear-gradient(135deg,#060d0a,#0d2418,#0a3020)" />
          <BentoCell label="Apparel" sub="Seasonal essentials" gradient="linear-gradient(135deg,#130a1f,#241040,#1a0a3a)" />
          <BentoCell label="Fine Jewellery" sub="18k & precious stones" gradient="linear-gradient(135deg,#1a1508,#3a2e08,#4a3a0a)" span={2} />
        </div>
      </section>

      {/* ═══ TRENDING PRODUCTS ══════════════════════════ */}
      <section id="trending" style={{ padding:"0 32px 100px", maxWidth:"1280px", margin:"0 auto" }}>
        <div style={{ marginBottom:"56px", display:"flex", alignItems:"flex-end", justifyContent:"space-between", flexWrap:"wrap", gap:"20px" }}>
          <div>
            <p style={{ margin:"0 0 10px", fontSize:"12px", fontWeight:"700", color:"#D4AF37", fontFamily:"'DM Sans',system-ui,sans-serif", letterSpacing:"0.12em", textTransform:"uppercase" }}>Trending Now</p>
            <h2 style={{ margin:"0", fontSize:"clamp(32px,5vw,52px)", fontWeight:"400", color:"#F5F0E8", fontFamily:"Georgia,'Times New Roman',serif", letterSpacing:"-1px" }}>Most Wanted</h2>
          </div>
          <a href="#" style={{
            textDecoration:"none", padding:"10px 24px", borderRadius:"10px",
            border:"1px solid rgba(212,175,55,0.3)", color:"#D4AF37",
            fontSize:"14px", fontWeight:"500", fontFamily:"'DM Sans',system-ui,sans-serif",
          }}>View All →</a>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:"20px" }}>
          {products.map((p) => <ProductCard key={p.name} {...p} />)}
        </div>
      </section>

      {/* ═══ TESTIMONIAL ════════════════════════════════ */}
      <section style={{
        margin:"0 32px 100px", borderRadius:"24px",
        background:"linear-gradient(135deg, rgba(212,175,55,0.07) 0%, rgba(99,102,241,0.05) 100%)",
        border:"1px solid rgba(212,175,55,0.15)",
        padding:"80px 48px", textAlign:"center",
      }}>
        <div style={{ fontSize:"56px", color:"rgba(212,175,55,0.4)", fontFamily:"Georgia,serif", lineHeight:"1", marginBottom:"24px" }}>"</div>
        <blockquote style={{
          margin:"0 auto 32px", maxWidth:"660px",
          fontSize:"clamp(18px,2.5vw,26px)", fontWeight:"400",
          color:"rgba(245,240,232,0.85)", fontFamily:"Georgia,'Times New Roman',serif",
          fontStyle:"italic", lineHeight:"1.55", letterSpacing:"-0.3px",
        }}>
          Every piece I've received has exceeded my expectations. The attention to detail and quality is unmatched anywhere online.
        </blockquote>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"14px" }}>
          <div style={{ width:"44px", height:"44px", borderRadius:"50%", background:"linear-gradient(135deg,#D4AF37,#B8941E)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"18px", fontWeight:"700", color:"#08080E", fontFamily:"Georgia,serif" }}>S</div>
          <div style={{ textAlign:"left" }}>
            <div style={{ fontFamily:"'DM Sans',system-ui,sans-serif", fontSize:"15px", fontWeight:"600", color:"#F5F0E8" }}>Sofia Marchetti</div>
            <div style={{ fontFamily:"'DM Sans',system-ui,sans-serif", fontSize:"13px", color:"rgba(245,240,232,0.45)" }}>Milan, Italy</div>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═════════════════════════════════════ */}
      <footer style={{
        borderTop:"1px solid rgba(255,255,255,0.07)",
        padding:"64px 32px 40px",
        background:"rgba(4,4,8,0.8)",
      }}>
        <div style={{ maxWidth:"1280px", margin:"0 auto" }}>
          <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:"48px", marginBottom:"56px" }}>
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"16px" }}>
                <div style={{ width:"32px",height:"32px",borderRadius:"8px",background:"linear-gradient(135deg,#D4AF37,#F5E090)",display:"flex",alignItems:"center",justifyContent:"center" }}>
                  <span style={{ fontSize:"16px",fontWeight:"900",color:"#08080E",fontFamily:"Georgia,serif" }}>L</span>
                </div>
                <span style={{ fontFamily:"Georgia,serif",fontSize:"20px",color:"#F5F0E8" }}>Luxe</span>
              </div>
              <p style={{ fontSize:"14px",color:"rgba(245,240,232,0.45)",fontFamily:"'DM Sans',system-ui,sans-serif",lineHeight:"1.7",maxWidth:"240px",margin:0 }}>
                The world's most refined selection of luxury goods, delivered to your door.
              </p>
            </div>
            {[
              { title:"Shop", links:["New Arrivals","Best Sellers","Watches","Bags","Fragrance"] },
              { title:"Company", links:["About Us","Careers","Press","Sustainability"] },
              { title:"Support", links:["FAQ","Shipping","Returns","Contact"] },
            ].map(({ title, links }) => (
              <div key={title}>
                <h4 style={{ margin:"0 0 16px",fontSize:"13px",fontWeight:"700",color:"#F5F0E8",fontFamily:"'DM Sans',system-ui,sans-serif",letterSpacing:"0.08em",textTransform:"uppercase" }}>{title}</h4>
                <ul style={{ listStyle:"none",padding:0,margin:0,display:"flex",flexDirection:"column",gap:"10px" }}>
                  {links.map(l=>(
                    <li key={l}><a href="#" style={{ textDecoration:"none",fontSize:"14px",color:"rgba(245,240,232,0.45)",fontFamily:"'DM Sans',system-ui,sans-serif",transition:"color 0.2s" }}
                      onMouseEnter={e=>e.target.style.color="#D4AF37"} onMouseLeave={e=>e.target.style.color="rgba(245,240,232,0.45)"}>{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ borderTop:"1px solid rgba(255,255,255,0.06)",paddingTop:"28px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"12px" }}>
            <p style={{ margin:0,fontSize:"13px",color:"rgba(245,240,232,0.3)",fontFamily:"'DM Sans',system-ui,sans-serif" }}>© 2025 Luxe. All rights reserved.</p>
            <div style={{ display:"flex",gap:"20px" }}>
              {["Privacy","Terms","Cookies"].map(l=>(
                <a key={l} href="#" style={{ fontSize:"13px",color:"rgba(245,240,232,0.3)",textDecoration:"none",fontFamily:"'DM Sans',system-ui,sans-serif" }}>{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
