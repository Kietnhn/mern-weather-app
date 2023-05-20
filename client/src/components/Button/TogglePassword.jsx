import React, { forwardRef, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "../icons";
import { ToolTip } from "../../components";
const TogglePassword = forwardRef(({ className }, ref) => {
    const [isShowPassword, setIsShowPassword] = useState(true);
    const handleToggleShowPassword = (e) => {
        const type = isShowPassword ? "text" : "password";
        ref.current.type = type;
        setIsShowPassword(!isShowPassword);
    };
    return (
        <>
            <ToolTip
                message={`${
                    isShowPassword ? "Show password" : "Hide password"
                }`}
                className={className}
                position="-top-4 -translate-y-full left-1/2 -translate-x-1/2"
            >
                <div
                    onClick={handleToggleShowPassword}
                    className={`hover:cursor-pointer`}
                >
                    <span>
                        {isShowPassword ? (
                            <EyeIcon width="16px" height="16px" />
                        ) : (
                            <EyeSlashIcon width="16px" height="16px" />
                        )}
                    </span>
                </div>
            </ToolTip>
        </>
    );
});

export default TogglePassword;
