import React, { useEffect } from "react";
import { getProducts } from "../productSlice";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";

const ProductPage = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts({ limit: 8 }));
  }, [dispatch]);

  if (loading) return <p className="text-white p-6">Loading...</p>;
  if (error) return <p className="text-red-400 p-6">Error...{error}</p>;

  return (
    <div className="bg-[#08080E] min-h-screen px-6 py-10">
      <h1 className="text-3xl text-[#F5F0E8] font-serif mb-8">Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
