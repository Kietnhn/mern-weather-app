import React from "react";
import ErrorPageImage from "../assets/img/error-page.png";
import { RefreshPageIcon } from "../components/icons";
const ErrorPage = () => {
    function refreshPage() {
        window.location.reload();
    }
    return (
        <div className="fixed inset-0 bg-[white] z-[99999999]">
            <div className=" bg-[white] absolute-center text-center">
                <div className="">
                    <img
                        src={ErrorPageImage}
                        alt="error-page"
                        className="w-full h-full object-cover bg-[white]"
                    />
                </div>
                <h1 className="my-1 font-semibold text-2xl">
                    Something went wrong.
                </h1>
                <h3>Try refreshing this page</h3>
                <button
                    onClick={refreshPage}
                    className="rounded-md px-3 py-2 bg-dark mt-4 hover:bg-transparent border-2 border-transparent text-[white] hover:text-dark hover:border-dark"
                >
                    <span>
                        <RefreshPageIcon width="16px" height="16px" />
                    </span>
                </button>
            </div>
        </div>
    );
};

export default ErrorPage;
