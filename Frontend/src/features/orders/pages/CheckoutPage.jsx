import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAddresses } from "../../address/addressSlice";
import { placeOrder } from "../orderSlice";
import { clearCart } from "../../cart/cartSlice";

import AddressSelector from "../components/AddressSelector";
import PaymentSelector from "../components/PaymentSelector";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Accessing state exactly as defined in your CartPage
  const { cart, isLoading: orderLoading } = useSelector((state) => state.cart);
  const { addresses, isLoading: addressesLoading } = useSelector(
    (state) => state.address,
  );
  const user = useSelector((state) => state.auth.user);

  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [error, setError] = useState("");

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  useEffect(() => {
    if (addresses.length > 0 && !selectedAddressId) {
      const defaultAddr = addresses.find((addr) => addr.isDefault);
      setSelectedAddressId(defaultAddr?._id || addresses[0]?._id);
    }
  }, [addresses, selectedAddressId]);

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      setError("Please select a shipping address");
      return;
    }

    // Using cart.items.length based on your quantityCheck logic
    if (!cart?.items || cart.items.length === 0) {
      setError("Your cart is empty");
      return;
    }

    setError("");

    const orderData = {
      addressId: selectedAddressId,
      paymentMethod,
      // Mapping items based on your Cart structure: item.productId
      items: cart.items.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
        price: item.productId.price,
      })),
      totalAmount: cart.totalAmount,
    };

    try {
      const result = await dispatch(placeOrder(orderData)).unwrap();
      dispatch(clearCart());
      navigate(`/order-success/${result.data._id}`);
    } catch (err) {
      setError(err || "Failed to place order");
    }
  };

  if (addressesLoading) {
    return (
      <div className="min-h-screen bg-[#08080E] flex items-center justify-center">
        <p className="text-[#D4AF37] font-['DM_Sans'] uppercase tracking-widest text-sm animate-pulse">
          Retrieving your secure profile...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#08080E] pt-[100px] md:pt-[140px] pb-24 px-4 md:px-6 selection:bg-[#D4AF37]/30">
      <div className="max-w-[1200px] mx-auto">
        {/* Editorial Header */}
        <div className="flex flex-col mb-8 md:mb-12 border-l-2 border-[#D4AF37] pl-4 md:pl-6">
          <span className="text-[#D4AF37] text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold mb-2">
            Secure Transaction
          </span>
          <h2 className="text-[32px] md:text-[52px] font-[Georgia,serif] text-[#F5F0E8] leading-tight md:leading-none">
            Finalize <span className="italic">Purchase</span>
          </h2>
        </div>

        {error && (
          <div className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/30 backdrop-blur-md">
            <p className="text-red-400 text-sm font-medium text-center">
              {error}
            </p>
          </div>
        )}

        <div className="grid lg:grid-cols-[1fr_400px] gap-8 items-start">
          {/* Left Column - Selectors */}
          <div className="space-y-6">
            <div className="relative p-[1px] rounded-[24px] bg-gradient-to-b from-white/10 to-transparent">
              <div className="bg-[#0C0C12]/80 backdrop-blur-3xl rounded-[23px] p-6 md:p-8">
                <AddressSelector
                  addresses={addresses}
                  selectedAddressId={selectedAddressId}
                  onSelectAddress={setSelectedAddressId}
                />

                <div className="h-[1px] w-full bg-white/5 my-8" />

                <PaymentSelector
                  paymentMethod={paymentMethod}
                  onSelectPayment={setPaymentMethod}
                />
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary Vault */}
          <div className="sticky top-[100px] lg:top-[140px]">
            <div className="relative group">
              <div className="absolute -inset-[1px] bg-gradient-to-b from-[#D4AF37]/20 to-transparent rounded-[24px] blur-md opacity-50" />

              <div className="relative bg-[#0C0C12]/90 border border-white/5 rounded-[24px] overflow-hidden backdrop-blur-3xl shadow-2xl p-6 md:p-8">
                <h3 className="text-[#F5F0E8] font-[Georgia,serif] italic text-xl mb-6">
                  Order Summary
                </h3>

                <div className="space-y-5 max-h-[300px] overflow-y-auto mb-8 pr-2 custom-scrollbar">
                  {cart?.items?.map((item) => (
                    <div
                      key={item.productId._id}
                      className="flex gap-4 items-center"
                    >
                      <div className="w-14 h-14 shrink-0 bg-white rounded-lg p-2 flex items-center justify-center">
                        <img
                          src={item.productId.images?.[0]?.url}
                          alt={item.productId.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[#F5F0E8] text-sm font-medium truncate">
                          {item.productId.name}
                        </p>
                        <p className="text-[rgba(245,240,232,0.4)] text-[11px] uppercase tracking-wider font-bold">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="text-[#F5F0E8] text-sm font-['DM_Sans']">
                        ₹
                        {(
                          item.productId.price * item.quantity
                        ).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/10 pt-6 space-y-3">
                  <div className="flex justify-between text-[rgba(245,240,232,0.5)] text-xs uppercase tracking-widest font-bold">
                    <span>Subtotal</span>
                    <span>₹{cart?.totalAmount?.toLocaleString() || 0}</span>
                  </div>
                  <div className="flex justify-between text-[rgba(245,240,232,0.5)] text-xs uppercase tracking-widest font-bold">
                    <span>Delivery</span>
                    <span className="text-[#D4AF37]">Complimentary</span>
                  </div>

                  <div className="pt-4 flex flex-col items-end">
                    <span className="text-[rgba(245,240,232,0.4)] text-[10px] uppercase tracking-[0.2em] font-bold mb-1">
                      Total Investment
                    </span>
                    <span className="text-[32px] font-[Georgia,serif] text-[#F5E090] leading-none">
                      ₹{cart?.totalAmount?.toLocaleString() || 0}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  disabled={orderLoading || addresses.length === 0}
                  className="group relative w-full mt-8 overflow-hidden bg-[#D4AF37] px-6 py-4 rounded-full transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(212,175,55,0.2)] active:scale-95 disabled:opacity-30 disabled:hover:scale-100"
                >
                  <span className="relative z-10 text-[#08080E] text-sm font-black uppercase tracking-[0.2em]">
                    {orderLoading ? "Processing..." : "Place Order"}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
