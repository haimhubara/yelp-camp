import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context";

export const CampgroundInfo = ({ campground, onDelete }) => {

  const { user } = useContext(AuthContext);

  return (
    <div className="lg:w-1/2 w-full rounded overflow-hidden">
      <img
        className="w-full h-auto object-cover rounded"
        src={campground.image}
        alt={campground.title}
      />
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

      {campground.author && user?.id === campground.author._id &&  (<div className="flex flex-wrap gap-2 mt-4">

        <Link
          to={`/campgrounds/${campground._id}/edit`}
          className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
        >
          Edit Campground
        </Link>
        <button
          onClick={onDelete}
          type="button"
          className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
        >
          Delete Campground
        </button>



      </div>)}
    </div>
  )
}
