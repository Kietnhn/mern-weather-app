import React, { useState } from "react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import CitiesWeather from "../components/CitiesWeather";
import { ChevronLeftIcon, PencilIcon, SaveEditIcon } from "../components/icons";
import { AuthContext } from "../contexts/AuthContext";
import { Wrapper } from "../components";
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
        <Wrapper className="fixed bottom-0 left-6 right-6 h-[80vh] overflow-auto">
            {/* <div className="fixed left-8 top-8">
                <button
                    className="p-2 rounded-full bg-[rgba(0,0,0,.4)] text-text"
                    onClick={() => window.history.back()}
                >
                    <span>
                        <ChevronLeftIcon width="18px" height="18px" />{" "}
                    </span>
                </button>
            </div> */}

            <h1 className="text-3xl font-bold mb-2">
                My Cities
                <button
                    className="ml-2 p-2 rounded-full bg-[rgba(0,0,0,.4)] text-text"
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
            </h1>
            <CitiesWeather isEdit={isEdit} />
        </Wrapper>
    );
};

export default City;
