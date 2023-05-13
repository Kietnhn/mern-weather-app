import React from "react";
import useDetectUserDevice from "../../hooks/useDetectUserDevice";
import { Navigate } from "react-router-dom";

const ProtectedRoutesDesktop = ({ children }) => {
    const [isMobile] = useDetectUserDevice();
    return !isMobile ? children : <Navigate to="/page-not-found" />;
};

export default ProtectedRoutesDesktop;
