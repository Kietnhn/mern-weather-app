import { useRef, useEffect } from "react";
const TextArea = ({
    name,
    value,
    onChange,
    placeholder,
    alert,
    className = "",
    maxHeight = 88,
}) => {
    const textAreaRef = useRef();
    useEffect(() => {
        textAreaRef.current.style.height = "auto";
        textAreaRef.current.style.height =
            textAreaRef.current.scrollHeight + "px";
    }, [value]);
    return (
        <>
            <div className={`relative mb-8 ${className}`}>
                <textarea
                    ref={textAreaRef}
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder=" "
                    row={1}
                    style={{ maxHeight: `${maxHeight}px` }}
                    className={`form-textarea theme  shadow-none  overflow-auto ${
                        maxHeight > 88 && "lines-row"
                    }`}
                >
                    <br />
                    {value}
                    <br />
                </textarea>

                <label
                    htmlFor={name}
                    className={`form-label theme shadow-none ${
                        maxHeight > 88 && "authenticated-label-textarea"
                    }`}
                >
                    {placeholder}
                </label>
                {alert && !value && (
                    <span className="absolute right-1 top-1/2 -translate-y-1/2 text-[red] ">
                        {name} is required
                    </span>
                )}
            </div>
        </>
    );
};
export default TextArea;
