const ToolTip = ({ children, position = "", message, arrow = "" }) => {
    return (
        <div className="relative tooltip">
            {children}
            <div
                className={`tooltip-message z-[9999] ${
                    position
                        ? position
                        : "top-[calc(-100%-4px)] left-1/2 -translate-x-1/2"
                }`}
            >
                <p>{message}</p>
                <div
                    className={`arrow ${
                        arrow
                            ? arrow
                            : `top-[98%] left-1/2 -translate-x-1/2 
                border-[white_transparent_transparent_transparent] dark:border-[black_transparent_transparent_transparent]`
                    }`}
                ></div>
            </div>
        </div>
    );
};
export default ToolTip;
