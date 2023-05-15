import React, { useContext, useState } from "react";
import Input from "../../../views/Contact/Input";
import { AuthContext } from "../../../contexts/AuthContext";
const ChangePassword = ({}) => {
    const {
        verifyPassword,
        authState: {
            user: { _id },
        },
    } = useContext(AuthContext);
    const [passwordFrom, setPassWordFrom] = useState({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    });
    const [alert, setAlert] = useState("");
    const handleChangeInput = (e) => {
        setPassWordFrom({
            ...passwordFrom,
            [e.target.name]: e.target.value,
        });
    };
    const handleVerifyPassword = async (e) => {
        const response = await verifyPassword({
            _id,
            password: passwordFrom.oldPassword,
        });
        if (!response.success) {
            e.target.focus();
            setAlert(response.message);
        }
    };
    return (
        <div>
            <Input
                alert={alert}
                name="oldPassword"
                value={passwordFrom["oldPassword"]}
                onChange={(e) => handleChangeInput(e)}
                placeholder="Enter your old password"
                onBlur={handleVerifyPassword}
            />
            <Input
                // alert={alert}
                name="newPassword"
                value={passwordFrom["newPassword"]}
                onChange={(e) => handleChangeInput(e)}
                placeholder="Enter your new password"
                onBlur={handleVerifyPassword}
            />
            <Input
                // alert={alert}
                name="confirmPassword"
                value={passwordFrom["confirmPassword"]}
                onChange={(e) => handleChangeInput(e)}
                placeholder="Confirm new password"
                onBlur={handleVerifyPassword}
            />
        </div>
    );
};

export default ChangePassword;
