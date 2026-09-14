import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context";

export const CampgroundInfo = ({ campground, onDelete }) => {


  const { user } = useContext(AuthContext);
  const [currentImage, setCurrentImage] = useState(0);

  const images = campground.images || [];

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="lg:w-1/2 w-full rounded overflow-hidden">

      {/* Image Carousel */}
      <div className="relative w-full">

        <img
          className="w-full h-auto object-cover rounded"
          src={images[currentImage]?.url}
          alt={campground.title}
        />

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={previousImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded-full"
            >
              ❮
            </button>

            <button
              type="button"
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded-full"
            >
              ❯
            </button>

            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded">
              {currentImage + 1} / {images.length}
            </div>
          </>
        )}

      </div>

      <h1 className="text-4xl font-bold my-3">{campground.title}</h1>

      <h2 className="text-2xl font-bold my-3">{campground.location}</h2>

      {campground.author && (
        <h2 className="text-2xl font-bold my-3">
          Submitted by {campground.author.username}
        </h2>
      )}

      <p className="my-4">{campground.description}</p>

      <p className="my-4">
        <span className="font-bold">Price:</span> {campground.price}
      </p>

      {campground.author && user?.id === campground.author._id && (
        <div className="flex flex-wrap gap-2 mt-4">

          <Link
            to={`/campgrounds/${campground._id}/edit`}
            className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Edit Campground
          </Link>

          <button
            onClick={onDelete}
            type="button"
            className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Delete Campground
          </button>

        </div>
      )}

    </div>
  );
};