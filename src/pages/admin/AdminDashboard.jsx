import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  deleteProduct,
  createProduct,
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
} from "lucide-react";
import Loader from "../../components/loader/Loader";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("products");
  const [showForm, setShowForm] = useState(false);

  // Store only the ID, not the whole object
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const { items: products, loading: pLoading } = useSelector(
    (state) => state.products
  );
  const { items: orders, loading: oLoading } = useSelector(
    (state) => state.orders
  );
  const { user } = useSelector((state) => state.auth);

  // Find the order from Redux (Always Live Data)
  const selectedOrder = orders.find((order) => order._id === selectedOrderId);

  useEffect(() => {
    if (activeTab === "products") dispatch(fetchProducts());
    if (activeTab === "orders") dispatch(fetchAllOrders());
  }, [dispatch, activeTab]);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "Oversized",
    gender: "Unisex",
    image: "",
    colors: "",
    sizes: "",
  });

  const handleProductSubmit = (e) => {
    e.preventDefault();
    const productData = {
      ...formData,
      colors: formData.colors.split(",").map((c) => c.trim()),
      sizes: formData.sizes
        ? formData.sizes.split(",").map((s) => s.trim())
        : ["M", "L", "XL"],
    };
    dispatch(createProduct(productData));
    setShowForm(false);
  };

  if (!user?.isAdmin)
    return <div className="text-center mt-20 text-red-500">Access Denied</div>;
  if (pLoading || oLoading) return <Loader />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 min-h-screen">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <LayoutDashboard className="text-indigo-600" /> Dashboard
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

      {/* PRODUCTS TAB */}
      {activeTab === "products" && (
        <>
          <button
            onClick={() => setShowForm(!showForm)}
            className="mb-6 bg-indigo-600 text-white px-5 py-2.5 rounded-full flex items-center gap-2 hover:bg-indigo-700 transition shadow-lg hover:shadow-xl"
          >
            <Plus size={20} /> Add New Product
          </button>

          {showForm && (
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-indigo-50 mb-8 animate-slide-down">
              <form
                onSubmit={handleProductSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <input
                  placeholder="Name"
                  className="border p-2 rounded"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
                <input
                  placeholder="Price"
                  type="number"
                  className="border p-2 rounded"
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  required
                />
                <input
                  placeholder="Image URL"
                  className="border p-2 rounded"
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  required
                />
                <input
                  placeholder="Colors (comma separated)"
                  className="border p-2 rounded"
                  onChange={(e) =>
                    setFormData({ ...formData, colors: e.target.value })
                  }
                />
                <textarea
                  placeholder="Description"
                  className="border p-2 rounded md:col-span-2"
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
                <button className="bg-green-600 text-white py-2 rounded md:col-span-2">
                  Publish
                </button>
              </form>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition border border-gray-100 overflow-hidden group"
              >
                <div className="relative h-48">
                  <img
                    src={product.image}
                    className="w-full h-full object-cover"
                    alt={product.name}
                  />
                  <button
                    onClick={() => {
                      if (window.confirm("Delete?"))
                        dispatch(deleteProduct(product._id));
                    }}
                    className="absolute top-2 right-2 bg-white/90 text-red-500 p-2 rounded-full opacity-0 group-hover:opacity-100 transition shadow-sm hover:bg-red-50"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 truncate">
                    {product.name}
                  </h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-indigo-600 font-bold">
                      ৳{product.price}
                    </span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      Stock: {product.inStock}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ORDERS TAB */}
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
                      onClick={() => setSelectedOrderId(order._id)} // 🛠️ FIX 3: Set ID
                      className="text-indigo-600 hover:bg-indigo-50 p-2 rounded-full transition"
                    >
                      <Eye size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ORDER DETAILS MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
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
              {/* Left Column: Items */}
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

              {/* Right Column: Customer Info & Actions */}
              <div className="space-y-6">
                {/* Shipping Info */}
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

                {/* Status Updater */}
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

// Helper Component for Status Colors
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
