import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct } from "../features/products/ProductSlice";
import { addToCart } from "../features/cart/cartSlice";
import { setDirectBuyItem } from "../features/checkout/checkoutSlice";
import { ShoppingCart, CreditCard, Ruler, Palette } from "lucide-react";
import Loader from "../components/loader/Loader";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Global State
  const { singleProduct, loading, error } = useSelector(
    (state) => state.products
  );
  const { user } = useSelector((state) => state.auth);

  // Local State for Selection
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

useEffect(() => {
    if (id) {
      dispatch(fetchSingleProduct(id));
    }
  }, [dispatch, id]);

  // 1. Check Loading FIRST
  if (loading) {
    return <Loader />;
  }

  // 2. Then Check Error
  if (error) {
    return <div className="text-center mt-10 text-red-500">Error: {error}</div>;
  }

  // 3. Finally Check Data
  if (!singleProduct) {
    return <div className="text-center mt-10 text-gray-500">Product not found.</div>;
  }

  const { name, image, description, price, inStock, sizes, colors } =
    singleProduct;

  // Helper to validate selection
  const validateSelection = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return false;
    }
    if (!selectedColor) {
      toast.error("Please select a color");
      return false;
    }
    return true;
  };

  const handleAddToCart = () => {
    if (!validateSelection()) return;

    dispatch(
      addToCart({
        ...singleProduct,
        size: selectedSize,
        color: selectedColor,
      })
    );
    toast.success("Added to cart!");
  };

  const handleBuyNow = () => {
    if (!validateSelection()) return;

    const buyItem = {
      _id: singleProduct._id,
      name: singleProduct.name,
      price: singleProduct.price,
      image: singleProduct.image,
      quantity: 1,
      size: selectedSize,
      color: selectedColor,
    };

    if (!user) {
      localStorage.setItem("pendingDirectBuyItem", JSON.stringify(buyItem));
      navigate("/login", { state: { redirectTo: "/checkout" } });
    } else {
      dispatch(setDirectBuyItem(buyItem));
      navigate("/checkout");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid md:grid-cols-2 gap-10">
      {/* Product Image */}
      <div className="flex justify-center items-center bg-white rounded-2xl shadow-lg overflow-hidden p-4">
        <img
          src={image}
          alt={name}
          className="w-full max-h-[500px] object-contain hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col justify-center space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{name}</h1>
          <p className="text-gray-500 text-sm mt-1">In Stock: {inStock}</p>
        </div>

        <p className="text-gray-600 leading-relaxed">{description}</p>

        <div className="text-3xl font-bold text-indigo-600">৳ {price}</div>

        {/* 📏 Size Selector */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
            <Ruler size={18} /> Select Size
          </h3>
          <div className="flex flex-wrap gap-3">
            {sizes?.length > 0 ? (
              sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-lg border font-medium transition-all ${
                    selectedSize === size
                      ? "bg-indigo-600 text-white border-indigo-600 ring-2 ring-indigo-200"
                      : "bg-white text-gray-700 border-gray-300 hover:border-indigo-400"
                  }`}
                >
                  {size}
                </button>
              ))
            ) : (
              <span className="text-gray-400 text-sm">No sizes available</span>
            )}
          </div>
        </div>

        {/* 🎨 Color Selector */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
            <Palette size={18} /> Select Color
          </h3>
          <div className="flex flex-wrap gap-3">
            {colors?.length > 0 ? (
              colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 rounded-lg border font-medium transition-all ${
                    selectedColor === color
                      ? "bg-indigo-600 text-white border-indigo-600 ring-2 ring-indigo-200"
                      : "bg-white text-gray-700 border-gray-300 hover:border-indigo-400"
                  }`}
                >
                  {color}
                </button>
              ))
            ) : (
              <span className="text-gray-400 text-sm">No colors available</span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <button
            onClick={handleAddToCart}
            className="flex-1 flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-xl shadow transition"
          >
            <ShoppingCart size={20} className="mr-2" /> Add to Cart
          </button>

          <button
            onClick={handleBuyNow}
            className="flex-1 flex items-center justify-center bg-linear-to-r from-pink-500 to-orange-500 hover:opacity-90 text-white font-semibold py-3 rounded-xl shadow-md transition"
          >
            <CreditCard size={20} className="mr-2" /> Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
