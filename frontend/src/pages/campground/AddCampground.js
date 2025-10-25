import { useEffect, useRef, useState } from "react"
import { addCampground } from "../../services"
import { useNavigate } from "react-router-dom"

const validInput = "bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
const initialInput = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
const errorInput = "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"

const initialLabel = "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
const validLabel = "block mb-2 text-sm font-medium text-green-700 dark:text-green-500"
const errorLabel = "block mb-2 text-sm font-medium text-red-700 dark:text-red-500"


export const AddCampground = () => {

    const [validForm, setValidForm] = useState(false);
    const [errors, setErrors] = useState({

        title: null,
        location: null,
        image: null,
        price: null,
        description: null
    });
    useEffect(() => {
        const allFilled =
            title.current?.value &&
            location.current?.value &&
            image.current?.value &&
            price.current?.value &&
            parseFloat(price.current?.value) > 0 &&
            description.current?.value;
        setValidForm(!!allFilled);
    }, [errors]);


    const title = useRef()
    const location = useRef()
    const description = useRef()
    const image = useRef()
    const price = useRef()
    const navigate = useNavigate();

    const handleNoValidForm = (event) => {
        event.preventDefault();
        setErrors({
            title: !title.current.value.trim(),
            location: !location.current.value.trim(),
            image: !image.current.value.trim(),
            price: !price.current.value.trim() || parseFloat(price.current.value) <= 0,
            description: !description.current.value.trim()
        });

    }




    const handleAddCampground = async (event) => {
        try {
            event.preventDefault();
            const campgroundData = {
                title: title.current.value,
                location: location.current.value,
                image: image.current.value,
                price: price.current.value,
                description: description.current.value
            }
            const data = await addCampground(campgroundData);
            if (data && data._id) {
                navigate(`/campgrounds/${data._id}`)
            } else {
                alert("Something went wrong. Please try again.");
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onChange = (e) => {
        const input = e.target.id
        switch (input) {
            case "title":
                setErrors((prev) => ({ ...prev, title: e.target.value.trim() === "" ? true : false, }))
                break;
            case "location":
                setErrors((prev) => ({ ...prev, location: e.target.value.trim() === "" ? true : false, }))
                break;
            case "image":
                setErrors((prev) => ({ ...prev, image: e.target.value.trim() === "" ? true : false, }))
                break;
            case "price":
                const priceValue = parseFloat(e.target.value);
                setErrors((prev) => ({
                    ...prev,
                    price: e.target.value.trim() === "" || priceValue <= 0 ? true : false
                }));
                break;
            case "description":
                setErrors((prev) => ({ ...prev, description: e.target.value.trim() === "" ? true : false, }))
                break;
            default:
                break;
        }
    }




    return (
        <main>
            <form onSubmit={validForm ? handleAddCampground : handleNoValidForm} className="max-w-sm mx-auto" noValidate>
                <div className="mb-5">
                    <label htmlFor="title" className={errors.title === null ? initialLabel : errors.title ? errorLabel : validLabel}>Title</label>
                    <input onChange={onChange} ref={title} type="title" id="title" className={errors.title === null ? initialInput : errors.title ? errorInput : validInput} required />
                </div>
                <div className="mb-5">
                    <label className={errors.location === null ? initialLabel : errors.location ? errorLabel : validLabel} htmlFor="location">Location</label>
                    <input onChange={onChange} ref={location} type="location" id="location" className={errors.location === null ? initialInput : errors.location ? errorInput : validInput} required />
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className={errors.image === null ? initialLabel : errors.image ? errorLabel : validLabel}>Image Url</label>
                    <input onChange={onChange} ref={image} type="string" id="image" className={errors.image === null ? initialInput : errors.image ? errorInput : validInput} required />
                </div>
                <div className="mb-5">
                    <label htmlFor="message" className={errors.price === null ? initialLabel : errors.price ? errorLabel : validLabel}>Price</label>
                    <div className="flex">
                        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                            <div className="w-4 h-4 text-gray-500 dark:text-gray-400" >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-currency-dollar" viewBox="0 0 16 16">
                                    <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73z" />
                                </svg>
                            </div>
                        </span>
                        <input onChange={onChange} ref={price} min={0} type="number" id="price" className={errors.price === null ? initialInput : errors.price ? errorInput : validInput} required>
                        </input>
                    </div>
                </div>
                <div className="mb-5">
                    <label htmlFor="description" className={errors.description === null ? initialLabel : errors.description ? errorLabel : validLabel}>Description</label>
                    <textarea onChange={onChange} ref={description} id="description" rows="4" className={errors.description === null ? initialInput : errors.description ? errorInput : validInput} required ></textarea>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Campground</button>
            </form>
        </main>
    )
}
