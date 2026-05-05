import React, { useEffect, useState } from "react";
import { getProducts } from "../productSlice";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { useLocation, useNavigate } from "react-router-dom";

const BRANDS = [
  "Apple",
  "Samsung",
  "OnePlus",
  "Dell",
  "HP",
  "Lenovo",
  "Asus",
  "Sony",
];
const RAM_OPTIONS = ["4GB", "8GB", "12GB", "16GB", "32GB"];
const STORAGE_OPTIONS = ["64GB", "128GB", "256GB", "512GB", "1TB"];

const ProductPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const dispatch = useDispatch();
  const { products, pagination, loading, error } = useSelector(
    (state) => state.products,
  );
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

  // Update currentPage when URL page param changes
  useEffect(() => {
    setCurrentPage(pageFromUrl);
  }, [pageFromUrl]);

  // Fetch products when search params or currentPage changes
  useEffect(() => {
    const paramsObj = Object.fromEntries(new URLSearchParams(search));
    // Remove page from paramsObj to avoid duplication, then add currentPage
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
    // Reset to page 1 when filters change
    p.set("page", 1);
    navigate(`/products?${p.toString()}`);
  };

  const handleSort = (value) => updateParam("sort", value);
  const handleSearch = (value) => updateParam("search", value);
  const handleCategory = (value) =>
    updateParam("category", value === activeCategory ? "" : value);
  const handleRam = (value) =>
    updateParam("ram", value === activeRam ? "" : value);
  const handleStorage = (value) =>
    updateParam("storage", value === activeStorage ? "" : value);

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

  const hasActiveFilters =
    activeCategory ||
    activeBrands.length ||
    activeRam ||
    activeStorage ||
    activeMinPrice ||
    activeMaxPrice;

  if (error)
    return (
      <div className="bg-[#08080E] min-h-screen flex items-center justify-center text-red-400">
        Error: {error}
      </div>
    );

  return (
    <div className="bg-[#08080E] min-h-screen pt-[100px] md:pt-[140px] pb-24 px-4 md:px-10 selection:bg-[#D4AF37]/30">
      <div className="max-w-[1400px] mx-auto">
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-l-2 border-[#D4AF37] pl-6 gap-8">
          <div className="flex-1">
            <span className="text-[#D4AF37] text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold mb-2 block">
              Curated Selection
            </span>
            <h2 className="text-[32px] md:text-[52px] font-[Georgia,serif] text-[#F5F0E8] leading-tight md:leading-none">
              Explore <span className="italic">Collection</span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <div className="relative w-full sm:w-[300px] group">
              <input
                type="text"
                placeholder="Search Archive..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#0C0C12]/80 border border-white/10 rounded-full py-3 px-6 text-[#F5F0E8] text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-all duration-500 placeholder:text-white/20"
              />
              <div className="absolute inset-0 rounded-full bg-[#D4AF37]/5 blur-md opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
            </div>

            <div className="relative w-full sm:w-auto">
              <select
                onChange={(e) => handleSort(e.target.value)}
                className="appearance-none w-full bg-[#0C0C12]/80 border border-white/10 rounded-full py-3 pl-6 pr-12 text-[#F5F0E8] text-xs uppercase tracking-widest font-bold focus:outline-none focus:border-[#D4AF37]/50 transition-all cursor-pointer"
              >
                <option value="">Latest Release</option>
                <option value="price">Price: Low To High</option>
                <option value="-price">Price: High To Low</option>
              </select>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                  <path
                    d="M1 1L5 5L9 1"
                    stroke="#D4AF37"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full border text-xs uppercase tracking-widest font-bold transition-all duration-300 ${
                showFilters || hasActiveFilters
                  ? "border-[#D4AF37] text-[#D4AF37] bg-[#D4AF37]/10"
                  : "border-white/10 text-white/50 hover:border-white/30"
              }`}
            >
              <svg width="14" height="12" viewBox="0 0 14 12" fill="none">
                <path
                  d="M1 1H13M3 6H11M5 11H9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              Filters {hasActiveFilters && `(Active)`}
            </button>
          </div>
        </div>

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mb-8 pl-1">
            {activeCategory && (
              <span className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] uppercase tracking-widest font-bold">
                {activeCategory}
                <button onClick={() => handleCategory(activeCategory)}>
                  ×
                </button>
              </span>
            )}
            {activeRam && (
              <span className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] uppercase tracking-widest font-bold">
                RAM: {activeRam}
                <button onClick={() => handleRam(activeRam)}>×</button>
              </span>
            )}
            {activeStorage && (
              <span className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] uppercase tracking-widest font-bold">
                Storage: {activeStorage}
                <button onClick={() => handleStorage(activeStorage)}>×</button>
              </span>
            )}
            {(activeMinPrice || activeMaxPrice) && (
              <span className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] uppercase tracking-widest font-bold">
                ₹{activeMinPrice || "0"} – ₹{activeMaxPrice || "∞"}
                <button
                  onClick={() => {
                    handlePriceChange("minPrice", "");
                    handlePriceChange("maxPrice", "");
                  }}
                >
                  ×
                </button>
              </span>
            )}
            <button
              onClick={clearAllFilters}
              className="px-4 py-1.5 rounded-full border border-white/10 text-white/30 text-[10px] uppercase tracking-widest font-bold hover:border-red-400/40 hover:text-red-400/60 transition-all"
            >
              Clear All
            </button>
          </div>
        )}

        <div className="flex gap-8 items-start">
          {/* Filter Sidebar */}
          {showFilters && (
            <div className="w-[260px] shrink-0 sticky top-[140px]">
              <div className="relative p-[1px] rounded-[24px] bg-gradient-to-b from-white/10 to-transparent">
                <div className="bg-[#0C0C12]/90 backdrop-blur-3xl rounded-[23px] p-6 space-y-8">
                  {/* Category */}
                  <div>
                    <p className="text-[#D4AF37] text-[9px] uppercase tracking-[0.3em] font-black mb-4">
                      Category
                    </p>
                    <div className="space-y-2">
                      {["phone", "laptop"].map((cat) => (
                        <button
                          key={cat}
                          onClick={() => handleCategory(cat)}
                          className={`w-full text-left px-4 py-2.5 rounded-xl text-xs uppercase tracking-widest font-bold transition-all duration-200 ${
                            activeCategory === cat
                              ? "bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30"
                              : "text-white/40 hover:text-white/70 hover:bg-white/5"
                          }`}
                        >
                          {cat === "phone" ? "📱 Phones" : "💻 Laptops"}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="h-[1px] bg-white/5" />

                  {/* Brand */}
                  <div>
                    <p className="text-[#D4AF37] text-[9px] uppercase tracking-[0.3em] font-black mb-4">
                      Brand
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {BRANDS.map((brand) => (
                        <button
                          key={brand}
                          onClick={() =>
                            updateParam(
                              "brand",
                              activeBrands.includes(brand) ? "" : brand,
                            )
                          }
                          className={`px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-bold transition-all duration-200 ${
                            activeBrands.includes(brand)
                              ? "bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30"
                              : "border border-white/10 text-white/40 hover:border-white/30 hover:text-white/70"
                          }`}
                        >
                          {brand}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="h-[1px] bg-white/5" />

                  {/* RAM */}
                  <div>
                    <p className="text-[#D4AF37] text-[9px] uppercase tracking-[0.3em] font-black mb-4">
                      RAM
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {RAM_OPTIONS.map((ram) => (
                        <button
                          key={ram}
                          onClick={() => handleRam(ram)}
                          className={`px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-bold transition-all duration-200 ${
                            activeRam === ram
                              ? "bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30"
                              : "border border-white/10 text-white/40 hover:border-white/30 hover:text-white/70"
                          }`}
                        >
                          {ram}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="h-[1px] bg-white/5" />

                  {/* Storage */}
                  <div>
                    <p className="text-[#D4AF37] text-[9px] uppercase tracking-[0.3em] font-black mb-4">
                      Storage
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {STORAGE_OPTIONS.map((s) => (
                        <button
                          key={s}
                          onClick={() => handleStorage(s)}
                          className={`px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-bold transition-all duration-200 ${
                            activeStorage === s
                              ? "bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30"
                              : "border border-white/10 text-white/40 hover:border-white/30 hover:text-white/70"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="h-[1px] bg-white/5" />

                  {/* Price Range */}
                  <div>
                    <p className="text-[#D4AF37] text-[9px] uppercase tracking-[0.3em] font-black mb-4">
                      Price Range
                    </p>
                    <div className="flex gap-2 items-center">
                      <input
                        type="number"
                        placeholder="Min"
                        defaultValue={activeMinPrice}
                        onBlur={(e) =>
                          handlePriceChange("minPrice", e.target.value)
                        }
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white/70 text-xs focus:outline-none focus:border-[#D4AF37]/40"
                      />
                      <span className="text-white/20 text-xs">–</span>
                      <input
                        type="number"
                        placeholder="Max"
                        defaultValue={activeMaxPrice}
                        onBlur={(e) =>
                          handlePriceChange("maxPrice", e.target.value)
                        }
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white/70 text-xs focus:outline-none focus:border-[#D4AF37]/40"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Product Grid */}
          <div className="flex-1 relative">
            {loading && (
              <div className="absolute inset-0 z-10 bg-[#08080E]/40 backdrop-blur-[2px] flex items-center justify-center rounded-3xl">
                <p className="text-[#D4AF37] text-xs uppercase tracking-[0.4em] font-black animate-pulse">
                  Refreshing Archive...
                </p>
              </div>
            )}

            {products?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="transform transition-transform duration-500 hover:scale-[1.02]"
                  >
                    <ProductCard product={product} cart={cart} user={user} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-32 text-center">
                <p className="text-[rgba(245,240,232,0.3)] font-[Georgia,serif] italic text-xl">
                  No artifacts found matching your search.
                </p>
              </div>
            )}
          </div>
        </div>

        {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-16">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-6 py-3 rounded-full border border-white/10 text-white/40 text-[10px] uppercase tracking-widest font-black hover:border-[#D4AF37]/30 hover:text-[#D4AF37] transition-all disabled:opacity-20 disabled:hover:border-white/10 disabled:hover:text-white/40"
            >
              ← Prev
            </button>

            <span className="text-[rgba(245,240,232,0.4)] text-[10px] uppercase tracking-[0.3em] font-bold">
              {currentPage} / {pagination.totalPages}
            </span>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === pagination.totalPages}
              className="px-6 py-3 rounded-full border border-white/10 text-white/40 text-[10px] uppercase tracking-widest font-black hover:border-[#D4AF37]/30 hover:text-[#D4AF37] transition-all disabled:opacity-20 disabled:hover:border-white/10 disabled:hover:text-white/40"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
