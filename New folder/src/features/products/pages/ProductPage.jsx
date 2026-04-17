import React, { useEffect } from "react";
import { getProducts } from "../productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const ProductPage = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts({ limit: 7 }));
  }, [dispatch]);

  // console.log(products)
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {products.map((product) => (
        <div key={product._id}>
          <h3>{product.name}</h3>
          <p>₹{product.price}</p>
          <img src={product.images[0]?.url} width="150" />
        </div>
      ))}
    </div>
  );
};

export default ProductPage;
