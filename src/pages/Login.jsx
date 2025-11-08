import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { setDirectBuyItem } from "../features/checkout/checkoutSlice";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, error, user } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(loginUser(formData));

    // ✅ Simplified success check
    if (loginUser.fulfilled.match(result)) {
      // If a product was saved before login, restore it
      const pending = localStorage.getItem("pendingDirectBuyItem");
      if (pending) {
        const product = JSON.parse(pending);
        dispatch(
          setDirectBuyItem({
            _id: product._id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
          })
        );
        localStorage.removeItem("pendingDirectBuyItem");
      }

      const redirect = location.state?.redirectTo || "/";
      navigate(redirect);
    }
  };

  useEffect(() => {
    if (user) {
      const redirect = location.state?.redirectTo || "/";
      navigate(redirect);
    }
  }, [user, navigate, location]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-500 to-pink-500 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Welcome Back 👋
        </h2>

        {error && (
          <p className="text-red-500 text-center mb-3 bg-red-50 py-1 rounded">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
