import { useEffect, useState } from "react"
import { getAllCampgrounds } from "../../services"
import { CampgroundCard } from "./components/CampgroundCard"

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
