import React, { useContext, useState } from "react";
import Register from "../Registry";
import { SettingsContext } from "../../contexts/SettingsContext";
import Login from "../Login";
const ModalLogin = () => {
    const [isLogin, setIsLogin] = useState(false);
    const {
        settingsState: { isShowModalLogin },
        toggleModalLogin,
    } = useContext(SettingsContext);
    return (
        <>
            {isShowModalLogin && (
                <div
                    className="fixed inset-0 modal-content z-[999999]"
                    onClick={() => toggleModalLogin(false)}
                >
                    <div
                        className="theme absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {isLogin ? (
                            <Login onChangeForm={() => setIsLogin(false)} />
                        ) : (
                            <Register onChangeForm={() => setIsLogin(true)} />
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default ModalLogin;
