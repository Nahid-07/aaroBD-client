import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProduct, createProduct } from "../../features/products/ProductSlice";
import { Trash2, Plus, Package, LayoutDashboard } from "lucide-react";
import Loader from "../../components/loader/Loader";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { items: products, loading } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);

  // Form State
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "Oversized",
    gender: "Unisex",
    image: "",
    colors: [],
    sizes: ["M", "L", "XL"],
    inStock: 10
  });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert comma separated colors to array
    const productData = {
      ...formData,
      colors: typeof formData.colors === 'string' ? formData.colors.split(",").map(c => c.trim()) : ["Black"] 
    };
    
    dispatch(createProduct(productData));
    setShowForm(false);
    // Reset form
    setFormData({ ...formData, name: "", price: "", image: "" });
  };

  if (loading) return <Loader />;

  // Admin Check (Simple Protection)
  if (!user || !user.isAdmin) {
    return <div className="text-center mt-20 text-red-500 font-bold">Access Denied. Admins Only.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <LayoutDashboard className="text-indigo-600" /> Admin Dashboard
        </h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition"
        >
          <Plus size={20} /> {showForm ? "Close Form" : "Add Product"}
        </button>
      </div>

      {/* Add Product Form */}
      {showForm && (
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8 border border-indigo-100 animate-slide-down">
          <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="name" placeholder="Product Name" onChange={handleChange} className="border p-2 rounded" required />
            <input name="price" type="number" placeholder="Price (৳)" onChange={handleChange} className="border p-2 rounded" required />
            <input name="image" placeholder="Image URL" onChange={handleChange} className="border p-2 rounded" required />
            <input name="colors" placeholder="Colors (e.g. Red, Blue)" onChange={handleChange} className="border p-2 rounded" />
            <textarea name="description" placeholder="Description" onChange={handleChange} className="border p-2 rounded md:col-span-2" rows="3" required />
            
            <div className="md:col-span-2">
              <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded shadow hover:bg-green-700 w-full">
                Publish Product
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Product List Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-gray-600">Image</th>
              <th className="p-4 text-gray-600">Name</th>
              <th className="p-4 text-gray-600">Price</th>
              <th className="p-4 text-gray-600">Stock</th>
              <th className="p-4 text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-t hover:bg-gray-50">
                <td className="p-4">
                  <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                </td>
                <td className="p-4 font-semibold text-gray-700">{product.name}</td>
                <td className="p-4 text-indigo-600 font-bold">৳ {product.price}</td>
                <td className="p-4">{product.inStock}</td>
                <td className="p-4">
                  <button
                    onClick={() => {
                        if(window.confirm('Are you sure you want to delete this product?')) {
                            dispatch(deleteProduct(product._id))
                        }
                    }}
                    className="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-full transition"
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && <p className="text-center p-8 text-gray-500">No products found.</p>}
      </div>
    </div>
  );
};

export default AdminDashboard;