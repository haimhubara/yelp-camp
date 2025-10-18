import { useEffect, useRef, useState } from "react"
import { editCampgrounds, getCampground } from "../../services"
import { Link, useNavigate, useParams } from "react-router-dom"


export const EditCampground = () => {

    const title = useRef()
    const location = useRef()
    const navigate = useNavigate();
    const { id } = useParams();
    const [campground, setCampground] = useState({});

    useEffect(()=>{
        async function getCampgroundById() {
           const campground = await getCampground(id);
           setCampground(campground) 
        }
        getCampgroundById()
    },[id])

    const handleEditCampground = async (event) => {
        try {
            event.preventDefault();
            const campgroundData = {
                title: title.current.value,
                location: location.current.value
            }
            const data = await editCampgrounds(campgroundData,campground._id);
            if (data && data._id) {
                navigate(`/campgrounds/${data._id}`)
            } else {
                alert("Something went wrong. Please try again.");
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <main>
            <form onSubmit={handleEditCampground} className="max-w-sm mx-auto">
                <div className="mb-5">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                    <input   onChange={(e) => setCampground({ ...campground, title: e.target.value })} ref={title} value={campground.title} type="title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location</label>
                    <input   onChange={(e) => setCampground({ ...campground, location: e.target.value })} value={campground.location} ref={location} type="location" id="location" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit Campground</button>
                <div className="mt-5">
                  <Link to="/campgrounds" className="text-4xl font-medium text-blue-600 dark:text-blue-500 hover:underline">AllCampgrounds</Link>
                </div>
            </form>
          

        </main>
    )
}
