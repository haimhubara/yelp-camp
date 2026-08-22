export const ReviewCard = ({ review, handleDeleteReview }) => {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm">

      {/* Stars */}
      <div className="flex items-center gap-1 mb-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-xl ${
              star <= review.rating
                ? "text-yellow-400"
                : "text-gray-300"
            }`}
          >
            ★
          </span>
        ))}
      </div>

      {/* Review text */}
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        {review.body}
      </p>

      <button
        onClick={() => handleDeleteReview(review._id)}
        type="button"
        className="mt-3 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 rounded-md text-xs px-2.5 py-1"
      >
        Delete Review
      </button>

    </div>
  );
};