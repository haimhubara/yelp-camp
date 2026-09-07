import { ReviewCard } from "./ReviewCard";

export const ReviewList = ({ reviews, handleDeleteReview }) => {
  return (
    <div className="mt-8">

      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Reviews
        </h2>

        <span className="text-sm text-gray-500 dark:text-gray-400">
          {reviews?.length || 0} reviews
        </span>
      </div>

      {reviews?.length > 0 ? (

        <div className="space-y-4">
          {reviews.map((review) => (
            <ReviewCard
              key={review._id}
              review={review}
              handleDeleteReview={handleDeleteReview}
            />
          ))}
        </div>

      ) : (

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            No reviews yet.
          </p>
        </div>

      )}

    </div>
  );
};