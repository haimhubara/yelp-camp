import { createContext, useEffect, useState } from "react";
import { getCurrentUser } from "../services";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const data = await getCurrentUser();

                if (data.isAuthenticated) {
                    setUser(data.user);
                }
            } catch (error) {
                console.error(error);
            }
        };

        checkUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};