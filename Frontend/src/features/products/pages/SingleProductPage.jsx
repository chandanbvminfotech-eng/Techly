import React, { useEffect } from "react";
import { getProduct } from "../productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SingleProduct from "../components/SingleProduct";

const SingleProductPage = () => {
  const { id } = useParams();
    const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.products);
    const { cart } = useSelector((state) => state.cart);
    const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(getProduct(id)); 
  }, [id, dispatch]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div>{product && <SingleProduct product={product.data} cart={cart} user={user} />}</div>
  );
};

export default SingleProductPage;
