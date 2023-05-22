import React from "react";
import DesktopHeader from "../../views/Desktop/DesktopHeader";
import { useEffect } from "react";
import ModalLogin from "../../components/Modals/ModalLogin";
import ModalUpdateProfile from "../../components/Modals/ModalUpdateProfile";
const DesktopLayout = ({ children }) => {
    // useEffect(() => {
    //     window.addEventListener("scroll", () => {
    //         const top =
    //             window.pageYOffset || document.documentElement.scrollTop;
    //         const left =
    //             window.pageXOffset || document.documentElement.scrollLeft;
    //         window.scrollTo(left, top);
    //     });
    //     return () =>
    //         window.removeEventListener("scroll", () => {
    //             const top =
    //                 window.pageYOffset || document.documentElement.scrollTop;
    //             const left =
    //                 window.pageXOffset || document.documentElement.scrollLeft;
    //             window.scrollTo(left, top);
    //         });
    // }, []);

    return (
        <>
            <DesktopHeader />
            <ModalLogin />
            <ModalUpdateProfile />
            <div
                className={`hidden sm:block theme xl:h-[100vh] overflow-hidden`}
                style={{ scrollBehavior: "smooth" }}
            >
                {children}
            </div>
            <div className="block sm:hidden fixed inset-0">
                <div className="absolute-center">
                    <h1>Something wrong !!!</h1>
                    <h2>Refresh </h2>
                </div>
            </div>
        </>
    );
};

export default DesktopLayout;
