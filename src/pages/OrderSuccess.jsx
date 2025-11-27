import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import usePageTitle from "../hooks/userPageTitle";

const OrderSuccess = () => (
  usePageTitle("Order Confirmed!");
  <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
    <CheckCircle2 size={60} className="text-green-500 mb-4" />
    <h2 className="text-2xl font-semibold text-gray-700 mb-2">
      Order Placed Successfully!
    </h2>
    <p className="text-gray-500 mb-6">
      Thank you for your purchase. You’ll receive a confirmation email soon.
    </p>
    <Link
      to="/shop"
      className="bg-linear-to-r from-indigo-600 to-pink-500 text-white px-6 py-2 rounded-full shadow hover:opacity-90 transition"
    >
      Continue Shopping
    </Link>
  </div>
);

export default OrderSuccess;
