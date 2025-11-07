import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const CheckoutPage = () => {
  const { cartItems, totalAmount } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [shippingInfo, setShippingInfo] = useState({
    name: user?.name || "",
    email: user?.email || "",
    address: "",
    phone: "",
    paymentMethod: "cod",
  });

  const handleChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        user: user._id,
        items: cartItems.map((item) => ({
          product: item._id,
          quantity: item.quantity,
        })),
        totalPrice: totalAmount,
        shippingInfo,
      };

      const res = await axios.post("/api/orders", orderData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (res.status === 201) {
        dispatch(clearCart());
        navigate("/order-success");
      }
    } catch (error) {
      console.error("Order failed", error.response?.data || error.message);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Checkout
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Shipping Info */}
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

        {/* Right: Order Summary */}
        <div className="bg-white p-6 shadow-lg rounded-xl border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Order Summary
          </h2>
          <div className="flex flex-col gap-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="font-medium text-gray-700">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    {item.quantity} × ${item.price.toFixed(2)}
                  </p>
                </div>
                <span className="font-semibold text-gray-800">
                  ${(item.quantity * item.price).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-6 text-lg font-bold">
            <span>Total:</span>
            <span>${totalAmount.toFixed(2)}</span>
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
