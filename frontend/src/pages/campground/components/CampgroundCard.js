import { Link } from "react-router-dom"

export const CampgroundCard = ({ campground }) => {
  return (
    <div>
      <Link  className="font-medium text-blue-600 dark:text-blue-500 hover:underline" to={`/campgrounds/${campground._id}`}>{campground.title}</Link>
    </div>
  )
}
