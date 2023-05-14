import React, { useContext, useState } from "react";
import Register from "../Registry";
import { SettingsContext } from "../../contexts/SettingsContext";
import Login from "../Login";
import landing2 from "../../assets/img/landing2.jpg";

const ModalLogin = () => {
    const [isLogin, setIsLogin] = useState(true);
    const {
        settingsState: { isShowModalLogin },
        toggleModalLogin,
    } = useContext(SettingsContext);
    const handleCloseModalLogin = () => {
        toggleModalLogin(false);
        setIsLogin(true);
    };
    return (
        <>
            {isShowModalLogin && (
                <div
                    className="fixed inset-0 modal-content z-[999999]"
                    onClick={handleCloseModalLogin}
                >
                    <div
                        className={`theme absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex ${
                            isLogin ? "flex-row-reverse" : "flex-row"
                        } duration-500 min-w-[768px] h-[80vh]`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="w-1/2 ">
                            <div
                                className={`bg-image w-full h-full duration-200 p-8 theme font-semibold brightness-90
                            `}
                                style={{ backgroundImage: `url(${landing2})` }}
                            >
                                <h3
                                    className={`text-3xl text-[white] ${
                                        isLogin ? "text-start" : "text-end"
                                    }`}
                                >
                                    {isLogin ? "Welcome Back !" : "Sign up now"}
                                </h3>
                            </div>
                        </div>
                        <div className="w-1/2 flex">
                            {isLogin ? (
                                <Login onChangeForm={() => setIsLogin(false)} />
                            ) : (
                                <Register
                                    onChangeForm={() => setIsLogin(true)}
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ModalLogin;
