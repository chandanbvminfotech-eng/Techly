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
  const { cart, isLoading: orderLoading } = useSelector((state) => state.cart);
  const { addresses, isLoading: addressesLoading } = useSelector((state) => state.address);
  const user = useSelector((state) => state.auth.user);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [error, setError] = useState("");

  useEffect(() => { dispatch(fetchAddresses()); }, [dispatch]);
  useEffect(() => {
    if (addresses.length > 0 && !selectedAddressId) {
      const def = addresses.find((a) => a.isDefault);
      setSelectedAddressId(def?._id || addresses[0]?._id);
    }
  }, [addresses, selectedAddressId]);

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) { setError("Please select a shipping address"); return; }
    if (!cart?.items || cart.items.length === 0) { setError("Your cart is empty"); return; }
    setError("");
    const orderData = {
      addressId: selectedAddressId,
      paymentMethod,
      items: cart.items.map((item) => ({ productId: item.productId._id, quantity: item.quantity, price: item.productId.price })),
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

  if (addressesLoading)
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg-base)" }}>
        <p className="text-xs uppercase tracking-widest font-black animate-pulse" style={{ color: "var(--gold)" }}>Loading...</p>
      </div>
    );

  return (
    <div className="min-h-screen pt-[88px] md:pt-[112px] pb-24 px-4 md:px-6" style={{ background: "var(--bg-base)" }}>
      <div className="max-w-[1100px] mx-auto">

        {/* Header */}
        <div className="flex flex-col mb-8 md:mb-12 pl-5" style={{ borderLeft: "2px solid var(--gold)" }}>
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold mb-1" style={{ color: "var(--gold)" }}>Secure Transaction</span>
          <h2 className="text-[28px] md:text-[48px] font-[Georgia,serif] leading-tight" style={{ color: "var(--text-primary)" }}>
            Finalize <span className="italic">Purchase</span>
          </h2>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl text-sm font-medium text-center" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.3)", color: "#f87171" }}>
            {error}
          </div>
        )}

        <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">
          {/* Left: address + payment */}
          <div
            className="rounded-2xl p-5 md:p-8 space-y-8"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}
          >
            <AddressSelector addresses={addresses} selectedAddressId={selectedAddressId} onSelectAddress={setSelectedAddressId} />
            <div className="h-px" style={{ background: "var(--border-subtle)" }} />
            <PaymentSelector paymentMethod={paymentMethod} onSelectPayment={setPaymentMethod} />
          </div>

          {/* Right: order summary */}
          <div className="sticky top-[100px] lg:top-[120px]">
            <div className="rounded-2xl p-5 md:p-7 shadow-xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
              <h3 className="font-[Georgia,serif] italic text-xl mb-6" style={{ color: "var(--text-primary)" }}>Order Summary</h3>

              <div className="space-y-4 max-h-[280px] overflow-y-auto mb-6 pr-1">
                {cart?.items?.map((item) => (
                  <div key={item.productId._id} className="flex gap-3 items-center">
                    <div className="w-12 h-12 shrink-0 rounded-lg p-1.5 flex items-center justify-center" style={{ background: "var(--bg-surface)", border: "1px solid var(--border-subtle)" }}>
                      <img src={item.productId.images?.[0]?.url} alt={item.productId.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate" style={{ color: "var(--text-primary)" }}>{item.productId.name}</p>
                      <p className="text-[11px] uppercase tracking-wider font-bold" style={{ color: "var(--text-muted)" }}>Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>
                      ₹{(item.productId.price * item.quantity).toLocaleString("en-IN")}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-5 space-y-3" style={{ borderTop: "1px solid var(--border-subtle)" }}>
                <div className="flex justify-between text-[11px] uppercase tracking-widest font-bold" style={{ color: "var(--text-muted)" }}>
                  <span>Subtotal</span>
                  <span>₹{cart?.totalAmount?.toLocaleString("en-IN") || 0}</span>
                </div>
                <div className="flex justify-between text-[11px] uppercase tracking-widest font-bold" style={{ color: "var(--text-muted)" }}>
                  <span>Delivery</span>
                  <span style={{ color: "var(--gold)" }}>Free</span>
                </div>
                <div className="flex flex-col items-end pt-3" style={{ borderTop: "1px solid var(--border-subtle)" }}>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold mb-1" style={{ color: "var(--text-muted)" }}>Total</span>
                  <span className="text-[30px] font-[Georgia,serif]" style={{ color: "var(--gold)" }}>
                    ₹{cart?.totalAmount?.toLocaleString("en-IN") || 0}
                  </span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={orderLoading || addresses.length === 0}
                className="w-full mt-6 py-4 rounded-full font-black text-sm uppercase tracking-[0.15em] transition-all active:scale-95 disabled:opacity-30"
                style={{ background: "var(--gold)", color: "#08080E" }}
              >
                {orderLoading ? "Processing..." : "Place Order"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
