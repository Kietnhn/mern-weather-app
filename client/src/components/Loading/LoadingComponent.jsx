import React from "react";

const LoadingComponent = ({ className }) => {
    return (
        <div className={className}>
            <div className="h-20 w-20 mr-3 absolute-center after:block after:content-[''] after:w-[64px] after:h-[64px] after:m-2 after:rounded-full after:border-[6px] after:border-[#000_transparent_#000_transparent] after:animate-spin"></div>
        </div>
    );
};

export default LoadingComponent;
