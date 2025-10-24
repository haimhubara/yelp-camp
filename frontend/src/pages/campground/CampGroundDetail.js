import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
import { getCampground, deleteCampground } from "../../services";

export const CampGroundDetail = () => {
  const { id } = useParams()
  const [campground, setCampground] = useState({})
  const navigate = useNavigate();

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

  return (
    <main>
      <section className="flex flex-col lg:flex-row w-full py-5 px-4 lg:px-20 gap-8">
        <div className="lg:w-1/2 w-full rounded overflow-hidden">
          <img
            className="w-full h-auto object-cover rounded"
            src={campground.image}
            alt={campground.title}
          />
        </div>
        <div className="lg:w-1/2 w-full text-gray-700 dark:text-white">
          <h1 className="text-4xl font-bold my-3">{campground.title}</h1>
          <h2 className="text-2xl font-bold my-3">{campground.location}</h2>
          <p className="my-4">{campground.description}</p>
          <p className="my-4">
            <span className="font-bold">Price:</span> {campground.price}
          </p>

          <div className="flex flex-wrap gap-2 mt-4">
            <Link
              to={`/campgrounds/${campground._id}/edit`}
              className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
            >
              Edit Campground
            </Link>
            <button
              onClick={handleDeleteCampground}
              type="button"
              className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
            >
              Delete Campground
            </button>
          </div>
        </div>

      </section>
    </main>
  )
}
