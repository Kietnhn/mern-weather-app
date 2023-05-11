const Wrapper = ({
    children,
    title = "",
    styleTitle,
    theme = "lg:theme",
    id,
    sizeFull = false,
}) => {
    return (
        <div
            className={`w-full h-full lg:h-screen lg:pt-[52px] lg:pb-12 ${theme}`}
            id={id}
        >
            <div
                className={` mx-auto h-full ${
                    sizeFull ? "w-full" : "lg:w-[1300px]"
                } max-w-full`}
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
