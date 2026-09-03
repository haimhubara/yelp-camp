import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";


const validInput = "bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
const initialInput = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
const errorInput = "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"

const initialLabel = "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
const validLabel = "block mb-2 text-sm font-medium text-green-700 dark:text-green-500"
const errorLabel = "block mb-2 text-sm font-medium text-red-700 dark:text-red-500"


export const Password = ({password, onChange,errors}) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className="mb-5">
            <label
                className={
                    errors.password === null
                        ? initialLabel
                        : errors.password
                            ? errorLabel
                            : validLabel
                }
                htmlFor="password"
            >
                Password
            </label>

            <div className="relative">
                <input
                    onChange={onChange}
                    ref={password}
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className={
                        errors.password === null
                            ? initialInput + " pr-10"
                            : errors.password
                                ? errorInput + " pr-10"
                                : validInput + " pr-10"
                    }
                    required
                />

                <button
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
                >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            </div>
        </div>
    )
}
