import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../productSlice";
import ProductCard from "./ProductCard";

const ProductGrid = ({
  initialParams = { limit: 8 },
  disableUrlSync = false,
  title = "Collection",
}) => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  const { cart } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    // We only fetch based on the params passed via props
    dispatch(getProducts(initialParams));
  }, [dispatch, JSON.stringify(initialParams)]);

  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 z-10 bg-[#08080E]/40 backdrop-blur-[2px] flex items-center justify-center rounded-3xl">
          <p className="text-[#D4AF37] text-xs uppercase tracking-[0.4em] font-black animate-pulse">
            Loading...
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            cart={cart}
            user={user}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
