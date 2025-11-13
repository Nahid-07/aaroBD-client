import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">
      {/* Decorative Background Circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-72 h-72 bg-white/10 rounded-full top-10 left-10 blur-3xl"></div>
        <div className="absolute w-96 h-96 bg-yellow-400/10 rounded-full bottom-10 right-10 blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-20 flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left space-y-6"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
            Redefine Your <br />
            <span className="text-yellow-300 drop-shadow-md">Street Style</span>
          </h1>

          <p className="text-lg text-gray-100 max-w-xl mx-auto md:mx-0">
            Explore our exclusive T-shirt collection — bold designs, premium
            fabrics, and everyday comfort for the modern trendsetter.
          </p>

          <div className="flex justify-center md:justify-start gap-4 pt-4">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-yellow-400 text-gray-900 px-6 py-3 rounded-full font-semibold shadow-md hover:scale-105 hover:shadow-lg transition"
            >
              <ShoppingBag size={20} /> Shop Now
            </Link>
            <Link
              to="/collection"
              className="inline-flex items-center gap-2 border border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-indigo-700 transition"
            >
              Explore Collection
            </Link>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex justify-center md:justify-end w-full md:w-1/2"
        >
          <img
            src=""
            alt="T-Shirt Mockup"
            className="w-[300px] sm:w-[400px] md:w-[480px] drop-shadow-2xl rounded-2xl hover:scale-105 transition-transform duration-500"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
