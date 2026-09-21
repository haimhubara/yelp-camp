import { Link } from "react-router-dom"

export const CampgroundCard = ({ campground }) => {
  return (
    <div className="flex flex-wrap justify-between border-b dark:border-slate-700 max-w-4xl m-auto p-2 mb-5 items-start">
      <Link to={`/campgrounds/${campground._id}`}>
        <img
          className="w-32 h-32 object-cover rounded"
          src={campground.images[0].thumbnail}
          alt={campground.title}
        />
      </Link>
      <div className="flex-1 ml-4">
        <Link to={`/campgrounds/${campground._id}`}>
          <p className="text-lg font-semibold dark:text-slate-200">{campground.title}</p>
        </Link>
        <Link to={`/campgrounds/${campground._id}`}>
          <p className="text-sm text-gray-600 dark:text-slate-400 mt-1 line-clamp-3">{campground.description}</p>
        </Link>
        <Link to={`/campgrounds/${campground._id}`}>
          <p className="text-sm text-blue-500 dark:text-blue-400 mt-1 italic">{campground.location}</p>
        </Link>
      </div>
      <div className="text-lg ml-4 dark:text-slate-200 self-start">
        <span>${campground.price}</span>
      </div>

    </div>
  )
}
