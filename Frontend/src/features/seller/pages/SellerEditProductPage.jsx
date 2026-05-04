// src/features/seller/pages/SellerEditProductPage.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateProduct, getSellerProducts } from "../sellerSlice.js";

const SellerEditProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading, error, products } = useSelector((state) => state.seller);

  const [type, setType] = useState("phone");
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [removedImages, setRemovedImages] = useState([]);
  const [formData, setFormData] = useState({
    name: "", description: "", brand: "", price: "", stock: "",
    ram: "", storage: "", processor: "", os: "", displaySize: "",
    battery: "", camera: "", storageType: "", gpu: "",
    ports: "", connectivity: "",
  });

  // Find the current product from products list
  const currentProduct = products?.data?.products?.find(p => p._id === id);

  useEffect(() => {
    // If products not loaded or product not found, fetch products
    if (!products?.data?.products || products.data.products.length === 0) {
      dispatch(getSellerProducts({ page: 1, limit: 100 }));
    }
  }, [dispatch, products]);

  useEffect(() => {
    if (currentProduct) {
      setType(currentProduct.type || "phone");
      setExistingImages(currentProduct.images || []);
      setFormData({
        name: currentProduct.name || "",
        description: currentProduct.description || "",
        brand: currentProduct.brand || "",
        price: currentProduct.price || "",
        stock: currentProduct.stock || "",
        ram: currentProduct.ram || "",
        storage: currentProduct.storage || "",
        processor: currentProduct.processor || "",
        os: currentProduct.os || "",
        displaySize: currentProduct.displaySize || "",
        battery: currentProduct.battery || "",
        camera: currentProduct.camera || "",
        storageType: currentProduct.storageType || "",
        gpu: currentProduct.gpu || "",
        ports: currentProduct.ports || "",
        connectivity: currentProduct.connectivity || "",
      });
    }
  }, [currentProduct]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleRemoveExistingImage = (imageUrl) => {
    setRemovedImages([...removedImages, imageUrl]);
    setExistingImages(existingImages.filter(img => img !== imageUrl));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    
    // Append product type
    formDataToSend.append("type", type);
    
    // Append all form fields
    Object.entries(formData).forEach(([key, value]) => {
      if (value && value.toString().trim() !== "") {
        formDataToSend.append(key, value);
      }
    });
    
    // Append new images
    images.forEach((img) => {
      formDataToSend.append("images", img);
    });
    
    // Append removed images list
    if (removedImages.length > 0) {
      formDataToSend.append("removedImages", JSON.stringify(removedImages));
    }

    try {
      const result = await dispatch(updateProduct({ productId: id, formData: formDataToSend }));
      if (updateProduct.fulfilled.match(result)) {
        navigate("/seller/products");
      }
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const inputClass = "w-full bg-[#0C0C12] border border-white/5 rounded-xl px-4 py-3.5 text-[#F5F0E8] text-sm focus:outline-none focus:border-[#D4AF37]/50 focus:bg-[#14141C] transition-all placeholder:text-white/10";
  const labelClass = "text-[#D4AF37] text-[10px] uppercase tracking-[0.3em] font-black mb-2.5 block opacity-80";
  const sectionTitle = "text-white/20 text-[9px] uppercase tracking-[0.5em] font-bold mb-6 flex items-center gap-4 before:h-[1px] before:flex-1 before:bg-white/5 after:h-[1px] after:flex-1 after:bg-white/5";

  // Loading state
  if (loading && !currentProduct) {
    return (
      <div className="min-h-screen bg-[#08080E] pt-[120px] flex items-start justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#D4AF37] border-r-transparent"></div>
          <p className="text-white/40 text-[10px] uppercase tracking-widest mt-4">Loading product data...</p>
        </div>
      </div>
    );
  }

  // Product not found
  if (!currentProduct && !loading) {
    return (
      <div className="min-h-screen bg-[#08080E] pt-[120px] pb-24 px-4">
        <div className="max-w-[850px] mx-auto text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-3xl font-[Georgia,serif] text-[#F5F0E8] mb-4">Product Not Found</h2>
          <p className="text-white/40 mb-8">The product you're trying to edit doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate("/seller/products")}
            className="px-6 py-3 rounded-full bg-[#D4AF37] text-[#08080E] text-[11px] font-black uppercase tracking-[0.4em] hover:shadow-[0_0_50px_rgba(212,175,55,0.3)] transition-all"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#08080E] pt-[120px] pb-24 px-4 selection:bg-[#D4AF37]/30">
      <div className="max-w-[850px] mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col mb-16 border-l-2 border-[#D4AF37] pl-8">
          <span className="text-[#D4AF37] text-[11px] uppercase tracking-[0.4em] font-bold mb-3 opacity-60">
            Inventory Management
          </span>
          <h2 className="text-[40px] md:text-[60px] font-[Georgia,serif] text-[#F5F0E8] leading-tight">
            Edit <span className="italic text-[#D4AF37]">Acquisition</span>
          </h2>
          <p className="text-white/30 text-xs tracking-wide mt-4 font-mono">
            Modifying: {formData.name || "Unnamed Product"}
          </p>
        </div>

        {error && (
          <div className="mb-8 p-4 rounded-xl bg-red-500/5 border border-red-500/20 text-center">
            <p className="text-red-400 text-[10px] uppercase tracking-widest font-bold">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Glass Card Container */}
          <div className="relative group">
            <div className="absolute -inset-[1px] bg-gradient-to-b from-white/10 to-transparent rounded-[32px] pointer-events-none" />
            
            <div className="relative bg-[#0C0C12]/60 backdrop-blur-3xl rounded-[32px] p-6 md:p-12 shadow-2xl">
              
              {/* Type Toggle */}
              <div className="mb-12">
                <label className={labelClass}>Collection Category</label>
                <div className="grid grid-cols-2 gap-4 p-1.5 bg-black/40 rounded-2xl border border-white/5">
                  {["phone", "laptop"].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setType(t)}
                      className={`py-4 rounded-xl text-[10px] uppercase tracking-[0.2em] font-black transition-all duration-500 ${
                        type === t
                          ? "bg-[#D4AF37] text-[#08080E] shadow-[0_0_25px_rgba(212,175,55,0.2)]"
                          : "text-white/30 hover:text-white/60"
                      }`}
                    >
                      {t === "phone" ? "Mobile Handset" : "Portable Computing"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Core Information */}
              <div className="space-y-12">
                <section>
                  <h3 className={sectionTitle}>Essential Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className={labelClass}>Product Identity</label>
                      <input 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        placeholder="e.g. iPhone 16 Pro" 
                        className={inputClass} 
                        required 
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Manufacturer / Brand</label>
                      <input 
                        name="brand" 
                        value={formData.brand} 
                        onChange={handleChange} 
                        placeholder="e.g. Apple" 
                        className={inputClass} 
                        required 
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>Valuation (₹)</label>
                        <input 
                          name="price" 
                          type="number" 
                          value={formData.price} 
                          onChange={handleChange} 
                          placeholder="0" 
                          className={inputClass} 
                          required 
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Availability</label>
                        <input 
                          name="stock" 
                          type="number" 
                          value={formData.stock} 
                          onChange={handleChange} 
                          placeholder="0" 
                          className={inputClass} 
                          required 
                        />
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className={labelClass}>Editorial Description</label>
                      <textarea 
                        name="description" 
                        value={formData.description} 
                        onChange={handleChange} 
                        rows={4} 
                        className={`${inputClass} resize-none`} 
                        required 
                      />
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className={sectionTitle}>Technical Specifications</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="md:col-span-2">
                      <label className={labelClass}>Processor</label>
                      <input 
                        name="processor" 
                        value={formData.processor} 
                        onChange={handleChange} 
                        placeholder="Chipset" 
                        className={inputClass} 
                      />
                    </div>
                    <div>
                      <label className={labelClass}>RAM</label>
                      <input 
                        name="ram" 
                        value={formData.ram} 
                        onChange={handleChange} 
                        placeholder="e.g. 12GB" 
                        className={inputClass} 
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Storage</label>
                      <input 
                        name="storage" 
                        value={formData.storage} 
                        onChange={handleChange} 
                        placeholder="e.g. 512GB" 
                        className={inputClass} 
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Operating System</label>
                      <input 
                        name="os" 
                        value={formData.os} 
                        onChange={handleChange} 
                        placeholder="Version" 
                        className={inputClass} 
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Display Size</label>
                      <input 
                        name="displaySize" 
                        value={formData.displaySize} 
                        onChange={handleChange} 
                        placeholder="Inches" 
                        className={inputClass} 
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Battery</label>
                      <input 
                        name="battery" 
                        value={formData.battery} 
                        onChange={handleChange} 
                        placeholder="Capacity" 
                        className={inputClass} 
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Optics</label>
                      <input 
                        name="camera" 
                        value={formData.camera} 
                        onChange={handleChange} 
                        placeholder="MP Rating" 
                        className={inputClass} 
                      />
                    </div>
                  </div>
                </section>

                {type === "laptop" && (
                  <section className="animate-in fade-in slide-in-from-top-4 duration-500">
                    <h3 className={sectionTitle}>Exclusive Laptop Modules</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className={labelClass}>Drive Type</label>
                          <input 
                            name="storageType" 
                            value={formData.storageType} 
                            onChange={handleChange} 
                            placeholder="SSD / NVMe" 
                            className={inputClass} 
                          />
                        </div>
                        <div>
                          <label className={labelClass}>Graphics</label>
                          <input 
                            name="gpu" 
                            value={formData.gpu} 
                            onChange={handleChange} 
                            placeholder="GPU Model" 
                            className={inputClass} 
                          />
                        </div>
                      </div>
                      <div>
                        <label className={labelClass}>Interface Ports</label>
                        <input 
                          name="ports" 
                          value={formData.ports} 
                          onChange={handleChange} 
                          placeholder="USB-C, HDMI..." 
                          className={inputClass} 
                        />
                      </div>
                    </div>
                  </section>
                )}

                {/* Existing Images Section */}
                {existingImages.length > 0 && (
                  <section>
                    <h3 className={sectionTitle}>Current Media Assets</h3>
                    <div className="flex gap-4 mt-6 flex-wrap">
                      {existingImages.map((img, i) => (
                        <div key={i} className="relative group/image">
                          <div className="w-24 h-24 rounded-xl overflow-hidden border border-white/10">
                            <img 
                              src={img} 
                              className="w-full h-full object-cover" 
                              alt={`product-${i}`} 
                              onError={(e) => { e.target.src = '/api/placeholder/96/96'; }}
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveExistingImage(img)}
                            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500/80 text-white text-xs hover:bg-red-600 transition-all flex items-center justify-center opacity-0 group-hover/image:opacity-100"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* New Images Section */}
                <section>
                  <h3 className={sectionTitle}>Add New Media Assets</h3>
                  <div className="relative group cursor-pointer">
                    <input
                      type="file" 
                      accept="image/*" 
                      multiple 
                      onChange={handleImageChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="border-2 border-dashed border-white/5 rounded-2xl p-10 text-center hover:border-[#D4AF37]/30 transition-all">
                      <p className="text-white/40 text-[10px] uppercase tracking-widest font-black">
                        Drop high-resolution artifacts here
                      </p>
                      <p className="text-white/20 text-[8px] uppercase tracking-wider mt-2">
                        or click to browse
                      </p>
                    </div>
                  </div>
                  {images.length > 0 && (
                    <div className="flex gap-4 mt-6 flex-wrap">
                      {Array.from(images).map((img, i) => (
                        <div key={i} className="w-20 h-20 rounded-xl overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all">
                          <img 
                            src={URL.createObjectURL(img)} 
                            className="w-full h-full object-cover" 
                            alt={`preview-${i}`}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </section>

                <div className="flex gap-4 pt-6">
                  <button
                    type="button"
                    onClick={() => navigate("/seller/products")}
                    className="flex-1 py-6 rounded-full bg-white/5 text-white/60 text-[11px] font-black uppercase tracking-[0.4em] hover:bg-white/10 hover:text-white/80 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-6 rounded-full bg-[#D4AF37] text-[#08080E] text-[11px] font-black uppercase tracking-[0.4em] hover:shadow-[0_0_50px_rgba(212,175,55,0.3)] transition-all active:scale-[0.98] disabled:opacity-20"
                  >
                    {loading ? "Updating..." : "Update Listing"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellerEditProductPage;