import React from 'react'
import { Link } from 'react-router-dom';

const SellerPage = () => {
  return (
      <div className="min-h-screen bg-[#08080E] pt-[120px] pb-20 px-6 selection:bg-[#D4AF37]/30 text-[#ffffff]">
          <Link to="/seller/products">Products</Link>
    </div>
  );
}

export default SellerPage
