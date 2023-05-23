import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { WeatherContext } from "../../../contexts/WeatherContext";
import { LogOutIcon, MenuBarIcon } from "../../icons";
import menuData from "../../../routes/menu";

function Menu({ className }) {
    const {
        authState: { isAuthenticated, user },
        logoutUser,
    } = useContext(AuthContext);
    const {
        setIsUseAnimateBackground,
        weatherState: { isUseAnimateBackground },
    } = useContext(WeatherContext);
    const location = useLocation();
    const [showMenu, setShowMenu] = useState(false);
    return (
        <>
            <div className={className}>
                <button className="center" onClick={() => setShowMenu(true)}>
                    <span>
                        <MenuBarIcon width="24px" height="24px" />
                    </span>
                </button>
            </div>
            {showMenu && (
                <div
                    className="fixed inset-0 bg-[rgba(0_0_0_.3)] z-[999] font-semibold text-base"
                    onClick={() => setShowMenu(false)}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="absolute top-0 bottom-0 left-0 w-[80vw] p-6 rounded-r-xl theme modal-content animate-slideShow"
                    >
                        <div className="flex h-full flex-col justify-between">
                            <div>
                                <h1 className="capitalize text-2xl mb-2 ">
                                    Weather app
                                </h1>
                                {!isAuthenticated ? (
                                    <>
                                        <div className=" flex flex-col items-center justify-center border-b pb-4 mb-4 ">
                                            <p className="mb-2">
                                                Not Authenticated !
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <button className="px-4  py-2 rounded-xl bg-transparent border border-dark dark:border-[white] ">
                                                    <Link to="/register">
                                                        Sign up
                                                    </Link>
                                                </button>
                                                <button className="px-4  py-2 rounded-xl bg-dark  dark:bg-primaryText text-primaryText dark:text-dark">
                                                    <Link to="/login">
                                                        Sign in
                                                    </Link>
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex items-end mb-4 border-b pb-4 gap-4 ">
                                            <div className="w-24 h-24 rounded-full bg-dark"></div>
                                            <div>
                                                <h1>{user.username}</h1>
                                            </div>
                                        </div>
                                    </>
                                )}
                                <ul className="category flex flex-col">
                                    {menuData.map((category, index) => {
                                        const Icon = category.icon;
                                        return category.isPublic ||
                                            isAuthenticated ? (
                                            <li
                                                key={category.title}
                                                className={`mb-2 hover:text-[white] dark:hover:text-dark duration-200
                                                ${
                                                    location.pathname ===
                                                    category.to
                                                        ? "text-[white] dark:text-dark"
                                                        : ""
                                                }
                                                `}
                                                onClick={() =>
                                                    setShowMenu(false)
                                                }
                                            >
                                                <Link
                                                    to={category.to}
                                                    className={`flex justify-start items-center text-[inherit] gap-2  ${
                                                        category.to
                                                            ? ""
                                                            : "text-text"
                                                    }`}
                                                >
                                                    <span>
                                                        <Icon
                                                            width="20px"
                                                            height="20px"
                                                        />
                                                    </span>
                                                    <span
                                                        className={`text-xl `}
                                                    >
                                                        {category.title}
                                                    </span>
                                                </Link>
                                            </li>
                                        ) : (
                                            <></>
                                        );
                                    })}
                                </ul>
                            </div>
                            <div>
                                {isAuthenticated && (
                                    <>
                                        <div className="flex justify-start items-center gap-2 capitalize">
                                            <p>Use animate</p>
                                            <button
                                                className="w-[64px] h-[34px] relative rounded-full"
                                                onClick={() =>
                                                    setIsUseAnimateBackground(
                                                        !isUseAnimateBackground
                                                    )
                                                }
                                            >
                                                <span
                                                    className={`absolute rounded-full inset-0 border-2 border-dark dark:border-primaryText duration-300  ${
                                                        isUseAnimateBackground &&
                                                        "dark:bg-[black] bg-[white]"
                                                    }`}
                                                >
                                                    <span
                                                        className={`absolute rounded-full w-[26px] h-[26px] left-1 top-[2px] bg-dark dark:bg-primaryText duration-300 ${
                                                            isUseAnimateBackground &&
                                                            "left-[calc(100%-30px)]"
                                                        }`}
                                                    ></span>
                                                </span>
                                            </button>
                                        </div>
                                        <button
                                            className="center w-full gap-2 button mt-2"
                                            onClick={() => logoutUser()}
                                        >
                                            <span>
                                                <LogOutIcon
                                                    width="20px"
                                                    height="20px"
                                                />
                                            </span>
                                            <span className="text-base ">
                                                Logout
                                            </span>
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Menu;
