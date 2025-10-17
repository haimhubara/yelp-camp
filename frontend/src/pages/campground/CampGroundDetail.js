import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { getCampground } from "../../services";

export const CampGroundDetail = () => {
  const { id } = useParams()
  const [campground, setCampground] = useState({})

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
  return (
    <main>
      <div>
        <h1 className="mb-6 text-5xl font-extrabold dark:text-white">{campground.title}</h1>
      </div>
      <div>
        <h2 className="text-4xl font-bold dark:text-white">{campground.location}</h2>
      </div>
    </main>
  )
}
