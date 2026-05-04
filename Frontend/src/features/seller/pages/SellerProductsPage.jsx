import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSellerProducts } from "../sellerSlice.js";
import SellerProductCard from "../components/SellerProductCard.jsx";
import { Link } from "react-router-dom";

export const SellerProductsPage = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.seller);
  console.log(products);
  // Extracting the products array based on your optional chaining logic
  const productList = products?.data?.products || [];
  const pagination = products?.data?.pagination;

  // add page state
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getSellerProducts({ page: currentPage, limit: 8 }));
  }, [dispatch, currentPage]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#08080E] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-[1px] bg-[#D4AF37] animate-pulse" />
          <p className="text-[#D4AF37] font-['DM_Sans'] uppercase tracking-[0.4em] text-[10px] font-black">
            Accessing Inventory...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#08080E] pt-[140px] px-6 text-center">
        <p className="text-red-400 font-[Georgia] italic text-lg">
          Unable to retrieve archive records.
        </p>
        <button
          onClick={() => dispatch(getSellerProducts())}
          className="mt-4 text-[#D4AF37] text-[10px] uppercase tracking-widest font-bold border-b border-[#D4AF37]/30 pb-1"
        >
          Attempt Re-authentication
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#08080E] pt-[100px] md:pt-[140px] pb-24 px-4 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-l-2 border-[#D4AF37] pl-6 gap-6">
          <div>
            <span className="text-[#D4AF37] text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold mb-2 block">
              Merchant Console
            </span>
            <h2 className="text-[32px] md:text-[52px] font-[Georgia,serif] text-[#F5F0E8] leading-tight md:leading-none">
              Managed <span className="italic">Inventory</span>
            </h2>
            <p className="text-[rgba(245,240,232,0.4)] text-[11px] uppercase tracking-widest font-medium mt-2">
              {productList.length} Artifacts currently listed in the vault
            </p>
          </div>

          <Link
            to="/seller/products/new"
            className="group flex items-center gap-3 bg-[#D4AF37] px-8 py-4 rounded-full text-[#08080E] text-[10px] uppercase tracking-[0.2em] font-black hover:bg-[#F5E090] transition-all duration-300 active:scale-95"
          >
            <span>+</span> Add New Product
          </Link>
        </div>

        {/* Inventory Grid */}
        {productList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
            {productList.map((product) => (
              <div
                key={product?._id}
                className="animate-in fade-in slide-in-from-bottom-4 duration-700"
              >
                <SellerProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-32 flex flex-col items-center border border-white/5 rounded-[32px] bg-white/[0.02]">
            <p className="text-[rgba(245,240,232,0.3)] font-[Georgia,serif] italic text-xl mb-6">
              Your vault is currently empty.
            </p>
            <Link
              to="/seller/products/new"
              className="text-[#D4AF37] text-[10px] uppercase tracking-[0.2em] font-black border-b border-[#D4AF37]/40 pb-1 hover:border-[#D4AF37] transition-all"
            >
              Initiate First Listing
            </Link>
          </div>
        )}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-16">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-6 py-3 rounded-full border border-white/10 text-white/40 text-[10px] uppercase tracking-widest font-black hover:border-[#D4AF37]/30 hover:text-[#D4AF37] transition-all disabled:opacity-20 disabled:hover:border-white/10 disabled:hover:text-white/40"
            >
              ← Prev
            </button>

            <span className="text-[rgba(245,240,232,0.4)] text-[10px] uppercase tracking-[0.3em] font-bold">
              {currentPage} / {pagination.totalPages}
            </span>

            <button
              onClick={() =>
                setCurrentPage((p) => Math.min(pagination.totalPages, p + 1))
              }
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
