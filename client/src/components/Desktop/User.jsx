import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { SettingsContext } from "../../contexts/SettingsContext";

const User = () => {
    const {
        authState: { isAuthenticated, user },
        logoutUser,
    } = useContext(AuthContext);
    const { toggleModalLogin, toggleModalUpdateProfile } =
        useContext(SettingsContext);
    const [isShowMenu, setIsShowMenu] = useState(false);
    const handleShowModalLogin = () => {
        toggleModalLogin(true);
    };
    console.log({ user });
    return (
        <div className="h-full flex justify-end items-center">
            {isAuthenticated ? (
                <div
                    className="relative hover:cursor-pointer flex items-center gap-4"
                    onClick={() => setIsShowMenu(!isShowMenu)}
                >
                    <h2 className="text-xl font-semibold">{user?.username}</h2>
                    {isShowMenu && (
                        <div className="absolute top-full min-w-[230px]  px-6 py-2 right-0 theme modal-content  rounded-xl">
                            <h2
                                className="py-2.5 hover:cursor-pointer"
                                onClick={() => toggleModalUpdateProfile(true)}
                            >
                                Your Account
                            </h2>
                            <hr />

                            <div>
                                <h2 className="py-2.5">Settings</h2>
                                <h2
                                    className="py-2.5"
                                    onClick={() => logoutUser()}
                                >
                                    Logout
                                </h2>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <button onClick={handleShowModalLogin} className="button">
                    Sign in
                </button>
            )}
        </div>
    );
};

export default User;
