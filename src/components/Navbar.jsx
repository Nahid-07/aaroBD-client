import { useState } from "react";
import { ShoppingBag, User, Menu, X, LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { Link } from "react-router-dom";

const Navbar = () => {
  const menuItems = [
    {
      menu: "Home",
      path: "/",
    },
    {
      menu: "Shop",
      path: "/shop",
    },
    {
      menu: "About",
      path: "/about",
    },
    {
      menu: "Contact",
      path: "/contact",
    },
  ];
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { totalQuantity } = useSelector((state) => state.cart);

  const handleLogOut = () => {
    dispatch(logout());
    setMenuOpen(false);
  };

  return (
    <nav className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Navbar */}
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-extrabold text-white tracking-wide hover:scale-105 transition-transform"
          >
            Aaro<span className="text-yellow-300">Shop</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {menuItems.map((item, i) => (
              <Link
                key={i}
                to={item.path}
                className="text-white font-medium hover:text-yellow-300 transition"
              >
                {item.menu}
              </Link>
            ))}
          </div>

          {/* Icons / Auth */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon */}
            <Link to="/cart" className="relative text-white">
              <ShoppingBag size={24} />
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-xs font-bold text-gray-900 rounded-full px-1">
                  {totalQuantity}
                </span>
              )}
            </Link>

            {/* User / Auth Section */}
            {user ? (
              <div className="flex items-center space-x-2 text-white">
                <User size={22} />
                <span className="hidden sm:block text-sm">
                  Hi, {user.name.split(" ")[0]}
                </span>
                <button
                  onClick={handleLogOut}
                  className="flex items-center space-x-1 bg-yellow-400 hover:bg-yellow-300 text-gray-800 font-semibold px-3 py-1 rounded-md text-sm transition"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-white text-indigo-600 font-semibold px-4 py-1 rounded-md hover:bg-yellow-300 hover:text-gray-900 transition"
              >
                Login
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-white"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-indigo-700 animate-slide-down">
          {menuItems.map((item, i) => (
            <Link
              key={i}
              to={`/${item.path}`}
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-2 text-white hover:bg-indigo-600 transition"
            >
              {item.menu}
            </Link>
          ))}

          {/* Mobile Auth Links */}
          <div className="px-4 py-3 border-t border-indigo-600">
            {user ? (
              <button
                onClick={handleLogOut}
                className="w-full text-left text-yellow-300 hover:text-yellow-200 transition"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block text-yellow-300 hover:text-yellow-200 transition"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
