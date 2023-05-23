import React from "react";
import Error404Image from "../assets/img/error-404.png";
import { NavLink } from "react-router-dom";
const PageNotFound = () => {
    return (
        <div className="fixed inset-0 bg-[white] z-[99999999]">
            <div className=" bg-[white] absolute-center ">
                <div className="between">
                    <div className="flex-1">
                        <h1 className=" font-semibold text-6xl">Oops !</h1>
                        <h3 className="text-4xl">Page not found </h3>
                    </div>
                    <div className="w-2/5">
                        <img
                            src={Error404Image}
                            alt="error-page"
                            className="w-full h-full object-cover bg-[white]"
                        />
                    </div>
                </div>
                <div className="center">
                    <button className="rounded-md px-3 py-2 bg-dark mt-4 hover:bg-transparent border-2 border-transparent text-[white] hover:text-dark hover:border-dark">
                        <NavLink to="/landing">Go to Home</NavLink>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PageNotFound;
