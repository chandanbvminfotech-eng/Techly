// src/features/seller/pages/SellerOrdersPage.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSellerOrders } from '../sellerSlice';
import SellerOrderCard from '../components/SellerOrderCard';

const SellerOrdersPage = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.seller);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    dispatch(getSellerOrders());
  }, [dispatch]);

  const filteredOrders = orders?.data?.orders?.filter(order => 
    filterStatus === 'all' || order.orderId?.status === filterStatus
  ) || [];

  const statusCounts = {
    all: orders?.data?.totalOrders || 0,
    pending: orders?.data?.orders?.filter(o => o.orderId?.status === 'pending').length || 0,
    confirmed: orders?.data?.orders?.filter(o => o.orderId?.status === 'confirmed').length || 0,
    processing: orders?.data?.orders?.filter(o => o.orderId?.status === 'processing').length || 0,
    shipped: orders?.data?.orders?.filter(o => o.orderId?.status === 'shipped').length || 0,
    delivered: orders?.data?.orders?.filter(o => o.orderId?.status === 'delivered').length || 0,
  };

  return (
    <div className="min-h-screen bg-[#08080E] pt-[120px] pb-24 px-4 selection:bg-[#D4AF37]/30">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col mb-16 border-l-2 border-[#D4AF37] pl-8">
          <span className="text-[#D4AF37] text-[11px] uppercase tracking-[0.4em] font-bold mb-3 opacity-60">
            Order Management
          </span>
          <h2 className="text-[40px] md:text-[60px] font-[Georgia,serif] text-[#F5F0E8] leading-tight">
            Incoming <span className="italic text-[#D4AF37]">Orders</span>
          </h2>
          <p className="text-white/30 text-sm mt-4 max-w-2xl">
            Track and manage customer orders, update statuses, and process shipments
          </p>
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-8 p-4 rounded-xl bg-red-500/5 border border-red-500/20 text-center">
            <p className="text-red-400 text-[10px] uppercase tracking-widest font-bold">{error}</p>
          </div>
        )}

        {/* Status Filters */}
        <div className="mb-8 flex flex-wrap gap-3 p-1.5 bg-black/40 rounded-2xl border border-white/5">
          {['all', 'pending', 'confirmed', 'processing', 'shipped', 'delivered'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-6 py-2 rounded-xl text-[10px] uppercase tracking-[0.2em] font-black transition-all duration-500 ${
                filterStatus === status
                  ? 'bg-[#D4AF37] text-[#08080E] shadow-[0_0_25px_rgba(212,175,55,0.2)]'
                  : 'text-white/30 hover:text-white/60'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)} ({statusCounts[status]})
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && filteredOrders.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#D4AF37] border-r-transparent"></div>
              <p className="text-white/40 text-[10px] uppercase tracking-widest mt-4">Loading orders...</p>
            </div>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📦</div>
            <p className="text-white/40 text-sm uppercase tracking-wider">No orders found</p>
            {filterStatus !== 'all' && (
              <button
                onClick={() => setFilterStatus('all')}
                className="mt-4 text-[#D4AF37] text-xs uppercase tracking-wider hover:underline"
              >
                View all orders
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <SellerOrderCard key={order._id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerOrdersPage;