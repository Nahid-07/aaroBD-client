import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/ProductSlice";
import ProductCard from "../components/products/ProductCard";
import { Search, Filter, X, ChevronLeft, ChevronRight } from "lucide-react";
import Loader from "../components/loader/Loader";

const Shop = () => {
  const dispatch = useDispatch();
  // Get pagination data from Redux
  const {
    items: products,
    loading,
    error,
    page,
    pages,
  } = useSelector((state) => state.products);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedGender, setSelectedGender] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);

  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    // Debounce search to avoid too many requests while typing
    const timer = setTimeout(() => {
      dispatch(
        fetchProducts({
          page: currentPage,
          keyword: searchQuery,
          category: selectedCategory,
          gender: selectedGender,
          sort: sortOrder,
        })
      );
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [
    dispatch,
    currentPage,
    searchQuery,
    selectedCategory,
    selectedGender,
    sortOrder,
  ]);

  // Reset to Page 1 when filters change (except when changing page itself)
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedGender, sortOrder]);

  // Close mobile filters when screen resizes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setShowMobileFilters(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading && products.length === 0) return <Loader />; // Show loader only on initial load or empty state
  if (error)
    return (
      <div className="text-center mt-20 text-red-500">
        Error loading products
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 relative">
        {/* 🔍 MOBILE OVERLAY (Click to close) */}
        <div
          className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${
            showMobileFilters ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setShowMobileFilters(false)}
        />

        {/* 🔍 SIDEBAR FILTERS (Desktop & Mobile) */}
        <aside
          className={`
            fixed top-0 left-0 h-full w-72 bg-white z-50 p-6 shadow-2xl 
            transform transition-transform duration-300 ease-in-out
            lg:static lg:block lg:h-auto lg:w-64 lg:min-w-[16rem] lg:shadow-none lg:p-0 lg:bg-transparent lg:transform-none
            ${
              showMobileFilters
                ? "translate-x-0"
                : "-translate-x-full lg:translate-x-0"
            }
          `}
        >
          {/* Mobile Close Button */}
          <div className="flex justify-between items-center lg:hidden mb-6">
            <h2 className="text-xl font-bold text-gray-800">Filters</h2>
            <button
              onClick={() => setShowMobileFilters(false)}
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-8 overflow-y-auto max-h-[calc(100vh-100px)] lg:max-h-none lg:overflow-visible pr-2 custom-scrollbar">
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
                      onChange={() => {
                        setSelectedCategory(cat);
                        if (window.innerWidth < 1024)
                          setShowMobileFilters(false);
                      }}
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
                      onChange={() => {
                        setSelectedGender(gen);
                        if (window.innerWidth < 1024)
                          setShowMobileFilters(false);
                      }}
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
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-indigo-500 bg-white"
              >
                <option value="default">Newest First</option>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
              </select>
            </div>
          </div>
        </aside>

        {/* 👕 PRODUCT GRID AREA */}
        <div className="flex-1 w-full">
          {/* Mobile Toggle Button */}
          <button
            onClick={() => setShowMobileFilters(true)}
            className="lg:hidden mb-6 flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg text-gray-700 font-medium hover:bg-gray-200 transition w-full justify-center"
          >
            <Filter size={20} /> Filter & Search
          </button>

          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              {selectedCategory === "All"
                ? "All Collections"
                : `${selectedCategory} Collection`}
            </h1>
            <p className="text-gray-500 mt-1">
              Page {page} of {pages}
            </p>
          </div>

          {products.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              {/*PAGINATION CONTROLS */}
              <div className="mt-10 flex justify-center items-center gap-4">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={page === 1}
                  className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  <ChevronLeft size={20} />
                </button>

                <span className="text-gray-700 font-medium">
                  Page {page} of {pages}
                </span>

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, pages))
                  }
                  disabled={page === pages}
                  className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </>
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
