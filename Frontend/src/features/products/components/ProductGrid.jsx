import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../productSlice";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";

const ProductGrid = ({ initialParams = { limit: 8 }, title = "Trending Now" }) => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  const { cart } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(getProducts(initialParams));
  }, [dispatch, JSON.stringify(initialParams)]);

  return (
    <section className="py-16 px-6 md:px-8 max-w-[1280px] mx-auto" id="trending">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="text-[12px] font-bold uppercase tracking-[0.12em] mb-2" style={{ color: "var(--gold)" }}>Featured</p>
          <h2 className="text-[clamp(28px,4vw,44px)] font-[Georgia,serif] leading-tight" style={{ color: "var(--text-primary)" }}>
            {title}
          </h2>
        </div>
        <Link
          to="/products"
          className="hidden sm:block text-sm font-semibold no-underline transition-colors"
          style={{ color: "var(--gold)" }}
        >
          View all →
        </Link>
      </div>

      <div className="relative">
        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl" style={{ background: "var(--bg-base)", opacity: 0.7 }}>
            <p className="text-xs uppercase tracking-[0.4em] font-black animate-pulse" style={{ color: "var(--gold)" }}>Loading...</p>
          </div>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} cart={cart} user={user} />
          ))}
        </div>
      </div>

      <div className="mt-8 text-center sm:hidden">
        <Link to="/products" className="text-sm font-semibold no-underline" style={{ color: "var(--gold)" }}>
          View all products →
        </Link>
      </div>
    </section>
  );
};

export default ProductGrid;
