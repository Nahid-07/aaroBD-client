import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createReview,
  fetchSingleProduct,
} from "../features/products/ProductSlice";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";

const ReviewForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to write a review");
      return;
    }
    if (rating === 0 || !comment) {
      toast.error("Please provide a rating and comment");
      return;
    }

    await dispatch(createReview({ id, reviewData: { rating, comment } }));

    // Clear form and refresh product data to show new review
    setRating(0);
    setComment("");
    dispatch(fetchSingleProduct(id));
  };

  return (
    <section className="bg-white py-10 px-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Write a Review</h3>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Star Rating */}
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="focus:outline-none transition-transform hover:scale-110"
            >
              <Star
                size={28}
                className={`${
                  star <= (hoverRating || rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Comment Box */}
        <textarea
          rows="4"
          placeholder="Share your thoughts about this product..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
        />

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="bg-indigo-600 text-white py-2 px-6 rounded-lg font-semibold shadow hover:bg-indigo-700 transition w-fit"
        >
          Submit Review
        </motion.button>
      </form>
    </section>
  );
};

export default ReviewForm;
