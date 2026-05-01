import React from "react";
import { useDispatch } from "react-redux";
import { deleteAddress } from "../addressSlice";
import { useNavigate } from "react-router-dom";

const AddressCard = ({ address,onEdit }) => {
  const dispatch = useDispatch();
  const navigate=useNavigate()

  const handleDeleteAddress = async() => {
    if (!address._id) {
      return null;
    }
    await dispatch(deleteAddress(address._id))
  }
  return (
    <div
      className={`relative p-6 rounded-2xl border transition-all duration-500 backdrop-blur-xl group
        ${
          address?.isDefault
            ? "border-[#D4AF37] bg-[rgba(212,175,55,0.08)] shadow-[0_10px_40px_rgba(212,175,55,0.15)]"
            : "border-white/5 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
        }`}
    >
      {/* Luxury Status Badge */}
      {address?.isDefault && (
        <div className="absolute top-4 right-4 flex items-center gap-2 bg-[#D4AF37] px-3 py-1 rounded-full shadow-lg">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#08080E] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#08080E]"></span>
          </span>
          <span className="text-[#08080E] text-[9px] font-black uppercase tracking-[0.2em]">
            Default Address
          </span>
        </div>
      )}

      {/* Identity Section */}
      <div className="mb-5">
        <h3 className="text-[#F5F0E8] text-lg font-[Georgia,serif] tracking-tight group-hover:text-[#D4AF37] transition-colors">
          {address?.name}
        </h3>
        <p className="text-[10px] text-[rgba(245,240,232,0.4)] font-bold uppercase tracking-[0.2em] mt-1">
          Phone No: <span className="text-[#F5F0E8]/80">{address?.phone}</span>
        </p>
      </div>

      {/* Logistics Details */}
      <div className="text-[rgba(245,240,232,0.6)] text-sm leading-relaxed mb-8 font-light space-y-1">
        <p className="line-clamp-1">{address?.addressLine}</p>
        <p>
          {address?.city}, {address?.state}
        </p>
        <div className="pt-2">
          <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[#F5E090] font-mono text-[10px] tracking-widest">
            {address?.pincode}
          </span>
        </div>
      </div>

      {/* Interaction Layer */}
      <div className="flex items-center justify-between pt-5 border-t border-white/5">
        <div className="flex gap-6">
          <button
            className="text-[10px] text-[#D4AF37]/60 font-black uppercase tracking-widest hover:text-[#D4AF37] transition-all relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[1px] after:bg-[#D4AF37] hover:after:w-full after:transition-all"
            onClick={onEdit}          
          >
            Edit
          </button>
          <button
            className="text-[10px] text-red-400/40 font-black uppercase tracking-widest hover:text-red-400 transition-all"
            onClick={handleDeleteAddress}
          >
            Remove
          </button>
        </div>

        <span className="text-[rgba(245,240,232,0.15)] text-[9px] font-mono uppercase tracking-tighter">
          Ref: {new Date(address?.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

export default AddressCard;
