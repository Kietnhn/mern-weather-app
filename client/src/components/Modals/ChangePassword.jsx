import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
const ChangePassword = ({ setUpdateForm, updateForm }) => {
    const { verifyPassword } = useContext(AuthContext);
    const [passwordForm, setPassWordForm] = useState({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    });
    const [isAuthenticated, setIsAuthenticated] = useState(false);
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
            }
        }
    };
    const handleCheckRealNewPassword = (e) => {
        const value = e.target.value;
        if (value === passwordForm.oldPassword) {
            console.log("password must be different from old password");
        }
    };
    const handleConfirmPassword = (e) => {
        const value = e.target.value;
        if (value === passwordForm.newPassword) {
            setUpdateForm({
                ...updateForm,
                password: passwordForm.newPassword,
            });
        }
    };
    return (
        <div>
            <h3>Change password?</h3>
            <div>
                <input
                    className="px-3 w-full py-2 "
                    name="oldPassword"
                    value={passwordForm["oldPassword"] || ""}
                    onChange={(e) => handleChangeInput(e)}
                    placeholder="Enter your old password"
                    onBlur={handleVerifyPassword}
                />
            </div>
            {isAuthenticated && (
                <>
                    <div>
                        <input
                            className="px-3 w-full py-2 "
                            name="newPassword"
                            value={passwordForm["newPassword"] || ""}
                            onChange={(e) => handleChangeInput(e)}
                            placeholder="Enter your new password"
                            onBlur={handleCheckRealNewPassword}
                        />
                    </div>
                    <div>
                        <input
                            className="px-3 w-full py-2 "
                            name="confirmPassword"
                            value={passwordForm["confirmPassword"] || ""}
                            onChange={(e) => handleChangeInput(e)}
                            placeholder="Confirm new password"
                            onBlur={handleConfirmPassword}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default ChangePassword;
