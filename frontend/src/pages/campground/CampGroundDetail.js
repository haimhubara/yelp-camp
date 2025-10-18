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
      <div>
        <h1 className="mb-6 text-5xl font-extrabold dark:text-white">{campground.title}</h1>
      </div>
      <div>
        <h2 className="text-4xl font-bold dark:text-white">{campground.location}</h2>
      </div>
      <Link to={`/campgrounds/${campground._id}/edit`} className=" text-4xl font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit Campground</Link>
      <div>

      <button onClick={handleDeleteCampground} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Delete Campground</button>
      </div>
    </main>
  )
}
