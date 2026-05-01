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
  const { addresses, isLoading: addressesLoading } = useSelector(
    (state) => state.address,
  );
  const { cartItems, totalPrice } = useSelector((state) => state.cart);

  const { isLoading: orderLoading } = useSelector((state) => state.order);

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

    if (!paymentMethod) {
      setError("Please select a payment method");
      return;
    }

    if (cartItems.length === 0) {
      setError("Your cart is empty");
      return;
    }

    setError("");

    const orderData = {
      addressId: selectedAddressId,
      paymentMethod,
      items: cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount: totalPrice,
    };

    try {
      await dispatch(placeOrder(orderData)).unwrap();
      dispatch(clearCart());
      navigate("/orders");
    } catch (err) {
      setError(err || "Failed to place order");
    }
  };

  if (addressesLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-white">Loading addresses...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-[#08080E]">
      <h1 className="text-2xl font-bold text-white mb-6">Checkout</h1>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30">
          <p className="text-red-500 text-sm text-center">{error}</p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Column - Address & Payment */}
        <div>
          <AddressSelector
            addresses={addresses}
            selectedAddressId={selectedAddressId}
            onSelectAddress={setSelectedAddressId}
          />

          <PaymentSelector
            paymentMethod={paymentMethod}
            onSelectPayment={setPaymentMethod}
          />
        </div>

        {/* Right Column - Order Summary */}
        <div className="bg-[rgba(255,255,255,0.04)] rounded-xl p-5 h-fit">
          <h2 className="text-lg font-semibold text-white mb-4">
            Order Summary
          </h2>

          <div className="space-y-3 max-h-80 overflow-y-auto mb-4">
            {cartItems?.map((item) => (
              <div key={item.productId} className="flex gap-3 text-sm">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded object-cover"
                />
                <div className="flex-1">
                  <p className="text-white font-medium">{item.name}</p>
                  <p className="text-[rgba(245,240,232,0.5)] text-xs">
                    Qty: {item.quantity} × ₹{item.price}
                  </p>
                </div>
                <p className="text-white font-semibold">
                  ₹{item.price * item.quantity}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-[rgba(255,255,255,0.1)] pt-4 space-y-2">
            <div className="flex justify-between text-[rgba(245,240,232,0.7)] text-sm">
              <span>Subtotal</span>
              <span>₹{totalPrice}</span>
            </div>
            <div className="flex justify-between text-[rgba(245,240,232,0.7)] text-sm">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between text-white text-lg font-bold pt-2">
              <span>Total</span>
              <span>₹{totalPrice}</span>
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={orderLoading || addresses.length === 0}
            className="w-full mt-6 px-6 py-3 rounded-full bg-[#D4AF37] text-[#08080E] text-sm font-black uppercase tracking-widest hover:shadow-[0_10px_30px_rgba(212,175,55,0.3)] transition-all active:scale-95 disabled:opacity-50"
          >
            {orderLoading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
