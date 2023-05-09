const Wrapper = ({
    children,
    title = "",
    styleTitle,
    theme = "theme",
    id,
    sizeFull = false,
}) => {
    return (
        <div className={`w-full h-screen pt-[52px] pb-12 ${theme}`} id={id}>
            <div
                className={` mx-auto h-full ${
                    sizeFull ? "w-full" : "w-[1300px]"
                }`}
            >
                {title && (
                    <h1
                        className={
                            styleTitle || `font-bold text-4xl text-center  mb-5`
                        }
                    >
                        {title}
                    </h1>
                )}
                {children}
            </div>
        </div>
    );
};
export default Wrapper;
