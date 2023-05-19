import { useState } from "react";
import validateEmail from "../../utils/validateEmail";
const Input = ({
    type = "text",
    name,
    value,
    onChange,
    onBlur,
    placeholder,
    alert,
    className = "",
}) => {
    const [inValid, setInValid] = useState(false);
    const handleValidate = (e) => {
        if (onBlur) {
            onBlur();
        } else {
            if (name === "email") {
                if (!value) return;
                if (!validateEmail(value)) {
                    setInValid(true);
                    e.target.focus();
                    setTimeout(() => {
                        setInValid(false);
                    }, 3000);
                }
            }
        }
    };
    const handleFocus = () => {
        if (inValid) {
            setInValid(false);
        }
    };
    return (
        <div className={`relative mb-8  ${className}`}>
            <input
                type={type}
                id={name}
                placeholder=" "
                name={name}
                value={value}
                onChange={onChange}
                onBlur={handleValidate}
                onFocus={handleFocus}
                className="form-input  theme shadow-none"
            />

            <label htmlFor={name} className="form-label  theme shadow-none ">
                {placeholder}
            </label>
            {alert && (
                <span className="absolute right-1 top-1/2 -translate-y-1/2 text-[red] ">
                    {!value ? `${name} is required` : alert}
                </span>
            )}
            {inValid && (
                <span className="absolute right-1 top-1/2 -translate-y-1/2 text-[red] ">
                    Invalid Email
                </span>
            )}
        </div>
    );
};
export default Input;
