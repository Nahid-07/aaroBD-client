import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckOutPage";
import OrderSuccess from "./pages/OrderSuccess";
import { Toaster } from "react-hot-toast";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProfilePage from "./pages/ProfilePage";
import Shop from "./pages/Shop";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="p-4">
          <Toaster position="top-center" reverseOrder={false} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/shop" element={<Shop />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
