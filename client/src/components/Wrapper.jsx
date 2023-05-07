const Wrapper = ({ children, title = "", styleTitle, theme = "theme", id }) => {
    return (
        <div className={`w-full h-screen pt-[52px] mb-5 ${theme}`} id={id}>
            <div className="w-[1300px] mx-auto h-full">
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
