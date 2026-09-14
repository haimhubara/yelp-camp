import { useContext, useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getCampground, deleteCampground, addReview, deleteReview } from "../../services";
import { CampgroundInfo, ReviewForm, ReviewList } from "./components";
import { UseTitle } from "../../hooks/UseTitle"
import { AlertMessage, MapComponent } from "../../components"
import { AuthContext } from "../../context";

export const CampGroundDetail = () => {

  const { user } = useContext(AuthContext);

  const [commentError, setCommentError] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState({
    text: "",
    type: ""
  });
  const location = useLocation();

  const successMessage = location.state?.successMessage;
  const type = location.state?.type;

  const { id } = useParams()
  const [campground, setCampground] = useState({})
  const navigate = useNavigate();
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("");

  UseTitle(`campgrounds - ${campground.title}`);
  useEffect(() => {
    async function fetchCampground() {
      try {
        const data = await getCampground(id);
        setCampground(data);
      } catch (error) {
        console.log(error)
        setError(error);
      }
    }
    fetchCampground()
  }, [id])

  const handleDeleteCampground = async () => {
    try {
      const data = await deleteCampground(campground._id);

      if (data.success) {
        navigate("/campgrounds", {
          state: {
            successMessage: data.message,
            type: "success"
          }
        });
      }
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

    try {
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

        setMessage({
          text: "Review added successfully",
          type: "success"
        });
      }
    } catch (error) {
      console.error(error);

      setMessage({
        text: error.message || "Failed to add review",
        type: "danger"
      });
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

        setMessage({
          text: "Review deleted successfully",
          type: "success"
        });
      }
    } catch (error) {
      console.error(error);

      setMessage({
        text: error.message || "Failed to delete review",
        type: "danger"
      });
    }
  };


  if (error) {
    return (
      <main>
        <AlertMessage
          text="Campground not found"
          type="danger"
        />
      </main>
    );
  }
  console.log(campground)


  return (
    <main>
      {successMessage && (
        <AlertMessage
          text={successMessage}
          type={type}
        />
      )}
      {message.text && (
        <AlertMessage
          text={message.text}
          type={message.type}
          onClose={() => setMessage({ text: "", type: "" })}
        />
      )}
      <section className="flex flex-col lg:flex-row w-full py-5 px-4 lg:px-20 gap-8 text-gray-700 dark:text-white">

        <CampgroundInfo
          campground={campground}
          onDelete={handleDeleteCampground}
        />

        <div className="lg:w-1/2 w-full">

          <div className="mb-8">
            <MapComponent
              coordinates={campground.geometry?.coordinates}
              title={campground.title}
              location={campground.location}
            />
          </div>

          {user && (
            <ReviewForm
              handleReview={handleReview}
              rating={rating}
              setRating={setRating}
              comment={comment}
              handleCommentChange={handleCommentChange}
              commentError={commentError}
              setCommentError={setCommentError}
            />
          )}

          <ReviewList
            reviews={campground.reviews}
            handleDeleteReview={handleDeleteReview}
          />

        </div>

      </section>
    </main>
  );
};