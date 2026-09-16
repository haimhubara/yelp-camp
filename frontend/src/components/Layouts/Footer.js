import { Link } from "react-router-dom";

export const Footer = ({ isHomePage }) => {
    return (
        <footer
            className={
                isHomePage
                    ? "bg-transparent"
                    : "bg-white shadow dark:bg-gray-800 dark:border dark:border-gray-700"
            }
        >
            <div className="p-4 mx-auto max-w-screen-xl md:flex md:items-center md:justify-between md:p-6">
                <span
                    className={
                        isHomePage
                            ? "text-sm text-white sm:text-center"
                            : "text-sm text-gray-500 sm:text-center dark:text-gray-400"
                    }
                >
                    © {new Date().getFullYear()}{" "}
                    <Link
                        to="/campgrounds"
                        className="hover:underline"
                    >
                        YelpCamp
                    </Link>
                    . All Rights Reserved.
                </span>

                <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
                    <a
                        href="https://www.linkedin.com/in/haimhubara/"
                        target="_blank"
                        rel="noreferrer"
                        className={
                            isHomePage
                                ? "text-white hover:text-gray-300"
                                : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
                        }
                    >
                        <i className="bi bi-linkedin"></i>
                        <span className="sr-only">linkedin page</span>
                    </a>

                    <a
                        href="mailto:your.haimhobara@gmail.com"
                        target="_blank"
                        rel="noreferrer"
                        className={
                            isHomePage
                                ? "text-white hover:text-gray-300"
                                : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
                        }
                    >
                        <i className="bi bi-envelope-fill"></i>
                        <span className="sr-only">Email page</span>
                    </a>

                    <a
                        href="https://github.com/haimhubara"
                        target="_blank"
                        rel="noreferrer"
                        className={
                            isHomePage
                                ? "text-white hover:text-gray-300"
                                : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
                        }
                    >
                        <i className="bi bi-github"></i>
                        <span className="sr-only">Github page</span>
                    </a>
                </div>
            </div>
        </footer>
    );
};