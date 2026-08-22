
export const ReviewForm = ({  handleReview,rating,setRating,comment,handleCommentChange,commentError,setCommentError}) => {

  const validTextarea = "bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500";

  const initialTextarea = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

  const errorTextarea = "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500";
  
  return (
    
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6">

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Leave a Review
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Share your experience with this campground.
            </p>

            <form
              noValidate
              onSubmit={handleReview }
              className="mt-6"
            >

              {/* Rating */}
              <label className="block mb-3 text-sm font-medium text-gray-900 dark:text-white">
                Rating
              </label>

              <div className="flex items-center gap-1">

                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => {
                      setRating(star);
                      setCommentError(false);
                    }}
                    className="focus:outline-none hover:scale-110 transition-transform"
                  >
                    <span
                      className={`text-3xl cursor-pointer transition-transform hover:scale-110 ${star <= rating
                        ? "text-yellow-400"
                        : "text-gray-300"
                        }`}
                    >
                      ★
                    </span>
                  </button>
                ))}

              </div>

              {rating > 0 && (
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  You selected {rating} out of 5 stars
                </p>
              )}

              {/* Comment */}
              <div className="mt-6">

                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Review
                </label>

                <textarea
                  value={comment}
                  onChange={handleCommentChange}
                  id="message"
                  rows="5"
                  className={
                    commentError
                      ? errorTextarea
                      : comment
                        ? validTextarea
                        : initialTextarea
                  }
                  placeholder="Write your thoughts here..."
                />

                {commentError && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    Please provide a rating and write a review.
                  </p>
                )}

              </div>

              {/* Submit */}
              <button
                type="submit"
                className="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center transition dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                Add Review
              </button>

            </form>
          </div>
  )
}
