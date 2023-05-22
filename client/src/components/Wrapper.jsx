import { forwardRef } from "react";

const Wrapper = forwardRef(
    (
        {
            children,
            title = "",
            styleTitle,
            theme = "xl:theme",
            id,
            sizeFull = false,
            className,
        },
        ref
    ) => {
        return (
            <div
                className={`${
                    className ? className : "fixed bottom-6 left-6 right-6"
                } sm:static sm:w-full  lg:h-screen lg:pt-[52px] lg:pb-12 lg:mb-5 ${theme}`}
                id={id}
                ref={ref}
            >
                <div
                    className={` mx-auto h-full ${
                        sizeFull
                            ? "w-full"
                            : "xl:w-[1300px] xl:max-w-full py-3 xl:px-3 lg:px-5 px-3"
                    } max-w-full `}
                >
                    {title && (
                        <h1
                            className={
                                styleTitle ||
                                `font-bold text-4xl text-center  mb-5`
                            }
                        >
                            {title}
                        </h1>
                    )}
                    {children}
                </div>
            </div>
        );
    }
);
export default Wrapper;
