import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, googleLogin } from "../features/auth/authSlice"; // Import googleLogin
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { ButtonLoader } from "../components/loader/ButtonLoader";
import { GoogleLogin } from "@react-oauth/google"; // Import Google Component

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, user, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  // Redirect if logged in
  useEffect(() => {
    if (user) {
      const redirect = location.state?.redirectTo || "/";
      navigate(redirect);
    }
  }, [user, navigate, location]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser(formData));
    if (loginUser.fulfilled.match(result)) {
      toast.success("Login successful 🎉");
    } else {
      toast.error(result.payload || "Invalid credentials");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    const result = await dispatch(googleLogin(credentialResponse.credential));
    if (googleLogin.fulfilled.match(result)) {
      toast.success("Google Login successful 🎉");
    } else {
      toast.error("Google Login failed");
    }
  };

  const handleGoogleError = () => {
    toast.error("Google Login Failed");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 p-4">
      <motion.div
        className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl w-full max-w-md p-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-center bg-linear-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent mb-2">
          Welcome Back
        </h1>
        <p className="text-gray-500 text-center mb-6">
          Sign in to continue shopping at{" "}
          <span className="font-semibold">AaroShop</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ... (Email and Password Inputs - Keep existing code) ... */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
              />
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
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
              />
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-linear-to-r from-indigo-600 to-pink-500 text-white font-semibold py-2.5 rounded-lg shadow-md hover:opacity-90 transition-all"
          >
            {loading ? <ButtonLoader /> : "Login"}
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="mx-3 text-gray-500 text-sm">or</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* 🆕 Google Button */}
        <div className="flex justify-center w-full">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            useOneTap
            theme="filled_blue"
            shape="pill"
            width="320px"
          />
        </div>

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
