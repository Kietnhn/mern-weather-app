import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const User = () => {
    const {
        authState: { isAuthenticated, user },
        logoutUser,
    } = useContext(AuthContext);
    const [isShowMenu, setIsShowMenu] = useState(false);
    return (
        <div className="h-full flex justify-end items-center">
            {isAuthenticated ? (
                <div
                    className="relative hover:cursor-pointer flex items-center gap-4"
                    onClick={() => setIsShowMenu(!isShowMenu)}
                >
                    <h2 className="text-xl font-semibold">{user.username}</h2>
                    <div className="w-10 h-10 rounded-full bg-text "></div>
                    {isShowMenu && (
                        <div className="absolute top-full w-[230px]  px-6 py-2 right-0 dark:bg-[#232228] rounded-xl bg-[#dee1e6]">
                            <div className="flex items-center">
                                <div className="w-12 h-12">
                                    <img src="" alt="" />
                                </div>
                                <div>
                                    <h2>{user.username}</h2>
                                    <p></p>
                                </div>
                            </div>
                            <hr />
                            <div>
                                <h2 className="py-2.5">Your account</h2>
                                <hr />
                            </div>
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
                <NavLink
                    to="/login"
                    className="border px-4 py-2 rounded-lg bg-primaryText text-dark"
                >
                    Sign in
                </NavLink>
            )}
        </div>
    );
};

export default User;
