import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getSellerProductById, updateProduct } from "../sellerSlice.js";

const SellerEditProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentProduct, loading, error } = useSelector(
    (state) => state.seller,
  );

  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
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
    storageType: "",
    gpu: "",
    ports: "",
    connectivity: "",
  });

  useEffect(() => {
    dispatch(getSellerProductById(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (currentProduct) {
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

      // Set existing images
      if (currentProduct.images && currentProduct.images.length > 0) {
        setExistingImages(currentProduct.images || []);
      }
    }
  }, [currentProduct]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleRemoveExistingImage = (publicId) => {
    setExistingImages(
      existingImages.filter((img) => img.public_id !== publicId),
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    existingImages.forEach((img) => data.append("keepImages", img.public_id));

    // Add form data
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    // Add new images
    images.forEach((img) => data.append("images", img));

    const result = await dispatch(
      updateProduct({ formData: data, productId: id }),
    );
    if (updateProduct.fulfilled.match(result)) {
      navigate("/seller/products");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#08080E] flex items-center justify-center">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#08080E] flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!currentProduct) {
    return (
      <div className="min-h-screen bg-[#08080E] flex items-center justify-center">
        <p className="text-white">Product not found</p>
      </div>
    );
  }

  const productCategory = currentProduct.category || currentProduct.type;
  const isLaptop = productCategory === "laptop";
  const isPhone = productCategory === "phone";

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[#F5F0E8] text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-all placeholder:text-white/20 disabled:opacity-50 disabled:cursor-not-allowed";
  const labelClass =
    "text-[#D4AF37] text-[9px] uppercase tracking-[0.3em] font-black mb-2 block";
  const sectionTitle =
    "text-white/20 text-[9px] uppercase tracking-[0.5em] font-bold mb-6 flex items-center gap-4 before:h-[1px] before:flex-1 before:bg-white/5 after:h-[1px] after:flex-1 after:bg-white/5";

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
            <p className="text-red-400 text-[10px] uppercase tracking-widest font-bold">
              {error}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="relative group">
            <div className="absolute -inset-[1px] bg-gradient-to-b from-white/10 to-transparent rounded-[32px] pointer-events-none" />

            <div className="relative bg-[#0C0C12]/60 backdrop-blur-3xl rounded-[32px] p-6 md:p-12 shadow-2xl">
              {/* Type Display - DISABLED (Cannot Change) */}
              <div className="mb-12">
                <label className={labelClass}>Collection Category</label>
                <div className="grid grid-cols-2 gap-4 p-1.5 bg-black/40 rounded-2xl border border-white/5">
                  {["phone", "laptop"].map((t) => (
                    <div
                      key={t}
                      className={`py-4 rounded-xl text-[10px] uppercase tracking-[0.2em] font-black transition-all duration-500 text-center ${
                        productCategory === t
                          ? "bg-[#D4AF37] text-[#08080E] shadow-[0_0_25px_rgba(212,175,55,0.2)]"
                          : "bg-white/5 text-white/30"
                      }`}
                    >
                      {t === "phone" ? "Mobile Handset" : "Portable Computing"}
                    </div>
                  ))}
                </div>
                <p className="text-[#D4AF37]/50 text-[8px] uppercase tracking-wider mt-3 text-center">
                  Category cannot be changed. Delete and recreate if needed.
                </p>
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
                      <label className={labelClass}>
                        Editorial Description
                      </label>
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

                {/* Common Specs for Both Phone & Laptop */}
                <section>
                  <h3 className={sectionTitle}>Technical Specifications</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="md:col-span-2">
                      <label className={labelClass}>Processor / Chipset</label>
                      <input
                        name="processor"
                        value={formData.processor}
                        onChange={handleChange}
                        placeholder="e.g. A17 Pro / Intel i7"
                        className={inputClass}
                      />
                    </div>
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
                      <label className={labelClass}>Operating System</label>
                      <input
                        name="os"
                        value={formData.os}
                        onChange={handleChange}
                        placeholder="e.g. iOS 18 / Windows 11"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Display Size</label>
                      <input
                        name="displaySize"
                        value={formData.displaySize}
                        onChange={handleChange}
                        placeholder="e.g. 6.7 inches"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Battery</label>
                      <input
                        name="battery"
                        value={formData.battery}
                        onChange={handleChange}
                        placeholder="e.g. 4500mAh"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Camera</label>
                      <input
                        name="camera"
                        value={formData.camera}
                        onChange={handleChange}
                        placeholder="e.g. 48MP + 12MP"
                        className={inputClass}
                      />
                    </div>
                  </div>
                </section>

                {/* Laptop-Only Section */}
                {isLaptop && (
                  <section className="animate-in fade-in slide-in-from-top-4 duration-500">
                    <h3 className={sectionTitle}>Exclusive Laptop Modules</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className={labelClass}>Storage Type</label>
                        <input
                          name="storageType"
                          value={formData.storageType}
                          onChange={handleChange}
                          placeholder="e.g. SSD, NVMe, HDD"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Graphics (GPU)</label>
                        <input
                          name="gpu"
                          value={formData.gpu}
                          onChange={handleChange}
                          placeholder="e.g. RTX 4060"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Ports</label>
                        <input
                          name="ports"
                          value={formData.ports}
                          onChange={handleChange}
                          placeholder="e.g. USB-C, HDMI, Thunderbolt"
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
                  </section>
                )}

                {/* Phone-Only Section (if needed in future) */}
                {isPhone && (
                  <section className="animate-in fade-in slide-in-from-top-4 duration-500">
                    <h3 className={sectionTitle}>Mobile Specific</h3>
                    <div className="grid grid-cols-1 gap-6">
                      <div className="bg-white/5 rounded-xl p-4 text-center">
                        <p className="text-white/40 text-[10px] uppercase tracking-widest">
                          All mobile specifications are covered in the common
                          specs section above.
                        </p>
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
                              src={img.url}
                              className="w-full h-full object-cover"
                              alt={`product-${i}`}
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              handleRemoveExistingImage(img.public_id)
                            }
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
                        <div
                          key={i}
                          className="w-20 h-20 rounded-xl overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all"
                        >
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
