import { ShoppingCart } from "lucide-react";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* Product Image */}
      <div className="relative w-full h-60 overflow-hidden rounded-t-2xl">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Product Info */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
          <p className="text-sm text-gray-500 line-clamp-2 mt-1">{product.description}</p>
        </div>

        {/* Price + Add to Cart */}
        <div className="flex justify-between items-center mt-4">
          <span className="text-indigo-600 font-bold text-lg">৳ {product.price}</span>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full transition">
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
