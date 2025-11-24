import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  deleteProduct,
  createProduct,
  updateProduct,
} from "../../features/products/ProductSlice";
import {
  fetchAllOrders,
  updateOrderStatus,
} from "../../features/orders/orderSlice";
import {
  Trash2,
  Plus,
  LayoutDashboard,
  Eye,
  X,
  Package,
  Truck,
  CheckCircle,
  Edit2,
  AlertCircle,
} from "lucide-react";
import Loader from "../../components/loader/Loader";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const dispatch = useDispatch();

  // --- UI STATE ---
  const [activeTab, setActiveTab] = useState("products");
  const [showForm, setShowForm] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [editProductId, setEditProductId] = useState(null);

  // --- REDUX STATE ---
  const { items: products, loading: pLoading } = useSelector(
    (state) => state.products
  );
  const { items: orders, loading: oLoading } = useSelector(
    (state) => state.orders
  );
  const { user } = useSelector((state) => state.auth);

  // Derive selected order from Redux (Live Data)
  const selectedOrder = orders.find((order) => order._id === selectedOrderId);

  // --- FORM STATE ---
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "Oversized",
    gender: "Unisex",
    image: "",
    colors: "",
    inStock: 10,
    sizes: ["M", "L"],
  });

  // Initial Fetch
  useEffect(() => {
    if (activeTab === "products") dispatch(fetchProducts());
    if (activeTab === "orders") dispatch(fetchAllOrders());
  }, [dispatch, activeTab]);

  // --- HANDLERS ---

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSizeChange = (size) => {
    setFormData((prev) => {
      const newSizes = prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size];
      return { ...prev, sizes: newSizes };
    });
  };

  const handleEditClick = (product) => {
    setEditProductId(product._id);
    setFormData({
      name: product.name,
      price: String(product.price),
      description: product.description,
      category: product.category,
      gender: product.gender,
      image: product.image,
      colors: Array.isArray(product.colors)
        ? product.colors.join(", ")
        : product.colors,
      inStock: product.inStock,
      sizes: product.sizes,
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();

    // Basic Validation
    if (
      !formData.name ||
      !formData.price ||
      !formData.description ||
      !formData.image ||
      !formData.colors
    ) {
      toast.error("Please fill all required fields");
      return;
    }
    if (formData.sizes.length === 0) {
      toast.error("Please select at least one size");
      return;
    }

    // Prepare data for submission
    const productData = {
      ...formData,
      price: Number(formData.price),
      inStock: Number(formData.inStock),
      colors:
        typeof formData.colors === "string"
          ? formData.colors.split(",").map((c) => c.trim())
          : formData.colors,
      sizes: formData.sizes,
    };

    try {
      if (editProductId) {
        await dispatch(
          updateProduct({ id: editProductId, productData })
        ).unwrap();
      } else {
        await dispatch(createProduct(productData)).unwrap();
      }

      // Only reset if successful
      setShowForm(false);
      setEditProductId(null);
      setFormData({
        name: "",
        price: "",
        description: "",
        category: "Oversized",
        gender: "Unisex",
        image: "",
        colors: "",
        inStock: 10,
        sizes: ["M", "L"],
      });
    } catch (error) {
      console.error("Failed to save product:", error);
      // toast error is handled in slice, but good to catch here to prevent form clear on error
    }
  };

  // --- RENDER GUARDS ---
  if (!user?.isAdmin)
    return (
      <div className="text-center mt-20 text-red-500 font-bold">
        Access Denied. Admins Only.
      </div>
    );
  if (pLoading || oLoading) return <Loader />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 min-h-screen">
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <LayoutDashboard className="text-indigo-600" /> Admin Dashboard
        </h1>
        <div className="flex bg-white p-1 rounded-xl shadow-sm border">
          <button
            onClick={() => setActiveTab("products")}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              activeTab === "products"
                ? "bg-indigo-600 text-white shadow-md"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            Products
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              activeTab === "orders"
                ? "bg-indigo-600 text-white shadow-md"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            Orders
          </button>
        </div>
      </div>

      {/* ================= PRODUCTS TAB ================= */}
      {activeTab === "products" && (
        <>
          <button
            onClick={() => {
              setShowForm(!showForm);
              setEditProductId(null);
              if (!showForm)
                setFormData({
                  name: "",
                  price: "",
                  description: "",
                  category: "Oversized",
                  gender: "Unisex",
                  image: "",
                  colors: "",
                  inStock: 10,
                  sizes: ["M", "L"],
                });
            }}
            className="mb-6 bg-indigo-600 text-white px-5 py-2.5 rounded-full flex items-center gap-2 hover:bg-indigo-700 transition shadow-lg hover:shadow-xl"
          >
            <Plus size={20} /> {showForm ? "Close Form" : "Add New Product"}
          </button>

          {/* --- PRODUCT FORM --- */}
          {showForm && (
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-indigo-50 mb-8 animate-slide-down">
              <h2 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b">
                {editProductId ? "Edit Product" : "Add New Product"}
              </h2>

              <form
                onSubmit={handleProductSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">
                    Product Name
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Retro Vibes Tee"
                    className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">
                    Price (৳)
                  </label>
                  <input
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="e.g. 1200"
                    className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full border p-2 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  >
                    <option value="Oversized">Oversized</option>
                    <option value="Minimal">Minimal</option>
                    <option value="Graphic">Graphic</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full border p-2 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  >
                    <option value="Unisex">Unisex</option>
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">
                    Image URL
                  </label>
                  <input
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://..."
                    className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">
                    Colors (comma separated)
                  </label>
                  <input
                    name="colors"
                    value={formData.colors}
                    onChange={handleChange}
                    placeholder="Black, White, Navy"
                    className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">
                    Stock Quantity
                  </label>
                  <input
                    name="inStock"
                    type="number"
                    value={formData.inStock}
                    onChange={handleChange}
                    className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 block">
                    Available Sizes
                  </label>
                  <div className="flex gap-4 mt-2">
                    {["M", "L", "XL"].map((size) => (
                      <label
                        key={size}
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={formData.sizes.includes(size)}
                          onChange={() => handleSizeChange(size)}
                          className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300"
                        />
                        <span className="text-gray-700 font-medium">
                          {size}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-2 space-y-1">
                  <label className="text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Product details..."
                    className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="md:col-span-2 bg-green-600 text-white font-semibold py-3 rounded-lg shadow hover:bg-green-700 transition flex justify-center items-center gap-2"
                >
                  <CheckCircle size={20} />{" "}
                  {editProductId ? "Update Product" : "Publish Product"}
                </button>
              </form>
            </div>
          )}

          {/* --- PRODUCT GRID --- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition border border-gray-100 overflow-hidden group relative"
              >
                <div className="relative h-48 bg-gray-100">
                  <img
                    src={product.image}
                    className="w-full h-full object-cover"
                    alt={product.name}
                  />
                  <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded backdrop-blur-md">
                    {product.category}
                  </div>
                  <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                    <button
                      onClick={() => handleEditClick(product)}
                      className="bg-white text-indigo-600 p-2 rounded-full shadow-md hover:bg-indigo-50"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm("Delete?"))
                          dispatch(deleteProduct(product._id));
                      }}
                      className="bg-white text-red-500 p-2 rounded-full shadow-md hover:bg-red-50"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 truncate">
                    {product.name}
                  </h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-indigo-600 font-bold">
                      ৳{product.price}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        product.inStock > 0
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.inStock > 0
                        ? `${product.inStock} in stock`
                        : "Out of Stock"}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {product.sizes.map((s) => (
                      <span
                        key={s}
                        className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded border"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {products.length === 0 && (
            <div className="text-center py-20 text-gray-500 flex flex-col items-center">
              <AlertCircle size={40} className="mb-2 opacity-50" />
              No products found. Add one!
            </div>
          )}
        </>
      )}

      {/* ================= ORDERS TAB ================= */}
      {activeTab === "orders" && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-5 font-semibold text-gray-600 text-sm uppercase">
                  Order ID
                </th>
                <th className="p-5 font-semibold text-gray-600 text-sm uppercase">
                  Customer
                </th>
                <th className="p-5 font-semibold text-gray-600 text-sm uppercase">
                  Date
                </th>
                <th className="p-5 font-semibold text-gray-600 text-sm uppercase">
                  Amount
                </th>
                <th className="p-5 font-semibold text-gray-600 text-sm uppercase">
                  Status
                </th>
                <th className="p-5 font-semibold text-gray-600 text-sm uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50/50 transition">
                  <td className="p-5 font-mono text-xs text-gray-500">
                    #{order._id.slice(-6)}
                  </td>
                  <td className="p-5 font-medium text-gray-800">
                    {order.shippingInfo?.name}
                  </td>
                  <td className="p-5 text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-5 font-bold text-indigo-600">
                    ৳{order.totalPrice}
                  </td>
                  <td className="p-5">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="p-5">
                    <button
                      onClick={() => setSelectedOrderId(order._id)}
                      className="text-indigo-600 hover:bg-indigo-50 p-2 rounded-full transition"
                    >
                      <Eye size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {orders.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              No orders found.
            </div>
          )}
        </div>
      )}

      {/* ================= ORDER DETAILS MODAL ================= */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Order Details
                </h2>
                <p className="text-sm text-gray-500">
                  ID: #{selectedOrder._id}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrderId(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 grid md:grid-cols-3 gap-8">
              {/* Items List */}
              <div className="md:col-span-2 space-y-6">
                <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                  <Package size={18} /> Items Ordered
                </h3>
                <div className="space-y-4">
                  {selectedOrder.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex gap-4 items-center bg-gray-50 p-3 rounded-xl"
                    >
                      <img
                        src={item.product?.image || "https://placehold.co/100"}
                        alt=""
                        className="w-16 h-16 object-cover rounded-lg border"
                      />
                      <div>
                        <p className="font-semibold text-gray-800">
                          {item.product?.name || "Product Removed"}
                        </p>
                        <p className="text-sm text-gray-500">
                          Size:{" "}
                          <span className="font-medium text-gray-700">
                            {item.size || "N/A"}
                          </span>{" "}
                          • Color:{" "}
                          <span className="font-medium text-gray-700">
                            {item.color || "N/A"}
                          </span>
                        </p>
                        <p className="text-sm text-indigo-600 font-bold mt-1">
                          {item.quantity} x ৳{item.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status & Shipping */}
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <Truck size={18} /> Delivery
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>
                      <span className="font-medium text-gray-500">To:</span>{" "}
                      {selectedOrder.shippingInfo?.name}
                    </p>
                    <p>
                      <span className="font-medium text-gray-500">Phone:</span>{" "}
                      {selectedOrder.shippingInfo?.phone}
                    </p>
                    <p>
                      <span className="font-medium text-gray-500">
                        Address:
                      </span>{" "}
                      {selectedOrder.shippingInfo?.address}
                    </p>
                    <p>
                      <span className="font-medium text-gray-500">
                        Payment:
                      </span>{" "}
                      {selectedOrder.shippingInfo?.paymentMethod.toUpperCase()}
                    </p>
                  </div>
                </div>
                <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                  <h3 className="font-semibold text-indigo-900 mb-3 flex items-center gap-2">
                    <CheckCircle size={18} /> Update Status
                  </h3>
                  <select
                    value={selectedOrder.status}
                    onChange={(e) =>
                      dispatch(
                        updateOrderStatus({
                          id: selectedOrder._id,
                          status: e.target.value,
                        })
                      )
                    }
                    className="w-full p-2 rounded-lg border-indigo-200 focus:ring-2 focus:ring-indigo-500 outline-none text-sm bg-white"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- HELPER COMPONENT ---
const StatusBadge = ({ status }) => {
  const styles = {
    Pending: "bg-yellow-100 text-yellow-700",
    Processing: "bg-blue-100 text-blue-700",
    Shipped: "bg-purple-100 text-purple-700",
    Delivered: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700",
  };
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-bold ${
        styles[status] || "bg-gray-100"
      }`}
    >
      {status}
    </span>
  );
};

export default AdminDashboard;
