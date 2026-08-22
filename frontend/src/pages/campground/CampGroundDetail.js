import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { getCampground, deleteCampground, addReview, deleteReview } from "../../services";
import { CampgroundInfo, ReviewForm, ReviewList } from "./components";

export const CampGroundDetail = () => {

  const [commentError, setCommentError] = useState(false);

  const { id } = useParams()
  const [campground, setCampground] = useState({})
  const navigate = useNavigate();
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("");

  useEffect(() => {
    async function fetchCampground() {
      try {
        const data = await getCampground(id);
        setCampground(data);
      } catch (error) {
        console.log(error)
      }
    }
    fetchCampground()
  }, [id])

  const handleDeleteCampground = async () => {
    try {
      await deleteCampground(campground._id);
      navigate("/campgrounds");
    } catch (error) {
      console.error(error);
    }
  };

  const handleReview = async (e) => {
    e.preventDefault();

    if (!comment.trim() || rating < 1 || rating > 5) {
      setCommentError(true);
      return;
    }

    setCommentError(false);

    const response = await addReview(
      rating,
      comment,
      campground._id
    );
    if (response.ok) {
      const data = await getCampground(campground._id);
      setCampground(data);

      setRating(0);
      setComment("");
    }
  };
  const handleCommentChange = (e) => {
    const value = e.target.value;
    setComment(value);
    setCommentError(value.trim() === "");
  };
  const handleDeleteReview = async (reviewId) => {
    try {
      const response = await deleteReview(campground._id, reviewId);
      if (response.ok) {
        const data = await getCampground(campground._id);
        setCampground(data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main>
      <section className="flex flex-col lg:flex-row w-full py-5 px-4 lg:px-20 gap-8 text-gray-700 dark:text-white">

        <CampgroundInfo
          campground={campground}
          onDelete={handleDeleteCampground}
        />

        <div className="lg:w-1/2 w-full">

          <ReviewForm
            handleReview={handleReview}
            rating={rating}
            setRating={setRating}
            comment={comment}
            handleCommentChange={handleCommentChange}
            commentError={commentError}
            setCommentError={setCommentError}
          />

           <ReviewList
            reviews={campground.reviews}
            handleDeleteReview={handleDeleteReview}
          />

        </div>

      </section>
    </main>
  );
};