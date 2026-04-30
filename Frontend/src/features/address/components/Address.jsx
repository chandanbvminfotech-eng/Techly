// Address.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddresses } from "../addressSlice";
import AddressCard from "./AddressCard";
import AddressForm from "./AddressForm";
import Modal from "../../../components/Modal";

const Address = () => {
  const dispatch = useDispatch();
  const { addresses, loading } = useSelector((state) => state.address);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  const handleOpenCreate = () => {
    setEditingAddress(null);
    setIsModalOpen(true);
  };

  const handleEdit = (address) => {
    setEditingAddress(address);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-8 duration-1000">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12 pb-8 border-b border-white/5">
        <div className="flex items-center gap-5">
          {/* Vertical Brand Accent */}
          <div className="w-[2px] h-14 bg-gradient-to-b from-[#D4AF37] via-[#D4AF37]/50 to-transparent" />
          <div>
            <span className="text-[#D4AF37] text-[10px] uppercase tracking-[0.4em] font-black block mb-1">
              Logistics Interface
            </span>
            <h2 className="text-4xl font-[Georgia,serif] text-[#F5F0E8] tracking-tight">
              Shipping <span className="italic text-[#F5E090]">Ledger</span>
            </h2>
          </div>
        </div>

        <button
          className="group relative overflow-hidden px-10 py-4 rounded-xl border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all duration-500 shadow-lg shadow-black/20"
          onClick={handleOpenCreate}
        >
          <span className="relative z-10 text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.2em]">
            + Add New Destination
          </span>
          <div className="absolute inset-0 bg-[#D4AF37]/5 -translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
        </button>
      </div>

      {/* Content Area */}
      <div className="relative min-h-[400px]">
        {loading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-[1px] bg-[#D4AF37] animate-pulse" />
            <span className="text-[#F5F0E8]/20 uppercase tracking-[0.6em] text-[9px] font-bold">
              Synchronizing Vault
            </span>
          </div>
        ) : addresses && addresses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {addresses.map((item) => (
              <AddressCard
                key={item._id}
                address={item}
                onEdit={() => handleEdit(item)}
              />
            ))}
          </div>
        ) : (
          <div className="py-32 rounded-[40px] border border-dashed border-white/5 bg-white/[0.01] flex flex-col items-center justify-center text-center">
            <div className="mb-6 opacity-20">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#D4AF37"
                strokeWidth="1"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <p className="text-[rgba(245,240,232,0.3)] font-[Georgia,serif] italic text-xl tracking-wide">
              Your shipping registry is currently empty.
            </p>
          </div>
        )}
      </div>

      {/* Terminal Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="text-center mb-10">
          <div className="inline-block px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 mb-4">
            <span className="text-[#D4AF37] text-[9px] uppercase tracking-[0.3em] font-black">
              {editingAddress ? "Accessing Record" : "New Registry"}
            </span>
          </div>
          <h2 className="text-3xl font-[Georgia,serif] text-[#F5F0E8]">
            {editingAddress ? "Modify" : "Create"}{" "}
            <span className="italic">Destination</span>
          </h2>
        </div>

        <AddressForm
          initialData={editingAddress}
          onSuccess={() => setIsModalOpen(false)}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default Address;
