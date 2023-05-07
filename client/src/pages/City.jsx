import React, { useState } from "react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import CitiesWeather from "../components/CitiesWeather";
import { ChevronLeftIcon, PencilIcon, SaveEditIcon } from "../components/icons";
import { AuthContext } from "../contexts/AuthContext";
const City = () => {
    const {
        authState: { isAuthenticated },
    } = useContext(AuthContext);

    const [isEdit, setIsEdit] = useState(false);
    const handleEditCity = () => {
        setIsEdit(!isEdit);
    };
    if (!isAuthenticated) return <Navigate to="/login" />;
    return (
        <div className="w-full flex flex-col items-center justify-between h-screen font-semibold text-base text-dark bg-[white] dark:bg-dark dark:text-primaryText text-center p-8">
            <div className="fixed left-8 top-8">
                <button
                    className="p-2 rounded-full bg-[rgba(0,0,0,.4)] text-text"
                    onClick={() => window.history.back()}
                >
                    <span>
                        <ChevronLeftIcon width="18px" height="18px" />{" "}
                    </span>
                </button>
            </div>
            <div className="fixed right-8 top-8">
                <button
                    className="p-2 rounded-full bg-[rgba(0,0,0,.4)] text-text"
                    onClick={handleEditCity}
                >
                    <span>
                        {isEdit ? (
                            <SaveEditIcon width="18px" height="18px" />
                        ) : (
                            <PencilIcon width="18px" height="18px" />
                        )}
                    </span>
                </button>
            </div>
            <h1 className="text-3xl font-bold mb-2">My Cities</h1>
            <div className="fixed bottom-0 left-0 right-0 h-[70vh] overflow-auto p-6">
                <CitiesWeather isEdit={isEdit} />
            </div>
        </div>
    );
};

export default City;
