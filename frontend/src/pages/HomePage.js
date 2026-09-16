import { Link } from "react-router-dom";
import { UseTitle } from "../hooks/UseTitle";

export const HomePage = () => {
    UseTitle("Home");

    return (
        <main
            className="min-h-screen w-screen max-w-none m-0 p-0 flex flex-col justify-center items-center text-center text-white bg-cover bg-center"
        >
            <h1 className="text-5xl font-bold mb-6">
                YelpCamp
            </h1>

            <p className="text-lg md:text-xl leading-relaxed text-gray-300 mb-8">
                Welcome to YelpCamp! <br />
                Jump right in and explore our many campgrounds. <br />
                Feel free to share some of your own and comment on others!
            </p>

            <Link
                to="/campgrounds"
                className="px-6 py-3 text-lg font-bold text-gray-900 bg-white rounded-md hover:bg-gray-200 transition"
            >
                View Campgrounds
            </Link>
        </main>
    );
};
