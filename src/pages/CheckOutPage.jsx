import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";
import { clearDirectBuyItem } from "../features/checkout/checkoutSlice";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems, totalAmount } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { directBuyItem } = useSelector((state) => state.checkout);

  const itemsToCheckout = directBuyItem ? [directBuyItem] : cartItems;
  const total = directBuyItem
    ? directBuyItem.price * directBuyItem.quantity
    : totalAmount;

  const [shippingInfo, setShippingInfo] = useState({
    name: user?.name || "",
    email: user?.email || "",
    address: "",
    phone: "",
    paymentMethod: "cod",
  });

  useEffect(() => {
    if (!user) navigate("/login", { state: { redirectTo: "/checkout" } });
  }, [user, navigate]);

  const handleChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    try {
      if (!itemsToCheckout || itemsToCheckout.length === 0) {
        alert("No items to checkout!");
        return;
      }

      const orderData = {
        user: user._id,
        items: itemsToCheckout.map((item) => ({
          product: item._id,
          quantity: item.quantity,
        })),
        totalPrice: total,
        shippingInfo,
      };

      const res = await axiosClient.post("/orders", orderData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      if (res.status === 201) {
        dispatch(clearCart());
        dispatch(clearDirectBuyItem());
        navigate("/order-success");
      }
    } catch (error) {
      console.error("Order failed:", error.response?.data || error.message);
      alert("Something went wrong while placing your order.");
    }
  };

  if (!itemsToCheckout || itemsToCheckout.length === 0) {
    return (
      <div className="text-center py-20 text-gray-600">
        <p className="text-xl font-medium">No items in checkout.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Checkout
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 🏠 Shipping Info */}
        <div className="bg-white p-6 shadow-lg rounded-xl border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Shipping Details
          </h2>

          <form className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={shippingInfo.name}
              onChange={handleChange}
              className="border p-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={shippingInfo.email}
              onChange={handleChange}
              className="border p-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Full Address"
              value={shippingInfo.address}
              onChange={handleChange}
              className="border p-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={shippingInfo.phone}
              onChange={handleChange}
              className="border p-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
            <select
              name="paymentMethod"
              value={shippingInfo.paymentMethod}
              onChange={handleChange}
              className="border p-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="cod">Cash on Delivery</option>
              <option value="bkash">bKash (Coming Soon)</option>
            </select>
          </form>
        </div>

        {/* 🧾 Order Summary */}
        <div className="bg-white p-6 shadow-lg rounded-xl border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Order Summary
          </h2>

          <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto pr-2">
            {itemsToCheckout.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 object-cover rounded-md border"
                  />
                  <div>
                    <p className="font-medium text-gray-700">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      {item.quantity} × ৳{item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
                <span className="font-semibold text-gray-800">
                  ৳{(item.quantity * item.price).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-6 text-lg font-bold">
            <span>Total:</span>
            <span>৳{total.toFixed(2)}</span>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="mt-8 w-full bg-linear-to-r from-indigo-600 to-pink-500 text-white py-3 rounded-full font-semibold shadow hover:opacity-90 transition"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
