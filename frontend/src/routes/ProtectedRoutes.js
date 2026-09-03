import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context";

export const ProtectedRoutes = ({ children }) => {

    const { user } = useContext(AuthContext);
    const location = useLocation();

    return user
        ? children
        : <Navigate to="/login" state={{ returnTo: location.pathname }} />;
};