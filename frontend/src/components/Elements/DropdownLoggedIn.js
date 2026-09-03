import { useNavigate } from "react-router-dom";
import { logout } from "../../services";
import { AuthContext } from "../../context";
import { useContext } from "react";

export const DropdownLoggedIn = ({ setDropDown }) => {
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);

    const handleLogout = async () => {
        try {
            const data = await logout();

            if (data.success) {
                setUser(null);
                setDropDown(false);
                navigate("/");
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div
            id="dropdownAvatar"
            className="select-none absolute top-10 left-0 z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
        >
            <div className="py-1">
                <span
                    onClick={handleLogout}
                    className="cursor-pointer block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                    Log out
                </span>
            </div>
        </div>
    );
};

