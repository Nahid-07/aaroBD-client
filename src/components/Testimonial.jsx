import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Nahidul Islam",
    role: "Verified Buyer",
    image: "https://i.pravatar.cc/150?img=3",
    text: "Absolutely loved the quality! The print was sharp, the fabric feels premium, and the fit is perfect. Highly recommended!",
    rating: 5,
  },
  {
    id: 2,
    name: "Ariana Rahman",
    role: "Repeat Customer",
    image: "https://i.pravatar.cc/150?img=5",
    text: "Super comfortable T-shirts. I’ve already ordered three times! Love how creative and minimal the designs are.",
    rating: 4,
  },
  {
    id: 3,
    name: "Rafi Khan",
    role: "New Customer",
    image: "https://i.pravatar.cc/150?img=8",
    text: "Fast delivery, good packaging, and the product looks even better in real life. Definitely ordering again soon!",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="bg-linear-to-r from-indigo-50 via-white to-pink-50 py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
        >
          What Our Customers Say 💬
        </motion.h2>
        <p className="text-gray-600 mb-10">
          Hear from the amazing people who wear our T-shirts with pride.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center hover:shadow-xl transition"
            >
              <img
                src={review.image}
                alt={review.name}
                className="w-20 h-20 rounded-full mb-4 object-cover border-4 border-indigo-100"
              />
              <p className="text-gray-600 italic mb-4">"{review.text}"</p>
              <div className="flex mb-3">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="text-yellow-400 fill-yellow-400"
                    size={18}
                  />
                ))}
              </div>
              <h3 className="font-semibold text-gray-800">{review.name}</h3>
              <span className="text-sm text-gray-500">{review.role}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
