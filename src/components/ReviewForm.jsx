import { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { toast } from "react-hot-toast";

const ReviewForm = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    review: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.review || rating === 0) {
      toast.error("Please fill all fields and select a rating.");
      return;
    }

    // Later you’ll send this to your backend
    console.log("Review submitted:", { ...formData, rating });

    toast.success("Thanks for your feedback!");
    setFormData({ name: "", email: "", review: "" });
    setRating(0);
  };

  return (
    <section className="bg-linear-to-r from-indigo-50 via-white to-pink-50 py-16 px-6 md:px-12">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-gray-800 mb-4"
        >
          Leave a Review 🌟
        </motion.h2>
        <p className="text-gray-600 mb-8">
          We value your feedback — help us make your experience even better!
        </p>

        {/* Rating Stars */}
        <div className="flex justify-center mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={28}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className={`cursor-pointer transition-colors ${
                star <= (hoverRating || rating)
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 text-left max-w-md mx-auto"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
          />
          <textarea
            name="review"
            placeholder="Write your review..."
            value={formData.review}
            onChange={handleChange}
            rows={4}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 resize-none"
          />
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="bg-linear-to-r from-indigo-600 to-pink-500 text-white py-3 rounded-full font-semibold shadow-lg hover:opacity-90 transition"
          >
            Submit Review
          </motion.button>
        </form>
      </div>
    </section>
  );
};

export default ReviewForm;
