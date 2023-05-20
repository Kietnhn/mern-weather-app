import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import TogglePassword from "../Button/TogglePassword";
const ChangePassword = ({ setUpdateForm, updateForm }) => {
    const { verifyPassword } = useContext(AuthContext);
    const [passwordForm, setPassWordForm] = useState({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    });
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [alert, setAlert] = useState("");
    const newPasswordRef = useRef();
    const confirmPasswordRef = useRef();
    const handleChangeInput = (e) => {
        setPassWordForm({
            ...passwordForm,
            [e.target.name]: e.target.value,
        });
    };
    const handleVerifyPassword = async (e) => {
        if (passwordForm.oldPassword) {
            const response = await verifyPassword({
                password: passwordForm.oldPassword,
            });
            if (response?.success) {
                setIsAuthenticated(true);
            } else {
                handletSetAlert(e, "Not Authenticated");
            }
        }
    };
    const handletSetAlert = (e, message) => {
        e.target.focus();
        setAlert(message);
        setTimeout(() => {
            setAlert("");
        }, [3000]);
    };
    const handleCheckRealNewPassword = (e) => {
        const value = e.target.value;
        if (value === passwordForm.oldPassword) {
            handletSetAlert(e, "password must be different from old password");
        }
    };
    const handleConfirmPassword = (e) => {
        const value = e.target.value;
        if (value === passwordForm.newPassword) {
            setUpdateForm({
                ...updateForm,
                password: passwordForm.newPassword,
            });
        } else {
            handletSetAlert(e, "password does not match new password");
        }
    };
    return (
        <div>
            <h3 className="font-semibold text-xl mb-4">Change password?</h3>
            <div className="mb-4">
                <input
                    type="password"
                    className="px-3 border rounded w-full py-2 "
                    name="oldPassword"
                    value={passwordForm["oldPassword"] || ""}
                    onChange={(e) => handleChangeInput(e)}
                    placeholder="Enter your old password"
                    onBlur={handleVerifyPassword}
                />
            </div>
            {isAuthenticated && (
                <>
                    <div className="mb-4 relative">
                        <input
                            type="password"
                            className="px-3 border rounded w-full py-2 "
                            name="newPassword"
                            value={passwordForm["newPassword"] || ""}
                            onChange={(e) => handleChangeInput(e)}
                            placeholder="Enter your new password"
                            onBlur={handleCheckRealNewPassword}
                            ref={newPasswordRef}
                        />
                        <TogglePassword
                            ref={newPasswordRef}
                            className="absolute z-[999] right-2 top-1/2 -translate-y-1/2"
                        />
                    </div>
                    <div className="mb-4 relative">
                        <input
                            type="password"
                            className="px-3 border rounded w-full py-2 "
                            name="confirmPassword"
                            value={passwordForm["confirmPassword"] || ""}
                            onChange={(e) => handleChangeInput(e)}
                            placeholder="Confirm new password"
                            onBlur={handleConfirmPassword}
                            ref={confirmPasswordRef}
                        />
                        <TogglePassword
                            ref={confirmPasswordRef}
                            className="absolute z-[999] right-2 top-1/2 -translate-y-1/2"
                        />
                    </div>
                </>
            )}
            {alert && (
                <div>
                    <h3 className="text-[red] font-semibold">{alert}</h3>
                </div>
            )}
        </div>
    );
};

export default ChangePassword;
