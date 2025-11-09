import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { ButtonLoader } from "../components/loader/ButtonLoader";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser(formData));

    if (loginUser.fulfilled.match(result)) {
      toast.success("Login successful 🎉");

      // Redirect logic
      const redirect = location.state?.redirectTo || "/";
      navigate(redirect);
    } else {
      toast.error(result.payload || "Invalid credentials. Try again!");
    }
  };

  const handleGoogleSignIn = () => {
    toast("Google Sign-In not implemented yet ⚙️", { icon: "⚙️" });
    // Future: integrate Firebase or OAuth2
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 p-4">
      <motion.div
        className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl w-full max-w-md p-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <h1 className="text-3xl font-bold text-center bg-linear-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent mb-2">
          Welcome Back
        </h1>
        <p className="text-gray-500 text-center mb-6">
          Sign in to continue shopping at <span className="font-semibold">AaroShop</span>
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-linear-to-r from-indigo-600 to-pink-500 text-white font-semibold py-2.5 rounded-lg shadow-md hover:opacity-90 transition-all"
          >
            {loading ? <ButtonLoader/> : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="mx-3 text-gray-500 text-sm">or</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Google Button */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center border border-gray-300 rounded-lg py-2.5 shadow-sm hover:bg-gray-50 transition-all"
        >
          <FcGoogle size={22} className="mr-3" />
          <span className="font-medium text-gray-700">Continue with Google</span>
        </button>

        {/* Register Link */}
        <p className="text-center text-gray-600 text-sm mt-5">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
