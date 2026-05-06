import React, { useEffect, useState } from "react";
import { getProducts } from "../productSlice";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { useLocation, useNavigate } from "react-router-dom";

const BRANDS = ["Apple", "Samsung", "OnePlus", "Dell", "HP", "Lenovo", "Asus", "Sony"];
const RAM_OPTIONS = ["4GB", "8GB", "12GB", "16GB", "32GB"];
const STORAGE_OPTIONS = ["64GB", "128GB", "256GB", "512GB", "1TB"];

/* ── Filter content shared between sidebar and drawer ── */
const FilterContent = ({ params, handlers, onClose }) => {
  const { activeCategory, activeBrands, activeRam, activeStorage, activeMinPrice, activeMaxPrice } = params;
  const { handleCategory, updateParam, handleRam, handleStorage, handlePriceChange, clearAllFilters } = handlers;

  const SectionLabel = ({ children }) => (
    <p className="text-xs font-black uppercase tracking-[0.25em] mb-3" style={{ color: "var(--gold)" }}>
      {children}
    </p>
  );

  const FilterChip = ({ label, active, onClick }) => (
    <button
      onClick={onClick}
      className="px-3 py-1.5 rounded-full text-[11px] uppercase tracking-wider font-bold transition-all duration-200"
      style={{
        background: active ? "var(--gold-muted)" : "var(--input-bg)",
        color: active ? "var(--gold)" : "var(--text-muted)",
        border: `1px solid ${active ? "var(--gold)" : "var(--border-subtle)"}`,
      }}
    >
      {label}
    </button>
  );

  const CategoryBtn = ({ value, emoji, label }) => (
    <button
      onClick={() => handleCategory(value)}
      className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
      style={{
        background: activeCategory === value ? "var(--gold-muted)" : "transparent",
        color: activeCategory === value ? "var(--gold)" : "var(--text-secondary)",
        border: `1px solid ${activeCategory === value ? "var(--gold)" : "transparent"}`,
      }}
    >
      {emoji} {label}
    </button>
  );

  return (
    <div className="space-y-6">
      {/* Category */}
      <div>
        <SectionLabel>Category</SectionLabel>
        <div className="space-y-1">
          <CategoryBtn value="phone" emoji="📱" label="Phones" />
          <CategoryBtn value="laptop" emoji="💻" label="Laptops" />
        </div>
      </div>

      <div className="h-px" style={{ background: "var(--border-subtle)" }} />

      {/* Brand */}
      <div>
        <SectionLabel>Brand</SectionLabel>
        <div className="flex flex-wrap gap-2">
          {BRANDS.map((brand) => (
            <FilterChip
              key={brand}
              label={brand}
              active={activeBrands.includes(brand)}
              onClick={() => updateParam("brand", activeBrands.includes(brand) ? "" : brand)}
            />
          ))}
        </div>
      </div>

      <div className="h-px" style={{ background: "var(--border-subtle)" }} />

      {/* RAM */}
      <div>
        <SectionLabel>RAM</SectionLabel>
        <div className="flex flex-wrap gap-2">
          {RAM_OPTIONS.map((ram) => (
            <FilterChip key={ram} label={ram} active={activeRam === ram} onClick={() => handleRam(ram)} />
          ))}
        </div>
      </div>

      <div className="h-px" style={{ background: "var(--border-subtle)" }} />

      {/* Storage */}
      <div>
        <SectionLabel>Storage</SectionLabel>
        <div className="flex flex-wrap gap-2">
          {STORAGE_OPTIONS.map((s) => (
            <FilterChip key={s} label={s} active={activeStorage === s} onClick={() => handleStorage(s)} />
          ))}
        </div>
      </div>

      <div className="h-px" style={{ background: "var(--border-subtle)" }} />

      {/* Price Range */}
      <div>
        <SectionLabel>Price Range</SectionLabel>
        <div className="flex gap-3 items-center">
          <input
            type="number"
            placeholder="Min ₹"
            defaultValue={activeMinPrice}
            onBlur={(e) => handlePriceChange("minPrice", e.target.value)}
            className="w-full rounded-xl px-3 py-2.5 text-sm focus:outline-none"
            style={{
              background: "var(--input-bg)",
              border: "1px solid var(--border-subtle)",
              color: "var(--text-primary)",
            }}
          />
          <span style={{ color: "var(--text-muted)" }}>–</span>
          <input
            type="number"
            placeholder="Max ₹"
            defaultValue={activeMaxPrice}
            onBlur={(e) => handlePriceChange("maxPrice", e.target.value)}
            className="w-full rounded-xl px-3 py-2.5 text-sm focus:outline-none"
            style={{
              background: "var(--input-bg)",
              border: "1px solid var(--border-subtle)",
              color: "var(--text-primary)",
            }}
          />
        </div>
      </div>

      {/* Clear + Apply */}
      <div className="flex gap-3 pt-2">
        <button
          onClick={() => { clearAllFilters(); onClose && onClose(); }}
          className="flex-1 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all"
          style={{ background: "var(--input-bg)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}
        >
          Clear All
        </button>
        {onClose && (
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all"
            style={{ background: "var(--gold)", color: "#08080E" }}
          >
            Apply Filters
          </button>
        )}
      </div>
    </div>
  );
};

const ProductPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const dispatch = useDispatch();
  const { products, pagination, loading, error } = useSelector((state) => state.products);
  const { cart } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const { search } = useLocation();

  const params = new URLSearchParams(search);
  const activeCategory = params.get("category") || "";
  const activeBrands = params.getAll("brand");
  const activeRam = params.get("ram") || "";
  const activeStorage = params.get("storage") || "";
  const activeMinPrice = params.get("minPrice") || "";
  const activeMaxPrice = params.get("maxPrice") || "";
  const pageFromUrl = parseInt(params.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(pageFromUrl);

  useEffect(() => { setCurrentPage(pageFromUrl); }, [pageFromUrl]);

  useEffect(() => {
    const paramsObj = Object.fromEntries(new URLSearchParams(search));
    delete paramsObj.page;
    dispatch(getProducts({ page: currentPage, limit: 8, ...paramsObj }));
  }, [search, dispatch, currentPage]);

  useEffect(() => {
    const timeout = setTimeout(() => handleSearch(searchTerm), 500);
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  const updateParam = (key, value) => {
    const p = new URLSearchParams(search);
    if (value) p.set(key, value);
    else p.delete(key);
    p.set("page", 1);
    navigate(`/products?${p.toString()}`);
  };

  const handleSort = (value) => updateParam("sort", value);
  const handleSearch = (value) => updateParam("search", value);
  const handleCategory = (value) => updateParam("category", value === activeCategory ? "" : value);
  const handleRam = (value) => updateParam("ram", value === activeRam ? "" : value);
  const handleStorage = (value) => updateParam("storage", value === activeStorage ? "" : value);
  const handlePriceChange = (key, value) => {
    const p = new URLSearchParams(search);
    if (value) p.set(key, value);
    else p.delete(key);
    p.set("page", 1);
    navigate(`/products?${p.toString()}`);
  };
  const clearAllFilters = () => navigate("/products");
  const handlePageChange = (newPage) => {
    const p = new URLSearchParams(search);
    p.set("page", newPage);
    navigate(`/products?${p.toString()}`);
  };

  const hasActiveFilters = activeCategory || activeBrands.length || activeRam || activeStorage || activeMinPrice || activeMaxPrice;

  const filterParams = { activeCategory, activeBrands, activeRam, activeStorage, activeMinPrice, activeMaxPrice };
  const filterHandlers = { handleCategory, updateParam, handleRam, handleStorage, handlePriceChange, clearAllFilters };

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg-base)", color: "#f87171" }}>
        Error: {error}
      </div>
    );

  return (
    <div className="min-h-screen pt-[88px] md:pt-[120px] pb-24 px-4 md:px-8" style={{ background: "var(--bg-base)" }}>
      <div className="max-w-[1400px] mx-auto">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6" style={{ borderLeft: "2px solid var(--gold)", paddingLeft: "1.25rem" }}>
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold mb-1 block" style={{ color: "var(--gold)" }}>
              Curated Selection
            </span>
            <h2 className="text-[28px] md:text-[48px] font-[Georgia,serif] leading-tight" style={{ color: "var(--text-primary)" }}>
              Explore <span className="italic">Collection</span>
            </h2>
          </div>

          {/* Search + Sort + Filter toggle */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            {/* Search */}
            <div className="relative flex-1 sm:w-[260px]">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-full py-2.5 px-5 text-sm focus:outline-none transition-all duration-300"
                style={{
                  background: "var(--input-bg)",
                  border: "1px solid var(--border-subtle)",
                  color: "var(--text-primary)",
                }}
              />
              <svg className="absolute right-4 top-1/2 -translate-y-1/2 opacity-40" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
              </svg>
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                onChange={(e) => handleSort(e.target.value)}
                className="appearance-none rounded-full py-2.5 pl-5 pr-10 text-xs uppercase tracking-widest font-bold focus:outline-none cursor-pointer"
                style={{
                  background: "var(--input-bg)",
                  border: "1px solid var(--border-subtle)",
                  color: "var(--text-secondary)",
                }}
              >
                <option value="">Latest</option>
                <option value="price">Price: Low–High</option>
                <option value="-price">Price: High–Low</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            {/* Filter toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-bold transition-all duration-300"
              style={{
                border: `1px solid ${showFilters || hasActiveFilters ? "var(--gold)" : "var(--border-subtle)"}`,
                color: showFilters || hasActiveFilters ? "var(--gold)" : "var(--text-muted)",
                background: showFilters || hasActiveFilters ? "var(--gold-muted)" : "transparent",
              }}
            >
              <svg width="14" height="12" viewBox="0 0 14 12" fill="none">
                <path d="M1 1H13M3 6H11M5 11H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              Filters {hasActiveFilters ? `(${[activeCategory, ...activeBrands, activeRam, activeStorage, activeMinPrice, activeMaxPrice].filter(Boolean).length})` : ""}
            </button>
          </div>
        </div>

        {/* ── Active filter chips ── */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mb-8">
            {activeCategory && (
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] uppercase tracking-wider font-bold" style={{ background: "var(--gold-muted)", color: "var(--gold)", border: "1px solid var(--gold)" }}>
                {activeCategory}
                <button onClick={() => handleCategory(activeCategory)} className="ml-0.5 hover:opacity-70">×</button>
              </span>
            )}
            {activeRam && (
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] uppercase tracking-wider font-bold" style={{ background: "var(--gold-muted)", color: "var(--gold)", border: "1px solid var(--gold)" }}>
                RAM: {activeRam}
                <button onClick={() => handleRam(activeRam)} className="hover:opacity-70">×</button>
              </span>
            )}
            {activeStorage && (
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] uppercase tracking-wider font-bold" style={{ background: "var(--gold-muted)", color: "var(--gold)", border: "1px solid var(--gold)" }}>
                {activeStorage}
                <button onClick={() => handleStorage(activeStorage)} className="hover:opacity-70">×</button>
              </span>
            )}
            {(activeMinPrice || activeMaxPrice) && (
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] uppercase tracking-wider font-bold" style={{ background: "var(--gold-muted)", color: "var(--gold)", border: "1px solid var(--gold)" }}>
                ₹{activeMinPrice || "0"} – ₹{activeMaxPrice || "∞"}
                <button onClick={() => { handlePriceChange("minPrice", ""); handlePriceChange("maxPrice", ""); }} className="hover:opacity-70">×</button>
              </span>
            )}
            <button
              onClick={clearAllFilters}
              className="px-3 py-1 rounded-full text-[11px] uppercase tracking-wider font-bold transition-all"
              style={{ border: "1px solid var(--border-subtle)", color: "var(--text-muted)" }}
            >
              Clear All
            </button>
          </div>
        )}

        {/* ── Main layout: sidebar + grid ── */}
        <div className="flex gap-8 items-start">

          {/* Desktop sidebar filter */}
          {showFilters && (
            <div className="hidden lg:block w-[260px] shrink-0 sticky top-[120px]">
              <div className="rounded-2xl p-5 backdrop-blur-xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
                <h3 className="text-sm font-black uppercase tracking-widest mb-5" style={{ color: "var(--text-primary)" }}>Filter By</h3>
                <FilterContent params={filterParams} handlers={filterHandlers} onClose={null} />
              </div>
            </div>
          )}

          {/* Product grid */}
          <div className="flex-1 relative min-w-0">
            {loading && (
              <div className="absolute inset-0 z-10 flex items-center justify-center rounded-3xl" style={{ background: "var(--bg-base)", opacity: 0.7 }}>
                <p className="text-xs uppercase tracking-[0.4em] font-black animate-pulse" style={{ color: "var(--gold)" }}>Loading...</p>
              </div>
            )}

            {products?.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} cart={cart} user={user} />
                ))}
              </div>
            ) : (
              <div className="py-32 text-center">
                <p className="font-[Georgia,serif] italic text-lg" style={{ color: "var(--text-muted)" }}>
                  No products match your filters.
                </p>
                <button onClick={clearAllFilters} className="mt-4 text-sm font-semibold underline" style={{ color: "var(--gold)" }}>
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── Pagination ── */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-14">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-6 py-3 rounded-full text-[11px] uppercase tracking-widest font-black transition-all disabled:opacity-20"
              style={{ border: "1px solid var(--border-subtle)", color: "var(--text-muted)" }}
            >
              ← Prev
            </button>
            <span className="text-[11px] uppercase tracking-[0.3em] font-bold" style={{ color: "var(--text-muted)" }}>
              {currentPage} / {pagination.totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === pagination.totalPages}
              className="px-6 py-3 rounded-full text-[11px] uppercase tracking-widest font-black transition-all disabled:opacity-20"
              style={{ border: "1px solid var(--border-subtle)", color: "var(--text-muted)" }}
            >
              Next →
            </button>
          </div>
        )}
      </div>

      {/* ── Mobile filter bottom sheet ── */}
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[190] lg:hidden transition-opacity duration-300 ${showFilters ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={() => setShowFilters(false)}
      />
      {/* Bottom drawer */}
      <div className={`filter-drawer lg:hidden ${showFilters ? "open" : ""}`}>
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full" style={{ background: "var(--border-medium)" }} />
        </div>
        <div className="flex items-center justify-between px-5 py-4">
          <h3 className="text-base font-black uppercase tracking-wider" style={{ color: "var(--text-primary)" }}>
            Filter Products
          </h3>
          <button
            onClick={() => setShowFilters(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-lg"
            style={{ background: "var(--input-bg)", color: "var(--text-secondary)" }}
          >
            ×
          </button>
        </div>
        <div className="px-5 pb-8">
          <FilterContent params={filterParams} handlers={filterHandlers} onClose={() => setShowFilters(false)} />
        </div>
      </div>

      {/* Mobile floating filter button (always visible on mobile) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 lg:hidden z-[180]">
        <button
          onClick={() => setShowFilters(true)}
          className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold shadow-2xl transition-all active:scale-95"
          style={{
            background: hasActiveFilters ? "var(--gold)" : "var(--bg-surface)",
            color: hasActiveFilters ? "#08080E" : "var(--text-primary)",
            border: "1px solid var(--border-subtle)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          }}
        >
          <svg width="14" height="12" viewBox="0 0 14 12" fill="none">
            <path d="M1 1H13M3 6H11M5 11H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          {hasActiveFilters ? `Filters (${[activeCategory, ...activeBrands, activeRam, activeStorage, activeMinPrice, activeMaxPrice].filter(Boolean).length})` : "Filter & Sort"}
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
