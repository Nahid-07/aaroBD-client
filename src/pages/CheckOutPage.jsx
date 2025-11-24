import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";
import { clearDirectBuyItem } from "../features/checkout/checkoutSlice";
import { toast } from "react-hot-toast";
import {
  CreditCard,
  MapPin,
  Phone,
  User,
  Mail,
  CheckCircle,
  ShoppingBag,
  Truck,
} from "lucide-react";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux State
  const { cartItems, totalAmount } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { directBuyItem } = useSelector((state) => state.checkout);

  // Determine checkout items
  const itemsToCheckout = directBuyItem ? [directBuyItem] : cartItems;

  // Calculate subtotal safely
  const subtotal = directBuyItem
    ? (directBuyItem.price || 0) * (directBuyItem.quantity || 1)
    : totalAmount || 0;

  // Local State
  const [shippingInfo, setShippingInfo] = useState({
    name: user?.name || "",
    email: user?.email || "",
    address: "",
    phone: "",
    city: "Dhaka", // Default to Dhaka
    paymentMethod: "cod",
  });

  // Dynamic Shipping Cost Logic
  const shippingCost = shippingInfo.city === "Dhaka" ? 60 : 100;
  const total = subtotal + shippingCost;

  // Redirect if not logged in
  useEffect(() => {
    if (!user) navigate("/login", { state: { redirectTo: "/checkout" } });
  }, [user, navigate]);

  const handleChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    try {
      if (!itemsToCheckout || itemsToCheckout.length === 0) {
        toast.error("No items to checkout!");
        return;
      }

      if (!shippingInfo.address || !shippingInfo.phone) {
        toast.error("Please fill in all shipping details");
        return;
      }

      const orderData = {
        user: user._id,
        items: itemsToCheckout.map((item) => ({
          product: item._id || item.cartId,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
          price: item.price,
        })),
        totalPrice: total,
        shippingInfo: {
          ...shippingInfo,
          shippingCost, // Optional: Save the shipping cost
        },
      };

      const res = await axiosClient.post("/orders", orderData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      if (res.status === 201) {
        toast.success("Order Placed Successfully! 🎉");
        dispatch(clearCart());
        dispatch(clearDirectBuyItem());
        navigate("/order-success");
      }
    } catch (error) {
      console.error("Order failed:", error.response?.data || error.message);
      const errorMsg =
        error.response?.data?.message ||
        "Something went wrong while placing your order.";
      toast.error(errorMsg);
    }
  };

  if (!itemsToCheckout || itemsToCheckout.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <ShoppingBag size={64} className="text-indigo-200 mb-6" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Your Checkout is Empty
        </h2>
        <p className="text-gray-500 mb-8">
          Looks like you haven't added anything to checkout yet.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-indigo-700 transition transform hover:scale-105"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-10 text-center">
          Secure Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* LEFT COLUMN: Shipping & Payment */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. Contact Information */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full text-sm">
                  1
                </span>
                Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <User
                    className="absolute left-3 top-3.5 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={shippingInfo.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                    required
                  />
                </div>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-3.5 text-gray-400"
                    size={20}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={shippingInfo.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                    required
                  />
                </div>
                <div className="relative md:col-span-2">
                  <Phone
                    className="absolute left-3 top-3.5 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={shippingInfo.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                    required
                  />
                </div>
              </div>
            </div>

            {/* 2. Shipping Address & Delivery Area */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full text-sm">
                  2
                </span>
                Shipping Address
              </h2>

              <div className="space-y-6">
                {/* Delivery Area Selector */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                    Delivery Area
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label
                      className={`relative flex items-center p-4 border rounded-xl cursor-pointer transition-all ${
                        shippingInfo.city === "Dhaka"
                          ? "border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600"
                          : "border-gray-200 hover:border-indigo-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="city"
                        value="Dhaka"
                        checked={shippingInfo.city === "Dhaka"}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            shippingInfo.city === "Dhaka"
                              ? "border-indigo-600"
                              : "border-gray-400"
                          }`}
                        >
                          {shippingInfo.city === "Dhaka" && (
                            <div className="w-2 h-2 bg-indigo-600 rounded-full" />
                          )}
                        </div>
                        <div>
                          <span className="font-semibold text-gray-800 block">
                            Inside Dhaka
                          </span>
                          <span className="text-xs text-gray-500">
                            Delivery Fee: ৳60
                          </span>
                        </div>
                      </div>
                    </label>

                    <label
                      className={`relative flex items-center p-4 border rounded-xl cursor-pointer transition-all ${
                        shippingInfo.city === "Outside Dhaka"
                          ? "border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600"
                          : "border-gray-200 hover:border-indigo-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="city"
                        value="Outside Dhaka"
                        checked={shippingInfo.city === "Outside Dhaka"}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            shippingInfo.city === "Outside Dhaka"
                              ? "border-indigo-600"
                              : "border-gray-400"
                          }`}
                        >
                          {shippingInfo.city === "Outside Dhaka" && (
                            <div className="w-2 h-2 bg-indigo-600 rounded-full" />
                          )}
                        </div>
                        <div>
                          <span className="font-semibold text-gray-800 block">
                            Outside Dhaka
                          </span>
                          <span className="text-xs text-gray-500">
                            Delivery Fee: ৳100
                          </span>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="relative">
                  <MapPin
                    className="absolute left-3 top-3.5 text-gray-400"
                    size={20}
                  />
                  <textarea
                    name="address"
                    rows="3"
                    placeholder="Enter your full delivery address..."
                    value={shippingInfo.address}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition resize-none"
                    required
                  />
                </div>
              </div>
            </div>

            {/* 3. Payment Method */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full text-sm">
                  3
                </span>
                Payment Method
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Cash on Delivery Option */}
                <label
                  className={`relative flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    shippingInfo.paymentMethod === "cod"
                      ? "border-indigo-600 bg-indigo-50"
                      : "border-gray-200 hover:border-indigo-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={shippingInfo.paymentMethod === "cod"}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className="flex items-center gap-3 w-full">
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        shippingInfo.paymentMethod === "cod"
                          ? "border-indigo-600"
                          : "border-gray-400"
                      }`}
                    >
                      {shippingInfo.paymentMethod === "cod" && (
                        <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full" />
                      )}
                    </div>
                    <span className="font-semibold text-gray-700">
                      Cash on Delivery
                    </span>
                    <Truck className="ml-auto text-gray-400" size={20} />
                  </div>
                </label>

                {/* bKash Option (Disabled style for now) */}
                <label className="relative flex items-center p-4 border-2 border-gray-100 rounded-xl cursor-not-allowed opacity-60 bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bkash"
                    disabled
                    className="sr-only"
                  />
                  <div className="flex items-center gap-3 w-full">
                    <div className="w-5 h-5 rounded-full border border-gray-300"></div>
                    <div>
                      <span className="font-semibold text-gray-500">
                        bKash / Online
                      </span>
                      <span className="block text-xs text-indigo-500 font-medium">
                        Coming Soon
                      </span>
                    </div>
                    <CreditCard className="ml-auto text-gray-400" size={20} />
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Order Summary
              </h2>

              {/* Items List */}
              <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                {itemsToCheckout.map((item) => (
                  <div
                    key={item.cartId || item._id}
                    className="flex gap-4 py-2 border-b border-dashed border-gray-100 last:border-0"
                  >
                    <div className="relative w-16 h-16 shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-lg border border-gray-200"
                      />
                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-gray-800 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-sm">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-800 text-sm truncate">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        Size:{" "}
                        <span className="font-medium text-gray-700">
                          {item.size}
                        </span>{" "}
                        • Color:{" "}
                        <span className="font-medium text-gray-700">
                          {item.color}
                        </span>
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-indigo-600 text-sm">
                        ৳{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cost Breakdown */}
              <div className="space-y-3 pt-4 border-t border-gray-100">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium">৳{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping ({shippingInfo.city})</span>
                  <span className="font-medium text-green-600">
                    +৳{shippingCost.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-800 text-lg font-bold pt-4 border-t border-gray-200 mt-2">
                  <span>Total</span>
                  <span className="text-2xl text-indigo-700">
                    ৳{total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                onClick={handlePlaceOrder}
                className="w-full mt-8 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <CheckCircle size={20} /> Confirm Order
              </button>

              {/* Trust Badges */}
              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span>Secure Checkout • 100% Money Back Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
