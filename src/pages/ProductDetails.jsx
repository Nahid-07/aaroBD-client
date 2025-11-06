import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct } from "../features/products/ProductSlice";
import { ShoppingCart, CreditCard } from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { singleProduct, loading, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [dispatch, id]);

  if (loading)
    return (
      <div className="text-center mt-10 text-gray-600 animate-pulse">
        Loading product details...
      </div>
    );
  if (error)
    return <div className="text-center mt-10 text-red-500">Error: {error}</div>;
  if (!singleProduct)
    return (
      <div className="text-center mt-10 text-gray-500">Product not found.</div>
    );

  const { name, image, description, price, inStock } = singleProduct;

  // Handle Buy Now
  const handleBuyNow = () => {
    // Later: Navigate to checkout page or payment flow
    navigate("/checkout", { state: { product: singleProduct } });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid md:grid-cols-2 gap-10">
      {/* Product Image */}
      <div className="flex justify-center items-center bg-white rounded-2xl shadow-lg overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col justify-center space-y-5">
        <h1 className="text-3xl font-bold text-gray-800">{name}</h1>
        <p className="text-gray-600 leading-relaxed">{description}</p>

        <div className="flex items-center justify-between mt-4">
          <span className="text-3xl font-bold text-indigo-600">৳ {price}</span>
          <span
            className={`text-sm font-semibold ${
              inStock > 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {inStock > 0 ? `In inStock (${inStock})` : "Out of Stock"}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <button className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-xl shadow transition w-full sm:w-1/2">
            <ShoppingCart size={20} className="mr-2" /> Add to Cart
          </button>

          <button
            onClick={handleBuyNow}
            className="flex items-center justify-center bg-linear-to-r from-pink-500 to-orange-500 hover:opacity-90 text-white font-semibold py-3 rounded-xl shadow-md transition w-full sm:w-1/2"
          >
            <CreditCard size={20} className="mr-2" /> Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
