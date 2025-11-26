import { motion } from "framer-motion";
import { Users, Award, TrendingUp, Heart } from "lucide-react";

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-indigo-900 text-white py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            We Are <span className="text-yellow-400">AaroShop</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Redefining fashion for the modern generation. We believe in quality,
            style, and sustainability.
          </motion.p>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1632&q=80"
              alt="Team working"
              className="rounded-2xl shadow-xl w-full object-cover h-[400px]"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Our Mission
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              At AaroShop, our mission is simple: to provide high-quality,
              stylish clothing that empowers individuals to express themselves.
              We started in a small garage with a big dream, and today, we serve
              thousands of happy customers worldwide.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We are committed to sustainable practices, ensuring that our
              fashion not only looks good but also does good for the planet.
              Every piece is crafted with care, passion, and attention to
              detail.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats / Features */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            {
              icon: <Users size={32} />,
              value: "10k+",
              label: "Happy Customers",
            },
            { icon: <Award size={32} />, value: "50+", label: "Awards Won" },
            {
              icon: <TrendingUp size={32} />,
              value: "100%",
              label: "Growth Rate",
            },
            {
              icon: <Heart size={32} />,
              value: "4.9/5",
              label: "Customer Rating",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 bg-gray-50 rounded-xl hover:shadow-md transition border border-gray-100"
            >
              <div className="text-indigo-600 mb-4 flex justify-center">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-1">
                {stat.value}
              </h3>
              <p className="text-gray-500 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto bg-linear-to-r from-indigo-600 to-purple-600 rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Upgrade Your Style?
            </h2>
            <p className="text-indigo-100 mb-8 max-w-xl mx-auto">
              Join thousands of trendsetters and explore our latest collection
              today.
            </p>
            <a
              href="/shop"
              className="bg-white text-indigo-600 px-8 py-3 rounded-full font-bold shadow-lg hover:bg-gray-100 transition inline-block"
            >
              Shop Now
            </a>
          </div>
          {/* Decorative circles */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-white rounded-full"></div>
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white rounded-full"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
