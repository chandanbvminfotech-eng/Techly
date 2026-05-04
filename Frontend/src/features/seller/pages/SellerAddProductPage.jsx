import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../sellerSlice.js";

const SellerAddProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.seller);

  const [type, setType] = useState("phone");
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    brand: "",
    price: "",
    stock: "",
    ram: "",
    storage: "",
    processor: "",
    os: "",
    displaySize: "",
    battery: "",
    camera: "",
    // laptop only
    storageType: "",
    gpu: "",
    ports: "",
    connectivity: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("type", type);
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });
    images.forEach((img) => data.append("images", img));

    const result = await dispatch(addProduct(data));
    if (addProduct.fulfilled.match(result)) {
      navigate("/seller/products");
    }
  };

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[#F5F0E8] text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-all placeholder:text-white/20";
  const labelClass =
    "text-[#D4AF37] text-[9px] uppercase tracking-[0.3em] font-black mb-2 block";

  return (
    <div className="min-h-screen bg-[#08080E] pt-[100px] md:pt-[140px] pb-24 px-4 md:px-10 selection:bg-[#D4AF37]/30">
      <div className="max-w-[800px] mx-auto">
        {/* Header */}
        <div className="flex flex-col mb-12 border-l-2 border-[#D4AF37] pl-6">
          <span className="text-[#D4AF37] text-[10px] uppercase tracking-[0.3em] font-bold mb-2">
            Seller Dashboard
          </span>
          <h2 className="text-[32px] md:text-[52px] font-[Georgia,serif] text-[#F5F0E8] leading-none">
            Add <span className="italic">Product</span>
          </h2>
        </div>

        {error && (
          <div className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/30">
            <p className="text-red-400 text-sm text-center">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="relative p-[1px] rounded-[24px] bg-gradient-to-b from-white/10 to-transparent">
            <div className="bg-[#0C0C12]/90 backdrop-blur-3xl rounded-[23px] p-8 space-y-8">
              {/* Product Type */}
              <div>
                <label className={labelClass}>Product Type</label>
                <div className="flex gap-4">
                  {["phone", "laptop"].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setType(t)}
                      className={`flex-1 py-3 rounded-xl text-xs uppercase tracking-widest font-black transition-all duration-200 ${
                        type === t
                          ? "bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30"
                          : "border border-white/10 text-white/40 hover:border-white/30"
                      }`}
                    >
                      {t === "phone" ? "📱 Phone" : "💻 Laptop"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-[1px] bg-white/5" />

              {/* Base Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Product Name</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. OnePlus 13"
                    className={inputClass}
                    required
                  />
                </div>
                <div>
                  <label className={labelClass}>Brand</label>
                  <input
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    placeholder="e.g. OnePlus"
                    className={inputClass}
                    required
                  />
                </div>
                <div>
                  <label className={labelClass}>Price (₹)</label>
                  <input
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="e.g. 80000"
                    className={inputClass}
                    required
                  />
                </div>
                <div>
                  <label className={labelClass}>Stock</label>
                  <input
                    name="stock"
                    type="number"
                    value={formData.stock}
                    onChange={handleChange}
                    placeholder="e.g. 50"
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Product description..."
                  rows={3}
                  className={`${inputClass} resize-none`}
                  required
                />
              </div>

              <div className="h-[1px] bg-white/5" />

              {/* Common Specs */}
              <div>
                <p className={labelClass}>Specifications</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClass}>RAM</label>
                    <input
                      name="ram"
                      value={formData.ram}
                      onChange={handleChange}
                      placeholder="e.g. 8GB"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Storage</label>
                    <input
                      name="storage"
                      value={formData.storage}
                      onChange={handleChange}
                      placeholder="e.g. 256GB"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Processor</label>
                    <input
                      name="processor"
                      value={formData.processor}
                      onChange={handleChange}
                      placeholder="e.g. Snapdragon 8 Gen 3"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>OS</label>
                    <input
                      name="os"
                      value={formData.os}
                      onChange={handleChange}
                      placeholder="e.g. Android 15"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Display Size (inches)</label>
                    <input
                      name="displaySize"
                      type="number"
                      value={formData.displaySize}
                      onChange={handleChange}
                      placeholder="e.g. 6.7"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Battery (mAh)</label>
                    <input
                      name="battery"
                      type="number"
                      value={formData.battery}
                      onChange={handleChange}
                      placeholder="e.g. 5000"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Camera</label>
                    <input
                      name="camera"
                      value={formData.camera}
                      onChange={handleChange}
                      placeholder="e.g. 50MP + 12MP"
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              {/* Laptop Only Fields */}
              {type === "laptop" && (
                <>
                  <div className="h-[1px] bg-white/5" />
                  <div>
                    <p className={labelClass}>Laptop Specifications</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className={labelClass}>Storage Type</label>
                        <input
                          name="storageType"
                          value={formData.storageType}
                          onChange={handleChange}
                          placeholder="e.g. SSD"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>GPU</label>
                        <input
                          name="gpu"
                          value={formData.gpu}
                          onChange={handleChange}
                          placeholder="e.g. NVIDIA RTX 4060"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Ports</label>
                        <input
                          name="ports"
                          value={formData.ports}
                          onChange={handleChange}
                          placeholder="e.g. USB-C, HDMI, USB-A"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Connectivity</label>
                        <input
                          name="connectivity"
                          value={formData.connectivity}
                          onChange={handleChange}
                          placeholder="e.g. WiFi 6, Bluetooth 5.3"
                          className={inputClass}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="h-[1px] bg-white/5" />

              {/* Images */}
              <div>
                <label className={labelClass}>Product Images (max 5)</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/50 text-sm focus:outline-none focus:border-[#D4AF37]/50 file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-black file:uppercase file:tracking-widest file:bg-[#D4AF37]/20 file:text-[#D4AF37] cursor-pointer"
                />
                {images.length > 0 && (
                  <div className="flex gap-3 mt-4 flex-wrap">
                    {Array.from(images).map((img, i) => (
                      <img
                        key={i}
                        src={URL.createObjectURL(img)}
                        className="w-16 h-16 rounded-xl object-cover border border-white/10"
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full overflow-hidden bg-gradient-to-br from-[#D4AF37] to-[#B8941E] px-6 py-4 rounded-full text-[#08080E] text-sm font-black uppercase tracking-[0.2em] hover:shadow-[0_20px_40px_rgba(212,175,55,0.3)] hover:scale-[1.01] transition-all duration-300 disabled:opacity-40"
              >
                <span className="relative z-10">
                  {loading ? "Uploading..." : "List Product"}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellerAddProductPage;
