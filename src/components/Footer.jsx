import { Mail, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-linear-to-br from-indigo-700 via-purple-700 to-pink-600 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-extrabold tracking-wide">AaroShop</h2>
          <p className="mt-3 text-gray-200 text-sm leading-relaxed">
            Redefining streetwear fashion. Crafted for comfort, designed for
            confidence.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-200">
            <li>
              <Link to="/" className="hover:text-yellow-300 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/shop" className="hover:text-yellow-300 transition">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-yellow-300 transition">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-yellow-300 transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Customer Care</h3>
          <ul className="space-y-2 text-gray-200">
            <li>
              <Link to="/faq" className="hover:text-yellow-300 transition">
                FAQs
              </Link>
            </li>
            <li>
              <Link to="/returns" className="hover:text-yellow-300 transition">
                Returns
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-yellow-300 transition">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-yellow-300 transition">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
          <p className="text-sm text-gray-200 mb-3">
            Subscribe to get the latest drops & exclusive offers.
          </p>

          <div className="flex items-center bg-white/10 rounded-full overflow-hidden focus-within:ring-2 focus-within:ring-yellow-400">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-transparent outline-none px-4 py-2 text-sm placeholder-gray-300 text-white"
            />
            <button className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 px-4 py-2 font-semibold transition">
              <Mail size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/20 my-8"></div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-200 text-center md:text-left">
          © {new Date().getFullYear()} AaroShop. All rights reserved.
        </p>

        {/* Social Icons */}
        <div className="flex space-x-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            className="bg-white/10 p-2 rounded-full hover:bg-yellow-400 hover:text-gray-900 transition"
          >
            <Facebook size={18} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="bg-white/10 p-2 rounded-full hover:bg-yellow-400 hover:text-gray-900 transition"
          >
            <Instagram size={18} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="bg-white/10 p-2 rounded-full hover:bg-yellow-400 hover:text-gray-900 transition"
          >
            <Twitter size={18} />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noreferrer"
            className="bg-white/10 p-2 rounded-full hover:bg-yellow-400 hover:text-gray-900 transition"
          >
            <Youtube size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
