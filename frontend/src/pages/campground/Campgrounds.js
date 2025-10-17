import { useEffect, useState } from "react"
import { getAllCampgrounds } from "../../services"
import { CampgroundCard } from "./components/CampgroundCard"
import { Link } from "react-router-dom"

export const Campgrounds = () => {

  const [campegrounds, setCampgrounds] = useState([])

  useEffect(() => {
    async function getCampgrounds() {
      try {
        const data = await getAllCampgrounds();
        setCampgrounds(data); 
      } catch (error) {
        console.log(error)
      }
    }
    getCampgrounds()
  }, [setCampgrounds])

  return (
    <main>
      <Link to="/campgrounds/new" className=" text-4xl font-medium text-blue-600 dark:text-blue-500 hover:underline">AddCampground</Link>
      {
        campegrounds.map((campground) => {
          return (
            <CampgroundCard key={campground._id} campground={campground} />
          )
        })
      }
    </main>
  )
}
