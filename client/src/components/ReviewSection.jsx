import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  addReview,
  getCourseReviews,
} from "../services/reviewService";

const ReviewSection = ({ courseId }) => {
  const [reviews, setReviews] = useState([]);

  const [rating, setRating] = useState(5);

  const [comment, setComment] = useState("");

  const [averageRating, setAverageRating] =
    useState(0);

  const [totalReviews, setTotalReviews] =
    useState(0);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const data = await getCourseReviews(
        courseId
      );

      setReviews(data.reviews);

      setAverageRating(data.averageRating);

      setTotalReviews(data.totalReviews);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await addReview(courseId, rating, comment);

    toast.success("Review Added");

    setComment("");
    setRating(5);

    fetchReviews();
  } catch (error) {
    console.log(error);

    toast.error(
      error.response?.data?.message ||
        "Failed to add review"
    );
  }
};
return (
  <div className="mt-16">

    <h2 className="text-3xl font-bold mb-6">
      Course Reviews
    </h2>

    <div className="bg-white rounded-xl shadow p-6">

      <div className="mb-8">

        <h3 className="text-xl font-semibold">
          ⭐ {averageRating} / 5
        </h3>

        <p className="text-gray-500">
          {totalReviews} Reviews
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <div>

          <label className="font-semibold">
            Rating
          </label>

          <select
            value={rating}
            onChange={(e) =>
              setRating(Number(e.target.value))
            }
            className="w-full border rounded-lg p-3 mt-2"
          >
            <option value={5}>⭐⭐⭐⭐⭐</option>
            <option value={4}>⭐⭐⭐⭐</option>
            <option value={3}>⭐⭐⭐</option>
            <option value={2}>⭐⭐</option>
            <option value={1}>⭐</option>
          </select>

        </div>

        <div>

          <label className="font-semibold">
            Comment
          </label>

          <textarea
            rows="4"
            value={comment}
            onChange={(e) =>
              setComment(e.target.value)
            }
            className="w-full border rounded-lg p-3 mt-2"
            placeholder="Write your review..."
          />

        </div>

        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Submit Review
        </button>

      </form>

      <div className="mt-10 space-y-6">

        {reviews.map((review) => (

          <div
            key={review._id}
            className="border rounded-xl p-5"
          >

            <h3 className="font-bold text-lg">
              {review.user?.name}
            </h3>

            <p className="text-yellow-500">
              {"⭐".repeat(review.rating)}
            </p>

            <p className="text-gray-600 mt-2">
              {review.comment}
            </p>

          </div>

        ))}

      </div>

    </div>

  </div>
);
};

export default ReviewSection;