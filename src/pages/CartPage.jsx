import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} from "../features/cart/cartSlice";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";

const CartPage = () => {
  const { cartItems, totalAmount, totalQuantity } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <ShoppingBag size={48} className="text-gray-400 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          Your cart is empty
        </h2>
        <p className="text-gray-500 mb-6">
          Looks like you haven’t added anything yet.
        </p>
        <Link
          to="/shop"
          className="bg-linear-to-r from-indigo-600 to-pink-500 text-white px-5 py-2 rounded-full shadow hover:opacity-90 transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Your Cart
      </h1>

      <div className="flex flex-col gap-6">
        {cartItems.map((item) => (
          <div
            //Use cartId instead of _id to distinguish variants
            key={item.cartId}
            className="flex flex-col sm:flex-row items-center justify-between bg-white shadow-md rounded-xl p-4 sm:p-6 border border-gray-100"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div>
                <h2 className="font-semibold text-lg text-gray-700">
                  {item.name}
                </h2>
                <p className="text-sm text-gray-500">
                  ৳ {item.price.toFixed(2)}
                </p>

                {/*Display Size & Color */}
                <div className="mt-1 flex gap-2 text-xs text-gray-500 font-medium bg-gray-50 px-2 py-1 rounded w-fit">
                  <span className="border-r border-gray-300 pr-2">
                    Size: {item.size}
                  </span>
                  <span>Color: {item.color}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center mt-4 sm:mt-0 gap-6">
              {/* Quantity Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => dispatch(decreaseQuantity(item.cartId))}
                  className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full transition"
                >
                  <Minus size={16} />
                </button>
                <span className="text-lg font-medium text-gray-800 w-8 text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => dispatch(increaseQuantity(item.cartId))}
                  className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full transition"
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* Total per item */}
              <span className="font-semibold text-gray-700 min-w-20 text-right">
                ৳{(item.price * item.quantity).toFixed(2)}
              </span>

              {/* Remove Button */}
              <button
                onClick={() => dispatch(removeFromCart(item.cartId))}
                className="p-2 bg-red-50 hover:bg-red-100 text-red-500 rounded-full transition"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary + Buttons */}
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6 border-t pt-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-700">
            Total Items: <span className="font-normal">{totalQuantity}</span>
          </h3>
          <h3 className="text-xl font-bold text-gray-800">
            Total: ৳{totalAmount.toFixed(2)}
          </h3>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => dispatch(clearCart())}
            className="border border-gray-300 text-gray-700 px-5 py-2 rounded-full hover:bg-gray-100 transition"
          >
            Clear Cart
          </button>
          <Link
            to="/checkout"
            className="bg-linear-to-r from-indigo-600 to-pink-500 text-white px-6 py-2 rounded-full shadow hover:opacity-90 transition"
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
