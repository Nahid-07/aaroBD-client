import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/ProductSlice";
import ProductCard from "../components/products/ProductCard";
import { Search, Filter, X } from "lucide-react";
import Loader from "../components/loader/Loader";

const Shop = () => {
  const dispatch = useDispatch();
  const {
    items: products,
    loading,
    error,
  } = useSelector((state) => state.products);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedGender, setSelectedGender] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Load Products on Mount
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // 🧠 Filtering Logic (Think Deeply: Derived State)
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // 1. Search Filter
    if (searchQuery) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // 2. Category Filter
    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // 3. Gender Filter
    if (selectedGender !== "All") {
      result = result.filter((p) => p.gender === selectedGender);
    }

    // 4. Sorting
    if (sortOrder === "lowToHigh") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "highToLow") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, searchQuery, selectedCategory, selectedGender, sortOrder]);

  if (loading) return <Loader />;
  if (error)
    return (
      <div className="text-center mt-20 text-red-500">
        Error loading products
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* 🔍 SIDEBAR FILTERS (Desktop & Mobile) */}
        <div
          className={`fixed inset-0 bg-white z-40 p-6 lg:static lg:block lg:w-1/4 lg:p-0 lg:bg-transparent transition-transform duration-300 ${
            showMobileFilters
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }`}
        >
          {/* Mobile Close Button */}
          <div className="flex justify-between items-center lg:hidden mb-6">
            <h2 className="text-xl font-bold text-gray-800">Filters</h2>
            <button onClick={() => setShowMobileFilters(false)}>
              <X size={24} />
            </button>
          </div>

          <div className="space-y-8">
            {/* Search */}
            <div className="relative">
              <Search
                className="absolute left-3 top-3 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              />
            </div>

            {/* Category Filter */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Category</h3>
              <div className="flex flex-col gap-2">
                {["All", "Oversized", "Minimal", "Graphic"].map((cat) => (
                  <label
                    key={cat}
                    className="flex items-center gap-2 cursor-pointer group"
                  >
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === cat}
                      onChange={() => setSelectedCategory(cat)}
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                    <span
                      className={`text-gray-600 group-hover:text-indigo-600 transition ${
                        selectedCategory === cat
                          ? "font-medium text-indigo-600"
                          : ""
                      }`}
                    >
                      {cat}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Gender Filter */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Gender</h3>
              <div className="flex flex-col gap-2">
                {["All", "Men", "Women", "Unisex"].map((gen) => (
                  <label
                    key={gen}
                    className="flex items-center gap-2 cursor-pointer group"
                  >
                    <input
                      type="radio"
                      name="gender"
                      checked={selectedGender === gen}
                      onChange={() => setSelectedGender(gen)}
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                    <span
                      className={`text-gray-600 group-hover:text-indigo-600 transition ${
                        selectedGender === gen
                          ? "font-medium text-indigo-600"
                          : ""
                      }`}
                    >
                      {gen}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Sort By */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">
                Sort By Price
              </h3>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-indigo-500"
              >
                <option value="default">Newest First</option>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* 👕 PRODUCT GRID AREA */}
        <div className="flex-1">
          {/* Mobile Toggle Button */}
          <button
            onClick={() => setShowMobileFilters(true)}
            className="lg:hidden mb-6 flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg text-gray-700 font-medium hover:bg-gray-200 transition"
          >
            <Filter size={20} /> Filters
          </button>

          {/* Results Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              {selectedCategory === "All"
                ? "All Collections"
                : `${selectedCategory} Collection`}
            </h1>
            <p className="text-gray-500 mt-1">
              Showing {filteredProducts.length} results
            </p>
          </div>

          {/* The Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-700">
                No products found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                  setSelectedGender("All");
                }}
                className="mt-4 text-indigo-600 font-medium hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
