import React from "react";
import useDetectUserDevice from "../../hooks/useDetectUserDevice";
import { Navigate } from "react-router-dom";

const ProtectedRoutesIsMobile = ({ children }) => {
    const [isMobile] = useDetectUserDevice();
    console.log({ isMobile });
    return isMobile ? children : <Navigate to="/page-not-found" />;
};

export default ProtectedRoutesIsMobile;
