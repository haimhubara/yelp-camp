import { useEffect, useState } from "react"
import { getAllCampgrounds } from "../../services"
import { CampgroundCard } from "./components/CampgroundCard"
import { UseTitle } from "../../hooks/UseTitle"
import { useLocation } from "react-router-dom"
import { AlertMessage } from "../../components"

export const Campgrounds = () => {

  UseTitle("Campgrounds");
  const [campegrounds, setCampgrounds] = useState([])
  const location = useLocation();

  const successMessage = location.state?.successMessage;
  const type = location.state?.type;

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
  }, [])

  return (
    <main>
      {successMessage && (
        <AlertMessage
          text={successMessage}
          type={type}
        />
      )}
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
