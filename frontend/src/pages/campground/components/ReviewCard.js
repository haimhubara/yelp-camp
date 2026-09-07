import { useContext } from "react";
import { AuthContext } from "../../../context";

export const ReviewCard = ({ review, handleDeleteReview }) => {
  const { user } = useContext(AuthContext);
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm">

      {/* User */}
      <div className="flex items-center gap-3 mb-3">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
          <span className="text-blue-700 dark:text-blue-300 font-semibold">
            {review.author.username.charAt(0).toUpperCase()}
          </span>
        </div>

        {/* Username + Rating */}
        <div>
          <p className="font-semibold text-gray-900 dark:text-white">
            {review.author.username}
          </p>

          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`text-sm ${star <= review.rating
                    ? "text-yellow-400"
                    : "text-gray-300 dark:text-gray-600"
                  }`}
              >
                ★
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Review text */}
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        {review.body}
      </p>

      {/* Delete */}
      {user && user.id === review.author._id && 
        <button
          onClick={() => handleDeleteReview(review._id)}
          type="button"
          className="mt-4 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 rounded-md text-xs px-2.5 py-1 transition"
        >
          Delete Review
        </button>
       } 

    </div>
  );
};

