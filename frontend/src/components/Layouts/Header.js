import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";

export const Header = () => {
    const activeClass = "block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500";
    const inActiveClass = "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700";
    const [menuOpen, setMenuOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem("darkMode")) ?? true);

    useEffect(() => {
        localStorage.setItem("darkMode", JSON.stringify(darkMode));
        if (darkMode) {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }

    }, [darkMode])

    return (
        <header>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="/assets/logo.png" className="h-8" alt="My Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">YelpCamp</span>
                    </Link>

                    <div className="flex md:order-2 space-x-0 md:space-x-0 rtl:space-x-reverse">
                        <button
                            aria-label="darkMode"
                            onClick={() => { setDarkMode(prev => !prev) }}
                            type="button"
                            className="cursor-pointer text-xl text-gray-700 dark:text-white mr-2"
                        >
                            {darkMode ?
                                <svg className=" text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5V3m0 18v-2M7.05 7.05 5.636 5.636m12.728 12.728L16.95 16.95M5 12H3m18 0h-2M7.05 16.95l-1.414 1.414M18.364 5.636 16.95 7.05M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" />
                                </svg>
                                : <svg className=" text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M11.675 2.015a.998.998 0 0 0-.403.011C6.09 2.4 2 6.722 2 12c0 5.523 4.477 10 10 10 4.356 0 8.058-2.784 9.43-6.667a1 1 0 0 0-1.02-1.33c-.08.006-.105.005-.127.005h-.001l-.028-.002A5.227 5.227 0 0 0 20 14a8 8 0 0 1-8-8c0-.952.121-1.752.404-2.558a.996.996 0 0 0 .096-.428V3a1 1 0 0 0-.825-.985Z" clipRule="evenodd" />
                                </svg>
                            }
                        </button>
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div>

                    {/* תפריט ניווט */}
                    <div className={`${menuOpen ? "block" : "hidden"} w-full md:flex md:w-auto md:order-1`}>
                        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li><NavLink to="/" className={({ isActive }) => isActive ? activeClass : inActiveClass}>Home</NavLink></li>
                            <li><NavLink to="/campgrounds" end className={({ isActive }) => isActive ? activeClass : inActiveClass}>Camegrounds</NavLink></li>
                            <li><NavLink to="/campgrounds/new" end className={({ isActive }) => isActive ? activeClass : inActiveClass}>New Camegrounds</NavLink></li>
                        </ul>
                    </div>

                </div>
            </nav>
        </header>
    )
}