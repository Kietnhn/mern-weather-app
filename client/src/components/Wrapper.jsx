const Wrapper = ({
    children,
    title = "",
    styleTitle,
    theme = "lg:theme",
    id,
    sizeFull = false,
    className,
}) => {
    return (
        <div
            className={`${
                className ? className : "fixed bottom-6 left-6 right-6"
            } lg:static lg:w-full  lg:h-screen lg:pt-[52px] lg:pb-12 ${theme}`}
            id={id}
        >
            <div
                className={` mx-auto h-full ${
                    sizeFull ? "w-full" : "lg:w-[1300px] lg:p-3"
                } max-w-full `}
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
