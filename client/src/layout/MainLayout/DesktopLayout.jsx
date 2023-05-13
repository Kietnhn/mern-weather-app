import React from "react";
import DesktopHeader from "../../views/Desktop/DesktopHeader";
import { useEffect } from "react";
import ModalLogin from "../../components/Modals/ModalLogin";
const DesktopLayout = ({ children }) => {
    useEffect(() => {
        window.addEventListener("scroll", () => {
            const top =
                window.pageYOffset || document.documentElement.scrollTop;
            const left =
                window.pageXOffset || document.documentElement.scrollLeft;
            window.scrollTo(left, top);
        });
        return () =>
            window.removeEventListener("scroll", () => {
                const top =
                    window.pageYOffset || document.documentElement.scrollTop;
                const left =
                    window.pageXOffset || document.documentElement.scrollLeft;
                window.scrollTo(left, top);
            });
    }, []);
    return (
        <>
            <DesktopHeader />
            <ModalLogin />
            <div
                className={`theme h-[100vh] overflow-hidden`}
                style={{ scrollBehavior: "smooth" }}
            >
                {children}
            </div>
        </>
    );
};

export default DesktopLayout;
