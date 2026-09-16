import React, { useEffect, useState } from "react";

export const AlertMessage = ({ text, type = "info", onClose}) => {
      useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, []);
    const [visible, setVisible] = useState(true);

    const handleClose = () => {
        setVisible(false);

        if (onClose) {
            onClose();
        }
    };

    const styles = {
        info: {
            container:
                "bg-blue-50 text-blue-800 border-blue-300 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800",
            icon: "text-blue-500 dark:text-blue-400",
            button: "hover:bg-blue-100 dark:hover:bg-blue-900",
        },
        danger: {
            container:
                "bg-red-50 text-red-800 border-red-300 dark:bg-red-950 dark:text-red-300 dark:border-red-800",
            icon: "text-red-500 dark:text-red-400",
            button: "hover:bg-red-100 dark:hover:bg-red-900",
        },
        success: {
            container:
                "bg-green-50 text-green-800 border-green-300 dark:bg-green-950 dark:text-green-300 dark:border-green-800",
            icon: "text-green-500 dark:text-green-400",
            button: "hover:bg-green-100 dark:hover:bg-green-900",
        },
        warning: {
            container:
                "bg-yellow-50 text-yellow-800 border-yellow-300 dark:bg-yellow-950 dark:text-yellow-300 dark:border-yellow-800",
            icon: "text-yellow-500 dark:text-yellow-400",
            button: "hover:bg-yellow-100 dark:hover:bg-yellow-900",
        },
        neutral: {
            container:
                "bg-gray-50 text-gray-800 border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600",
            icon: "text-gray-500 dark:text-gray-400",
            button: "hover:bg-gray-100 dark:hover:bg-gray-700",
        },
    };

    const currentStyle = styles[type] || styles.info;

    if (!visible) {
        return null;
    }

    return (
        <div
            className={`flex items-center gap-3 p-4 mb-4 text-sm border rounded-lg ${currentStyle.container}`}
            role="alert"
        >
            {/* Message */}
            <div className="flex-1">
                {text}
            </div>

            {/* Close button */}
            <button
                type="button"
                onClick={handleClose}
                className={`flex items-center justify-center w-8 h-8 rounded-lg transition-colors ${currentStyle.button}`}
                aria-label="Close"
            >
                <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        d="M6 6l12 12M18 6L6 18"
                    />
                </svg>
            </button>
        </div>
    );
};